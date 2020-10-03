import binaryStore from '@beak/app/src/lib/binary-store';
import {
	FlightCompletePayload,
	FlightFailedPayload,
	FlightHeartbeatPayload,
} from '@beak/common/src/requester/types';
import { END, eventChannel } from 'redux-saga';
import { put, select, take } from 'redux-saga/effects';
import { PayloadAction } from 'typesafe-actions';
import * as uuid from 'uuid';

import { ApplicationState } from '../..';
import * as actions from '../actions';
import { RequestFlightPayload, State } from '../types';

const electron = window.require('electron');
const { ipcRenderer } = electron;

export default function* requestFlightWorker({ payload }: PayloadAction<string, RequestFlightPayload>) {
	const { flightId, requestId, request } = payload;
	const flight: State = yield select((s: ApplicationState) => s.global.flight);
	const binaryStoreKey = uuid.v4();

	if (flight.currentFlight?.flighting) {
		yield put(actions.cancelFlightRequest(flightId));

		return;
	}

	binaryStore.create(binaryStoreKey);

	yield put(actions.beginFlightRequest({ binaryStoreKey, flightId, requestId, request }));

	const channel = eventChannel(emitter => {
		// TODO(afr): Remove these listeners when flight over

		ipcRenderer.on(`flight_heartbeat:${flightId}`, (_, payload: FlightHeartbeatPayload) => {
			if (payload.stage === 'reading_body')
				binaryStore.append(binaryStoreKey, payload.payload.buffer);

			emitter(actions.updateFlightProgress(payload));
		});

		ipcRenderer.on(`flight_complete:${flightId}`, (_, payload: FlightCompletePayload) => {
			emitter(actions.completeFlight({ flightId, requestId, response: payload.overview }));
			emitter(END);
		});

		ipcRenderer.on(`flight_failed:${flightId}`, (_, payload: FlightFailedPayload) => {
			emitter(END);

			throw payload.error;
		});

		return () => { /* */ };
	});

	ipcRenderer.send('flight_request', {
		flightId: payload.flightId,
		requestId: payload.requestId,
		request: payload.request,
	});

	while (true) {
		const result = yield take(channel);

		if (result === null)
			break;

		yield put(result);
	}
}