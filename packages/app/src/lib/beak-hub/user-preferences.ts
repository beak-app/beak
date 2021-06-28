import { UserPreferences } from '@beak/common/dist/types/beak-hub';
import { TabItem } from '@beak/common/types/beak-project';

import { readJsonAndValidate } from '../fs';
import BeakHub from '.';
import { userPreferences } from './schemas';

const fs = window.require('electron').remote.require('fs-extra');
const path = window.require('electron').remote.require('path');

let beakUserPreferences: BeakUserPreferences;

export default class BeakUserPreferences {
	private userPreferencePath: string;
	private preferences!: UserPreferences;

	constructor(hub: BeakHub) {
		this.userPreferencePath = path.join(hub.getHubPath(), 'preferences', 'user.json');
	}

	private defaultPreferences(): UserPreferences {
		return { tabs: [], selectedTabPayload: void 0 };
	}

	async load() {
		if (!await fs.pathExists(this.userPreferencePath)) {
			this.preferences = this.defaultPreferences();

			return;
		}

		try {
			const preferenceFile = await readJsonAndValidate<UserPreferences>(
				this.userPreferencePath,
				userPreferences,
			);

			this.preferences = preferenceFile.file;
		} catch (error) {
			if (error.code !== 'schema_invalid')
				throw error;

			this.preferences = this.defaultPreferences();
		}
	}

	async write() {
		await fs.ensureFile(this.userPreferencePath);
		await fs.writeJson(this.userPreferencePath, this.preferences, { spaces: '\t' });
	}

	getPreferences() {
		return this.preferences;
	}

	async setTabPreferences(tabs: TabItem[], selectedTabPayload: string | undefined) {
		// Don't accept updates until we have loaded in from disk
		if (!this.preferences)
			return;

		this.preferences.tabs = tabs;
		this.preferences.selectedTabPayload = selectedTabPayload;

		await this.write();
	}

	static setupInstance(hub: BeakHub) {
		beakUserPreferences = new BeakUserPreferences(hub);

		return this.getInstance();
	}

	static getInstance() {
		return beakUserPreferences;
	}
}
