interface Globals {
	platform: null | NodeJS.Platform;
	windowId: null | string;
}

const globals: Globals = {
	windowId: null,
	platform: null,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function setGlobal(key: keyof typeof globals, value: any) {
	globals[key] = value;
}

export function getGlobal(key: keyof typeof globals) {
	return globals[key];
}