import { Nodes } from '@beak/common/types/beak-project';
import { createAction } from '@reduxjs/toolkit';

import {
	ActionTypes,
	CreateNewThing,
	DuplicateRequestPayload,
	LatestWrite,
	ProjectInfoPayload,
	ProjectOpenedPayload,
	RemoveNodeFromDiskPayload,
	RequestBodyJsonChangedPayload,
	RequestBodyTextChangedPayload,
	RequestRenameCancelled,
	RequestRenameResolved,
	RequestRenameStarted,
	RequestRenameSubmitted,
	RequestRenameUpdated,
	RequestUriUpdatedPayload,
	TabItem,
	ToggleableItemAddedPayload,
	ToggleableItemRemovedPayload,
	ToggleableItemUpdatedPayload,
} from './types';

export const startProject = createAction<string>(ActionTypes.START_PROJECT);
export const insertProjectInfo = createAction<ProjectInfoPayload>(ActionTypes.INSERT_PROJECT_INFO);
export const projectOpened = createAction<ProjectOpenedPayload>(ActionTypes.PROJECT_OPENED);

export const tabSelected = createAction<TabItem>(ActionTypes.TAB_SELECTED);
export const closeSelectedTab = createAction<string>(ActionTypes.CLOSE_SELECTED_TAB);
export const closeOtherSelectedTabs = createAction<string>(ActionTypes.CLOSE_OTHER_SELECTED_TABS);
export const closeSelectedTabsToRight = createAction<string>(ActionTypes.CLOSE_SELECTED_TABS_TO_RIGHT);
export const closeSelectedTabsToLeft = createAction<string>(ActionTypes.CLOSE_SELECTED_TABS_TO_LEFT);
export const closeAllSelectedTabs = createAction(ActionTypes.CLOSE_ALL_SELECTED_TABS);
export const setTabAsPermanent = createAction<string>(ActionTypes.SET_TAB_AS_PERMANENT);

export const requestUriUpdated = createAction<RequestUriUpdatedPayload>(ActionTypes.REQUEST_URI_UPDATED);

export const requestQueryAdded = createAction<ToggleableItemAddedPayload>(ActionTypes.REQUEST_QUERY_ADDED);
export const requestQueryUpdated = createAction<ToggleableItemUpdatedPayload>(ActionTypes.REQUEST_QUERY_UPDATED);
export const requestQueryRemoved = createAction<ToggleableItemRemovedPayload>(ActionTypes.REQUEST_QUERY_REMOVED);

export const requestHeaderAdded = createAction<ToggleableItemAddedPayload>(ActionTypes.REQUEST_HEADER_ADDED);
export const requestHeaderUpdated = createAction<ToggleableItemUpdatedPayload>(ActionTypes.REQUEST_HEADER_UPDATED);
export const requestHeaderRemoved = createAction<ToggleableItemRemovedPayload>(ActionTypes.REQUEST_HEADER_REMOVED);

export const requestBodyTextChanged = createAction<RequestBodyTextChangedPayload>(
	ActionTypes.REQUEST_BODY_TEXT_CHANGED,
);
export const requestBodyJsonChanged = createAction<RequestBodyJsonChangedPayload>(
	ActionTypes.REQUEST_BODY_JSON_CHANGED,
);

export const duplicateRequest = createAction<DuplicateRequestPayload>(ActionTypes.DUPLICATE_REQUEST);
export const insertRequestNode = createAction<Nodes>(ActionTypes.INSERT_REQUEST_NODE);
export const insertFolderNode = createAction<Nodes>(ActionTypes.INSERT_FOLDER_NODE);

export const removeNodeFromStore = createAction<string>(ActionTypes.REMOVE_NODE_FROM_STORE);
export const removeNodeFromStoreByPath = createAction<string>(ActionTypes.REMOVE_NODE_FROM_STORE_BY_PATH);
export const removeNodeFromDisk = createAction<RemoveNodeFromDiskPayload>(ActionTypes.REMOVE_NODE_FROM_DISK);

export const createNewRequest = createAction<CreateNewThing>(ActionTypes.CREATE_NEW_REQUEST);
export const createNewFolder = createAction<CreateNewThing>(ActionTypes.CREATE_NEW_FOLDER);

export const requestRenameStarted = createAction<RequestRenameStarted>(ActionTypes.REQUEST_RENAME_STARTED);
export const requestRenameUpdated = createAction<RequestRenameUpdated>(ActionTypes.REQUEST_RENAME_UPDATED);
export const requestRenameCancelled = createAction<RequestRenameCancelled>(ActionTypes.REQUEST_RENAME_CANCELLED);
export const requestRenameSubmitted = createAction<RequestRenameSubmitted>(ActionTypes.REQUEST_RENAME_SUBMITTED);
export const requestRenameResolved = createAction<RequestRenameResolved>(ActionTypes.REQUEST_RENAME_RESOLVED);

export const setLatestWrite = createAction<LatestWrite>(ActionTypes.SET_LATEST_WRITE);

export default {
	startProject,
	insertProjectInfo,
	projectOpened,

	tabSelected,
	closeSelectedTab,
	closeOtherSelectedTabs,
	closeSelectedTabsToRight,
	closeSelectedTabsToLeft,
	closeAllSelectedTabs,
	setTabAsPermanent,

	requestUriUpdated,

	requestQueryAdded,
	requestQueryUpdated,
	requestQueryRemoved,

	requestHeaderAdded,
	requestHeaderUpdated,
	requestHeaderRemoved,

	requestBodyTextChanged,
	requestBodyJsonChanged,

	duplicateRequest,
	insertRequestNode,
	insertFolderNode,

	removeNodeFromStore,
	removeNodeFromStoreByPath,
	removeNodeFromDisk,

	createNewRequest,
	createNewFolder,

	requestRenameStarted,
	requestRenameUpdated,
	requestRenameCancelled,
	requestRenameSubmitted,
	requestRenameResolved,

	setLatestWrite,
};
