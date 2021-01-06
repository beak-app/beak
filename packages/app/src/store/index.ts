// @ts-ignore
import { composeWithDevTools } from 'electron-redux-devtools';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';

import NestClient from '../lib/nest-client';
import * as flightStore from './flight';
import { State as FlightState } from './flight/types';
import * as nestStore from './nest';
import { State as NestState } from './nest/types';
import * as projectStore from './project';
import { State as ProjectState } from './project/types';
import * as variableGroupsStore from './variable-groups';
import { State as VariableGroupState } from './variable-groups/types';

export interface ApplicationState {
	global: {
		flight: FlightState;
		nest: NestState;
		project: ProjectState;
		variableGroups: VariableGroupState;
	};
}

function createRootReducer() {
	return combineReducers<ApplicationState>({
		global: combineReducers({
			flight: flightStore.reducers,
			nest: nestStore.reducers,
			project: projectStore.reducers,
			variableGroups: variableGroupsStore.reducers,
		}),
	});
}

function* rootSaga() {
	yield all([
		fork(flightStore.sagas),
		fork(nestStore.sagas),
		fork(projectStore.sagas),
		fork(variableGroupsStore.sagas),
	]);
}

function createInitialState(): ApplicationState {
	return {
		global: {
			flight: flightStore.types.initialState,
			nest: nestStore.types.initialState,
			project: projectStore.types.initialState,
			variableGroups: variableGroupsStore.types.initialState,
		},
	};
}

export function configureStore() {
	const composeEnhancers = composeWithDevTools({});
	const sagaMiddleware = createSagaMiddleware();
	const initialState = createInitialState();

	const store = createStore(
		createRootReducer(),
		initialState,
		composeEnhancers(applyMiddleware(sagaMiddleware)),
	);

	const context = {
		client: new NestClient('https://nest.getbeak.app/1/'),
	};

	sagaMiddleware.setContext(context);
	sagaMiddleware.run(rootSaga);

	// TODO(afr): This is temporary until I get the dev tools attached
	window.store = store;

	return store;
}
