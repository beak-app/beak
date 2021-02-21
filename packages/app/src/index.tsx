import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import About from './containers/About';
import Onboarding from './containers/Onboarding';
import ProjectMain from './containers/ProjectMain';
import Welcome from './containers/Welcome';
import { DesignSystemProvider, GlobalStyle } from './design-system';
import { BeakDarkThemeStyle } from './design-system/editor-themes';
import { setGlobal } from './globals';
import { ipcAppService } from './lib/ipc';
import { configureStore } from './store';

const process = window.require('electron').remote.require('process');

function getComponent(container: string | null) {
	switch (container) {
		case 'welcome':
			return <Welcome />;

		case 'about':
			return <About />;

		case 'project-main':
			return <ProjectMain />;

		case 'onboarding':
			return <Onboarding />;

		default:
			return <span>{'unknown'}</span>;
	}
}

const FauxRouter: React.FunctionComponent = () => {
	const params = new URLSearchParams(window.location.search);
	const container = params.get('container');
	const windowId = params.get('windowId');
	const component = getComponent(container);

	setGlobal('windowId', windowId);
	setGlobal('platform', process.platform);
	ipcAppService.getVersion().then(version => setGlobal('version', version));

	return (
		<Provider store={configureStore()}>
			<base href={'./'} />
			<DesignSystemProvider themeKey={'dark'}>
				<GlobalStyle />
				<BeakDarkThemeStyle />
				{component}
			</DesignSystemProvider>
		</Provider>
	);
};

ReactDOM.render(<FauxRouter />, document.getElementById('root'));
