import * as React from 'react';
import { GET } from '../utils/api';
import {
	Box,
	Card,
	CardActions,
	Chip,
	CssBaseline,
	Link,
	Stack,
	Typography,
} from '@mui/material';
import { useTheme } from '@mui/material';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import hands from '../assets/video/bg-hands.mp4';
import useSnackbar from '../utils/useSnackbar';
import { EntryObj, UserObj } from './types';

export default function EntryCard() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { SnackbarProps } = useSnackbar();
	const { id } = useParams();
	const [entry, setEntry] = React.useState<EntryObj>();
	const [entryOwner, setEntryOwner] = React.useState<UserObj>();

	React.useEffect(() => {
		const preventDefault = (e: Event) => e.preventDefault();
		document.addEventListener('gesturestart', preventDefault);
		document.addEventListener('gesturechange', preventDefault);

		return () => {
			document.removeEventListener('gesturestart', preventDefault);
			document.removeEventListener('gesturechange', preventDefault);
		};
	}, []);

	React.useEffect(() => {
		const getEntry = async () => {
			if (typeof Number(id) === 'number') {
				try {
					const entry: EntryObj = await GET(`/entries/${id}`);
					console.log(entry);
					setEntry(entry);
				} catch (error) {
					console.error(error);
				}
			} else {
				SnackbarProps(
					'Entry does not exist, redirecting to homepage shortly.',
					false
				);
				setTimeout(() => {
					navigate('/');
				}, 1000);
			}
		};

		const getUser = async () => {
			if (entry?.userid || typeof Number(entry?.userid) === 'number') {
				try {
					const user: UserObj = await GET(`/users/${entry?.userid}`);
					setEntryOwner(user);
				} catch (error) {
					console.error(error);
				}
			} else {
				return;
			}
		};

		getEntry();
		if (entry?.userid || typeof Number(entry?.userid) === 'number') {
			getUser();
		}
	}, [id, entry?.userid, navigate, SnackbarProps]);

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
					<Card
						style={{
							borderRadius: '5px',
							boxShadow:
								theme.palette.mode === 'dark'
									? '0 0 5px 0 rgba(255 ,255 ,255 ,0.5)'
									: '0 0 5px 0 rgba(0, 0, 0, 0.5)',
							backgroundColor:
								theme.palette.mode === 'dark'
									? 'rgba(0, 0, 0, 0.7)'
									: 'rgba(255, 255, 255, 0.7)',
						}}
					>
						{entry?.image && (
							<img
								srcSet={`${entry.image}?w=162&auto=format&dpr=2 2x`}
								src={`${entry.image}?w=162&auto=format`}
								alt={entry.title}
								width='100%'
								style={{
									display: entry.image ? 'block' : 'none',
									borderRadius: '5px',
								}}
							/>
						)}

						<CardActions
							sx={{
								display: 'flex',
								flexDirection: 'column',
								p: 0,
								justifyContent: 'space-between',
								alignItems: 'center',
								position: 'relative',
							}}
						>
							{entry?.image && (
								<img
									src={entry.image}
									alt={entry.title}
									width='100%'
									height='100%'
									style={{
										visibility: entry.image ? 'visible' : 'hidden',
										position: 'absolute',
										filter: 'blur(25px)',
									}}
								/>
							)}

							<Stack zIndex={1} p={2} width='100%'>
								<Typography align='left' variant='h5'>
									{entry?.title}
								</Typography>
								{entry?.category ||
									('' && (
										<Chip
											label={entry?.category}
											variant='outlined'
											color='primary'
										/>
									))}
								<Typography align='left'>
									{entry?.country + ' ' + entry?.region}
								</Typography>
								<Link href={`mailto:${entryOwner?.email}`}>
									Send an email to {entryOwner?.firstname}
								</Link>
							</Stack>
						</CardActions>
					</Card>
					<Outlet />
				</animated.div>
			</Box>
		</Box>
	);
}
