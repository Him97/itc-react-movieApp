import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import hands from '../assets/video/bg-hands.mp4';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';

export default function Auth() {
	const location = useLocation();
	const { pathname } = location;

	React.useEffect(() => {
		const preventDefault = (e: Event) => e.preventDefault();
		document.addEventListener('gesturestart', preventDefault);
		document.addEventListener('gesturechange', preventDefault);

		return () => {
			document.removeEventListener('gesturestart', preventDefault);
			document.removeEventListener('gesturechange', preventDefault);
		};
	}, []);

	const target = React.useRef(null);
	const [{ x, y, zoom, scale }, api] = useSpring(() => ({
		scale: 1,
		zoom: 0,
		x: 0,
		y: 0,
		config: { mass: 5, tension: 350, friction: 40 },
	}));

	useGesture(
		{
			onDrag: ({ active, offset: [x, y] }) =>
				api.start({ x, y }) && scale.start(active ? 1 : 1.1),
			onPinch: ({ offset: [d] }) => zoom.start(d / 2),
			onMove: ({ dragging }) => !dragging && scale.start(1.05),
			onHover: ({ hovering }) => !hovering && scale.start(1),
			onWheel: ({ event }) => {
				event.preventDefault();
			},
		},
		{ target, eventOptions: { passive: false } }
	);

	return (
		<Box
			component='main'
			minHeight='100vh'
			display='flex'
			justifyContent='center'
			alignItems='center'
			position='relative'
		>
			<CssBaseline />
			<Box
				component='video'
				autoPlay
				muted
				loop
				src={hands}
				style={{ filter: 'blur(2px)' }}
				position='absolute'
				zIndex={-1}
			/>
			<Box component='div' maxWidth='lg'>
				<animated.div
					ref={target}
					id='auth-div'
					style={{
						x,
						y,
						scale: to([scale, zoom], (s, z) => s + z),
						touchAction: 'none',
					}}
				>
					{pathname === '/login' ? (
						<Login />
					) : pathname === '/signup' ? (
						<Signup />
					) : pathname === '/profile' ? (
						<Profile />
					) : null}
					<Outlet />
				</animated.div>
			</Box>
		</Box>
	);
}
