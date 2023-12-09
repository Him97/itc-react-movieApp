import * as React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import hands from '../assets/video/bg-hands.mp4';
import Login from './Login';
import Signup from './Signup';
import Footer from './Footer';

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

	const [{ wheelY }, wheelApi] = useSpring(() => ({ wheelY: 0 }));

	useGesture(
		{
			onDrag: ({ active, offset: [x, y] }) =>
				api({ x, y, scale: active ? 1 : 1.1 }),
			onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200 }),
			onMove: ({ dragging }) =>
				!dragging &&
				api({
					scale: 1.05,
				}),
			onHover: ({ hovering }) => !hovering && api({ scale: 1 }),
			onWheel: ({ event, offset: [, y] }) => {
				event.preventDefault();
				wheelApi.set({ wheelY: y });
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
			<animated.div
				ref={target}
				style={{
					maxWidth: '90%',
					display: 'flex',
					justifyContent: 'center',
					x,
					y,
					scale: to([scale, zoom], (s, z) => s + z),
				}}
			>
				{pathname === '/login' ? (
					<Login />
				) : pathname === '/signup' ? (
					<Signup />
				) : null}
				<Outlet />
			</animated.div>
			<Footer />
		</Box>
	);
}
