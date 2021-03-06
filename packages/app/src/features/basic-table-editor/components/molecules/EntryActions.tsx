import ActionIconButton from '@beak/app/components/molecules/ActionIconButton';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import styled from 'styled-components';

interface EntryActionsProps {
	onRemove: () => void;
}

const EntryActions: React.FunctionComponent<EntryActionsProps> = ({ onRemove }) => (
	<Wrapper>
		<ActionIconButton
			tabIndex={-1}
			icon={faMinus}
			onClick={() => onRemove()}
		/>
	</Wrapper>
);

const Wrapper = styled.div`
	display: flex;
	height: 100%;

	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
`;

export default EntryActions;
