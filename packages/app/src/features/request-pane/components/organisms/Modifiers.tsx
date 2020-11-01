import BasicTableView from '@beak/app/components/molecules/BasicTableView';
import { getProjectSingleton } from '@beak/app/lib/beak-project/instance';
import actions from '@beak/app/store/project/actions';
import { RequestPreferenceMainTab } from '@beak/common/dist/types/beak-hub';
import { RequestNode } from '@beak/common/types/beak-project';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import TabBar from '../../../../components/atoms/TabBar';
import TabItem from '../../../../components/atoms/TabItem';
import TabSpacer from '../../../../components/atoms/TabSpacer';
import RequestPreferencesContext from '../../contexts/request-preferences-context';
import Debugger from '../molecules/DebuggerTab';
import BodyTab from './BodyTab';

export interface ModifiersProps {
	node: RequestNode;
}

const Modifiers: React.FunctionComponent<ModifiersProps> = props => {
	const dispatch = useDispatch();
	const preferences = useContext(RequestPreferencesContext)!;
	const { node } = props;
	const [tab, setTabInner] = useState<RequestPreferenceMainTab>(preferences.mainTab);

	useEffect(() => {
		setTabInner(preferences.mainTab);
	}, [preferences.mainTab]);

	function setTab(tab: RequestPreferenceMainTab) {
		setTabInner(tab);

		getProjectSingleton().getHub()
			.setRequestPreferences(node.id, { mainTab: tab, subTab: null });
	}

	return (
		<Container>
			<TabBar centered>
				<TabSpacer />
				<TabItem
					active={tab === 'debugging'}
					onClick={() => setTab('debugging')}
				>
					{'Debugging'}
				</TabItem>
				<TabItem
					active={tab === 'headers'}
					onClick={() => setTab('headers')}
				>
					{'Headers'}
				</TabItem>
				<TabItem
					active={tab === 'url_query'}
					onClick={() => setTab('url_query')}
				>
					{'URL query'}
				</TabItem>
				<TabItem
					active={tab === 'body'}
					onClick={() => setTab('body')}
				>
					{'Body'}
				</TabItem>
				<TabItem
					active={tab === 'options'}
					onClick={() => setTab('options')}
				>
					{'Options'}
				</TabItem>
				<TabSpacer />
			</TabBar>

			<TabBody>
				{tab === 'debugging' && <Debugger node={node} />}
				{tab === 'headers' && (
					<BasicTableView
						editable
						items={node.info.headers}
						addItem={() => dispatch(actions.requestHeaderAdded({ requestId: node.id }))}
						removeItem={ident =>
							dispatch(actions.requestHeaderRemoved({ identifier: ident, requestId: node.id }))
						}
						updateItem={(type, ident, value) =>
							dispatch(actions.requestHeaderUpdated({
								identifier: ident,
								requestId: node.id,
								[type]: value,
							}))
						}
					/>
				)}
				{tab === 'url_query' && (
					<BasicTableView
						editable
						items={node.info.uri.query}
						addItem={() => dispatch(actions.requestQueryAdded({ requestId: node.id }))}
						removeItem={ident =>
							dispatch(actions.requestQueryRemoved({ identifier: ident, requestId: node.id }))
						}
						updateItem={(type, ident, value) =>
							dispatch(actions.requestQueryUpdated({
								identifier: ident,
								requestId: node.id,
								[type]: value,
							}))
						}
					/>
				)}
				{tab === 'body' && (
					<BodyTab node={node} />
				)}
			</TabBody>
		</Container>
	);
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 100%;
`;

const TabBody = styled.div`
	flex-grow: 2;

	overflow-y: auto;
	height: 100%;
`;

export default Modifiers;
