import { deprecated } from 'typesafe-actions';

import {
	ActionTypes,
	ProjectOpenedPayload,
	RequestIdPayload,
	RequestQueryRemovedPayload,
	RequestQueryUpdatedPayload,
	RequestUriUpdatedPayload,
} from './types';

const { createAction } = deprecated;

export const openProject = createAction(
	ActionTypes.OPEN_PROJECT,
	action => (projectPath: string) => action({ projectPath }),
);

export const projectOpened = createAction(
	ActionTypes.PROJECT_OPENED,
	action => (project: ProjectOpenedPayload) => action(project),
);

export const requestSelected = createAction(
	ActionTypes.REQUEST_SELECTED,
	action => (requestId?: string) => action(requestId),
);

export const requestUriUpdated = createAction(
	ActionTypes.REQUEST_URI_UPDATED,
	action => (payload: RequestUriUpdatedPayload) => action(payload),
);

export const requestQueryAdded = createAction(
	ActionTypes.REQUEST_QUERY_ADDED,
	action => (payload: RequestIdPayload) => action(payload),
);

export const requestQueryUpdated = createAction(
	ActionTypes.REQUEST_QUERY_UPDATED,
	action => (payload: RequestQueryUpdatedPayload) => action(payload),
);

export const requestQueryRemoved = createAction(
	ActionTypes.REQUEST_QUERY_REMOVED,
	action => (payload: RequestQueryRemovedPayload) => action(payload),
);

export const reportNodeUpdate = createAction(
	ActionTypes.REPORT_NODE_UPDATE,
	action => (nodeId: string) => action(nodeId),
);

export default {
	openProject,
	projectOpened,
	requestSelected,
	requestUriUpdated,
	requestQueryAdded,
	requestQueryUpdated,
	requestQueryRemoved,
	reportNodeUpdate,
};