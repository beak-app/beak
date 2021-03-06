import { checkShortcut } from '@beak/app/lib/keyboard-shortcuts';
import { tabSelected } from '@beak/app/store/project/actions';
import { movePosition } from '@beak/app/utils/arrays';
import { TypedObject } from '@beak/common/helpers/typescript';
import { RequestNode } from '@beak/common/types/beak-project';
import Fuse from 'fuse.js';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled, { css } from 'styled-components';

import FinderRequestItem from '../molecule/FinderRequestItem';

export interface FinderViewProps {
	content: string;
	reset: () => void;
}

const FinderView: React.FunctionComponent<FinderViewProps> = ({ content, reset }) => {
	const dispatch = useDispatch();
	const tree = useSelector(s => s.global.project.tree) || {};
	const { selectedGroups, variableGroups } = useSelector(s => s.global.variableGroups);
	const projectPath = useSelector(s => s.global.project.projectPath)!;
	const flattened = TypedObject.values(tree).filter(t => t.type === 'request') as RequestNode[];
	const [matches, setMatches] = useState<string[]>([]);
	const [active, setActive] = useState<number>(-1);
	const context = { projectPath, selectedGroups, variableGroups };

	const fuse = new Fuse(flattened, {
		includeScore: true,
		keys: [
			'name',
			'info.uri.host',
			'info.uri.path',
		],
	});

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			switch (true) {
				case checkShortcut('omni-bar.finder.down', event):
					setActive(movePosition(matches, active, 'forward'));

					break;

				case checkShortcut('omni-bar.finder.up', event):
					setActive(movePosition(matches, active, 'backward'));

					break;

				case checkShortcut('omni-bar.finder.open', event):
					if (active < 0)
						break;

					reset();
					dispatch(tabSelected({
						type: 'request',
						payload: matches[active],
						temporary: true,
					}));

					break;

				default:
					return;
			}

			event.preventDefault();
		}

		window.addEventListener('keydown', onKeyDown);

		return () => window.removeEventListener('keydown', onKeyDown);
	}, [matches, active, reset]);

	useEffect(() => {
		const matchedIds = fuse.search(content).map(s => s.item.id);

		setMatches(matchedIds);
	}, [content]);

	if (!content)
		return null;

	return (
		<Container tabIndex={0}>
			{matches?.map((k, i) => {
				const match = tree[k];
				const reqNode = match as RequestNode;

				return (
					<Item
						active={active === i}
						key={k}
						tabIndex={0}
						onClick={() => {
							reset();
							dispatch(tabSelected({
								type: 'request',
								payload: k,
								temporary: true,
							}));
						}}
					>
						{match.name}
						{match.type === 'request' && (
							<React.Fragment>
								{' - '}
								<FinderRequestItem context={context} info={reqNode.info} />
							</React.Fragment>
						)}
					</Item>
				);
			})}
		</Container>
	);
};

const Container = styled.div`
	border-top: 1px solid ${p => p.theme.ui.backgroundBorderSeparator};
	padding: 8px 0;
`;

const Item = styled.div<{ active: boolean }>`
	font-size: 13px;
	color: ${p => p.theme.ui.textOnSurfaceBackground};
	padding: 4px 10px;
	cursor: pointer;

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	text-decoration: none;

	&:hover { background: ${p => p.theme.ui.secondaryActionMuted}; }
	${p => p.active ? css`background: ${p => p.theme.ui.secondaryActionMuted};` : ''}
`;

export default FinderView;
