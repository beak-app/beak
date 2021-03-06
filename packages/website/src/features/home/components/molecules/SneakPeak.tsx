import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
	0% {
		transform: scale(1);
		opacity: 1
	}

	25% {
		transform: scale(1.2);
	}

	50% {
		transform: scale(0.9);
		opacity: 0.8;
	}

	75% {
		transform: scale(1.3);
	}

	100% {
		transform: scale(1);
		opacity: 1;
	}
}
`;

const SneakPeak: React.FunctionComponent = () => (
	<Wrapper>
		<Gradient />
		<AppPicture>
			<source srcSet={'/assets/home.webp'} type={'image/webp'} />
			<source srcSet={'/assets/home.png'} type={'image/png'} />
			<AppImage loading={'eager'} src={'/assets/home.png'} alt={'The Beak application!'} />
		</AppPicture>
	</Wrapper>
);

const Wrapper = styled.div`
	display: grid;
	grid-template: 1fr / 1fr;
	place-items: center;

	margin-top: min(10vw, 75px);

	> * {
		grid-column: 1 / 1;
		grid-row: 1 / 1;
	}
`;

const Gradient = styled.div`
	z-index: 1;
	width: 100%;
	height: 500px;

	animation: ${pulse} 20s infinite;

	filter: blur(130px);
	background: conic-gradient(
		from 0 at 45% 65%,
		#d45d80AA 0deg,
		#333399AA 120deg,
		#FC3233AA 180deg,
		#ff81a7AA 260deg
	);

	@media (max-width: 676px) {
		display: none;
	}
`;

const AppPicture = styled.picture`
	z-index: 2;
	max-width: 100%;
	object-fit: contain;
`;

const AppImage = styled.img`
	z-index: 2;
	max-width: 100%;
	object-fit: contain;
`;

export default SneakPeak;
