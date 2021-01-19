import { writeRequestNode } from '@beak/app/lib/beak-project/request';
import { Nodes, RequestNode } from '@beak/common/types/beak-project';
import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, select } from 'redux-saga/effects';

import { ApplicationState } from '../..';
import actions from '../actions';

interface RequestIdPayload {
	requestId: string;
}

export default function* catchNodeUpdatesWorker({ payload }: PayloadAction<RequestIdPayload>) {
	const { requestId } = payload;

	const node: Nodes = yield select((s: ApplicationState) => s.global.project.tree[requestId]);

	if (!node || node.type !== 'request')
		return;

	yield put(actions.setLatestWrite({ filePath: node.filePath, writtenAt: Date.now() }));
	yield call(writeRequestNode, node as RequestNode);
}
