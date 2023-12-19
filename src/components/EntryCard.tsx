import * as React from 'react';
import { GET } from '../utils/api';
import {
	Box,
	ButtonGroup,
	CardActions,
	Chip,
	CssBaseline,
	FormControl,
	Grid,
	IconButton,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { useTheme } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useSpring, animated, to } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import useSnackbar from '../utils/useSnackbar';
import { EntryObj, UserObj } from './types';
import pic from '../assets/images/goods1.jpg';
import hands from '../assets/video/bg-hands.mp4';

export default function EntryCard() {
	const theme = useTheme();
	const navigate = useNavigate();
	const { t } = useTranslation();
	const { SnackbarProps } = useSnackbar();
	const { id } = useParams();
	const [entry, setEntry] = React.useState<EntryObj>();
	const [entryOwner, setEntryOwner] = React.useState<UserObj>();
	const [message, setMessage] = React.useState<string>('');

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
					setEntry(entry);
					console.log(entry.userid);
					if (entry?.userid || typeof Number(entry?.userid) === 'number') {
						await getUser();
					}
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
			try {
				const user: UserObj = await GET(`/users/${entry?.userid}`);
				setEntryOwner(user);
			} catch (error) {
				console.log('lama');
			}
		};

		getEntry();
	}, [id, entry?.userid, navigate, SnackbarProps]);

	const sendWhatsAppMessage = () => {
		// Replace with your logic to send a WhatsApp message
		window.open(
			`https://wa.me/${entryOwner?.phone}?text=${encodeURIComponent(message)}`
		);
	};

	const sendEmail = () => {
		// Replace with your logic to send an email
		window.location.href = `mailto:${entryOwner?.email}?subject=Your%20Subject&body=${encodeURIComponent(
			message
		)}`;
	};

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
			<Box component='div' minWidth='50vw'>
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
					<Grid
						container
						justifyContent='center'
						borderRadius={1}
						boxShadow={5}
						maxHeight='50vh'
						bgcolor={
							theme.palette.mode === 'dark'
								? 'rgba(0, 0, 0, 0.7)'
								: 'rgba(255, 255, 255, 0.7)'
						}
						minHeight='50vh'
					>
						<Grid
							item
							xs={12}
							sm={6}
							md={6}
							lg={6}
							p={4}
							display='flex'
							flexDirection='column'
							alignItems='center'
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
										<br />
										{entry?.description}
									</Typography>
								</Stack>
							</CardActions>
						</Grid>
						<Grid
							item
							xs={12}
							sm={6}
							md={6}
							lg={6}
							sx={{
								backgroundImage: `url(${pic})`,
								backgroundSize: 'auto 100%',
								backgroundPositionX: 'center',
							}}
						>
							<Box
								height='100%'
								display='flex'
								flexDirection='column'
								justifyContent='space-between'
								p={4}
								borderRadius={1}
								bgcolor='rgba(0,0,0,0.5)'
								sx={{
									':hover': { bgcolor: 'rgba(0,0,0,0.7)' },
									transitionDuration: '1s',
								}}
							>
								<IconButton size='large' onClick={() => navigate('/signup')}>
									<HandshakeIcon
										sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
										color='primary'
									/>
									<Typography
										variant='h5'
										display={{ xs: 'none', md: 'flex' }}
										color='primary.light'
										fontFamily='monospace'
										fontWeight={700}
										letterSpacing='.3rem'
										mr={2}
										sx={{
											textDecoration: 'none',
										}}
									>
										{t('t-zelaze')}
									</Typography>
								</IconButton>
								<FormControl
									style={{ height: '100%', justifyContent: 'space-between' }}
								>
									<TextField
										id='message'
										label={t('t-message-placeholder')}
										color={
											theme.palette.mode === 'dark' ? 'primary' : 'success'
										}
										style={{ height: '100%' }}
										multiline
										minRows={10}
										maxRows={10}
										variant='standard'
										onChange={(event) => setMessage(event.target.value)}
									/>

									<ButtonGroup
										fullWidth
										style={{ justifyContent: 'space-evenly' }}
									>
										<IconButton
											color='success'
											size='large'
											onClick={sendWhatsAppMessage}
										>
											<WhatsAppIcon />
										</IconButton>
										<IconButton
											color='primary'
											size='large'
											onClick={sendEmail}
										>
											<EmailIcon />
										</IconButton>
									</ButtonGroup>
								</FormControl>
							</Box>
						</Grid>
					</Grid>
					<Outlet />
				</animated.div>
			</Box>
		</Box>
	);
}
