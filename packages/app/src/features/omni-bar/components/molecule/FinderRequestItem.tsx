import { Context } from '@beak/app/features/variable-input/realtime-values/types';
import { convertRequestToUrl } from '@beak/app/utils/uri';
import { RequestOverview } from '@beak/common/types/beak-project';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface FinderRequestItemProps {
	context: Context;
	info: RequestOverview;
}

const FinderRequestItem: React.FunctionComponent<FinderRequestItemProps> = ({ context, info }) => {
	const [uri, setUri] = useState('');

	useEffect(() => {
		convertRequestToUrl(context, info).then(s => setUri(s.toString()));
	}, [context, info]);

	return (
		<UriSpan>
			{uri}
		</UriSpan>
	);
};

const UriSpan = styled.small`
	opacity: 0.9;
`;

export default FinderRequestItem;
