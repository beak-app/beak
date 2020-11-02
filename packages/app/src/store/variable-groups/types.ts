import { VariableGroups } from '@beak/common/dist/types/beak-project';

export const ActionTypes = {
	OPEN_VARIABLE_GROUPS: '@beak/global/variable-groups/OPEN_VARIABLE_GROUPS',
	VARIABLE_GROUPS_OPENED: '@beak/global/variable-groups/VARIABLE_GROUPS_OPENED',

	UPDATE_GROUP_NAME: '@beak/global/variable-groups/UPDATE_GROUP_NAME',
	UPDATE_ITEM_NAME: '@beak/global/variable-groups/UPDATE_ITEM_NAME',
};

export interface State {
	opening: boolean;
	projectPath?: string;
	variableGroups?: VariableGroups;
}

export const initialState: State = {
	opening: true,
};

export interface UpdateEntityNamePayload {
	variableGroup: string;
	name: string;
	updated: string;
}

export default {
	ActionTypes,
	initialState,
};
