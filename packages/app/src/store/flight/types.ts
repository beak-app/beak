import { RequestOverview, ResponseOverview } from '@beak/common/src/beak-project/types';

export const ActionTypes = {
	REQUEST_FLIGHT: '@beak/global/flight/REQUEST_FLIGHT',
	BEGIN_FLIGHT: '@beak/global/flight/BEGIN_FLIGHT',
	UPDATE_FLIGHT_PROGRESS: '@beak/global/flight/UPDATE_FLIGHT_PROGRESS',
	COMPLETE_FLIGHT: '@beak/global/flight/COMPLETE_FLIGHT',

	CANCEL_FLIGHT_REQUEST: '@beak/global/flight/CANCEL_FLIGHT_REQUEST',
};

export interface State {
	currentFlight?: FlightInProgress;
	flightHistory: Record<string, Flight[]>;
	blackBox: Record<string, boolean>;
}

export const initialState: State = {
	flightHistory: {},
	blackBox: {},
};

export interface RequestFlightPayload {
	requestId: string;
	flightId: string;
	request: RequestOverview;
}

export interface BeginFlightPayload {
	requestId: string;
	flightId: string;
	binaryStoreKey: string;
	request: RequestOverview;
}

export interface CompleteFlightPayload {
	requestId: string;
	flightId: string;
	response: ResponseOverview;
}

export interface Flight {
	requestId: string;
	flightId: string;
	request: RequestOverview;
	response?: ResponseOverview; // TODO(afr): Can this not be optional?
}

export interface FlightInProgress extends Flight {
	flighting: boolean;
	start?: number;
	binaryStoreKey: string;
	contentLength?: number;
	body?: Buffer;
	finish?: number;
}

export default {
	ActionTypes,
	initialState,
};