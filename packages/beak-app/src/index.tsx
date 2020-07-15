import React from 'react';
import ReactDOM from 'react-dom';

import About from './containers/About';
import Welcome from './containers/Welcome';
import { DesignSystemProvider, GlobalStyle } from './design-system';

function getComponent(container: string | null) {
	switch (container) {
		case 'welcome':
			return <Welcome />;

		case 'about':
			return <About />;

		default:
			return <span>{'unknown'}</span>;
	}
}

const FauxRouter: React.FunctionComponent = () => {
	const params = new URLSearchParams(window.location.search);
	const container = params.get('container');
	const component = getComponent(container);

	return (
		<DesignSystemProvider themeKey={'dark'}>
			<GlobalStyle />
			{component}
		</DesignSystemProvider>
	);
};

ReactDOM.render(<FauxRouter />, document.getElementById('root'));
