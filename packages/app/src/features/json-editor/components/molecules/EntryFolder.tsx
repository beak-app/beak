import RequestPreferencesContext from '@beak/app/features/request-pane/contexts/request-preferences-context';
import React, { useContext } from 'react';
import styled from 'styled-components';

interface EntryFolderProps {
	id: string;
	requestId: string;
	expanded?: boolean;
	onChange: (expanded: boolean) => void;
}

const EntryFolder: React.FunctionComponent<EntryFolderProps> = props => {
	const { expanded, id, onChange } = props;
	const reqPref = useContext(RequestPreferencesContext);

	return (
		<Wrapper onClick={() => {
			reqPref?.setJsonEditorExpand(id, !expanded);
			onChange(!expanded);
		}}>
			<Chevron expanded={Boolean(expanded)} />
		</Wrapper>
	);
};

export const EntryFolderIrrelevant: React.FunctionComponent = () => (<Wrapper />);

const Wrapper = styled.div`
	margin-top: 1px;
	width: 15px;
`;

const Chevron = styled.div<{ expanded: boolean }>`
	display: inline-block;
	border-right: 1px solid ${props => props.theme.ui.textOnSurfaceBackground};
	border-bottom: 1px solid ${props => props.theme.ui.textOnSurfaceBackground};
	width: 5px;
	height: 5px;
	transform: rotate(${props => props.expanded ? '45deg' : '-45deg'});
	transform-origin: 50%;

	margin-bottom: ${props => props.expanded ? '2px' : 0};
	margin-left: 5px;
`;

export default EntryFolder;
