import { VariableGroup } from '@beak/common/types/beak-project';
import path from 'path-browserify';

import { readJsonAndValidate } from '../fs';
import { ipcFsService } from '../ipc';
import { variableGroupSchema } from './schema';

export async function readVariableGroup(vgFilePath: string) {
	return await readJsonAndValidate<VariableGroup>(vgFilePath, variableGroupSchema);
}

export async function writeVariableGroup(name: string, variableGroup: VariableGroup, vgFilePath: string) {
	const filePath = path.join(vgFilePath, `${name}.json`);

	await ipcFsService.writeJson(filePath, variableGroup, { spaces: '\t' });
}

export async function removeVariableGroup(name: string, vgFilePath: string) {
	const filePath = path.join(vgFilePath, `${name}.json`);

	await ipcFsService.remove(filePath);
}
