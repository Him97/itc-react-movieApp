import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardActions,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	IconButton,
	Stack,
	Slider,
	Typography,
} from '@mui/material';
import PauseIcon from '@mui/icons-material/Pause';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import HandshakeIcon from '@mui/icons-material/Handshake';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../contexts/User';
import { useTranslation } from 'react-i18next';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import useSnackbar from '../utils/useSnackbar';
import Entry from './Entry';
import home from '../assets/video/bg-home.mp4';
import foods from '../assets/video/bg-foods.mp4';
import team from '../assets/video/bg-team.mp4';
import feedback1 from '../assets/video/IMG_4679.mp4';
import feedback2 from '../assets/video/IMG_4680.mp4';
import njama from '../assets/images/njama.jpg';
import xin from '../assets/images/xin.jpg';
import hava from '../assets/images/hava2.jpg';
import { UserObj } from './types';

const videos = [feedback1, feedback2];

export default function Home() {
	const { t } = useTranslation();
	const { SnackbarProps } = useSnackbar();
	const navigate = useNavigate();
	const theme = useTheme();
	const user = React.useContext(UserContext) as UserObj;
	const [loopNum, setLoopNum] = React.useState<number>(0);
	const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
	const [text, setText] = React.useState<string>('');
	const [delta, setDelta] = React.useState<number>(300 - Math.random() * 100);
	const [createEntry, setCreateEntry] = React.useState<boolean>(false);
	const videoRef = React.useRef<HTMLVideoElement>(null);
	const [videoSrc, setVideoSrc] = React.useState<number>(0);
	const [videoPlaying, setVideoPlaying] = React.useState<boolean>(false);
	const [volume, setVolume] = React.useState<number>(30);
	const parallax = React.useRef<IParallax>(null!);

	const teammates = [
		{
			name: 'Xin',
			role: 'Frontend Developper | UX/UI Designer',
			bio: 'Xin always wanted to push the project to another level, he is a passionate developper with great talent and expertise in web development...',
			avatar: xin,
			github: 'https://github.com/him-li',
			email: 'xin.li@outlook.co.il',
		},
		{
			name: 'Njama',
			role: 'Team Leader | Backend Developper',
			bio: 'Njama has always the good words to motivate his people and he can crack any beug in one minute, the project owns him a lot! ',
			avatar: njama,
			github: 'https://github.com/IsmaelNjama',
			email: 'petermailsnjama@gmail.com',
		},
		{
			name: 'Hava',
			role: 'Backend Developper | Strategic Operations Manager',
			bio: 'At the origin of the project, she led the business side, and coded the development backend.',
			avatar: hava,
			github: 'https://github.com/havalei',
			email: 'hava@gmail.com',
		},
	];

	const period: number = 2000;
	const toRotate = [
		'Zelaze',
		'助一助',
		'لبعضنا البعض',
		'ㄗㄝㄌㄚㄗㄝ',
		'Zlaze',
		'互幫互助',
		'זה לזה',
		'Usaidizi Kwa Wote',
		'そうごふじょ',
	];

	React.useEffect(() => {
		const ticker = setInterval(() => {
			tick();
		}, delta);
		return () => clearInterval(ticker);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text, delta]);

	const tick = () => {
		const i = loopNum % toRotate.length;
		const fullText = toRotate[i];
		const updatedText = isDeleting
			? fullText.substring(0, text.length - 1)
			: fullText.substring(0, text.length + 1);
		setText(updatedText);
		if (isDeleting) {
			setDelta((prevDelta) => prevDelta / 2);
		}
		if (!isDeleting && updatedText === fullText) {
			setIsDeleting(true);
			setDelta(period);
		} else if (isDeleting && updatedText === '') {
			setIsDeleting(false);
			setLoopNum(loopNum + 1);
			setDelta(500);
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('USER');
		console.log(localStorage.getItem('USER'));
		if (localStorage.getItem('USER') === null) {
			SnackbarProps(t('t-logout-success'), true);
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			SnackbarProps(t('t-logout-failed'), false);
		}
	};

	const handleCreateEntry = () => setCreateEntry(true);
	const handleCloseEntry = () => setCreateEntry(false);

	const playPauseHandler = () => {
		const video = videoRef.current;
		if (video?.paused) {
			video.play();
			setVideoPlaying(true);
		} else if (video) {
			video.pause();
			setVideoPlaying(false);
		}
	};

	const nextVideoHandler = () => {
		setVideoSrc((prev) => (prev + 1) % videos.length);
	};

	const previousVideoHandler = () => {
		setVideoSrc((prev) => (prev - 1 + videos.length) % videos.length);
	};

	const handleChangeVolume = (event: Event, newValue: number | number[]) => {
		event.preventDefault();
		setVolume(newValue as number);
	};

	return (
		<Box
			component='main'
			minHeight='100vh'
			display='flex'
			justifyContent='center'
			alignItems='center'
			position='relative'
			sx={{ filter: createEntry ? 'blur(5px)' : 'none' }}
		>
			<Parallax ref={parallax} pages={3}>
				{/*backgrounds*/}
				<ParallaxLayer offset={1} speed={1} factor={2}>
					<Box
						component='video'
						autoPlay
						loop
						muted
						playsInline
						style={{ filter: 'blur(2px)' }}
						src={foods}
					/>
				</ParallaxLayer>
				<ParallaxLayer offset={2} speed={1}>
					<Box
						component='video'
						autoPlay
						loop
						muted
						playsInline
						style={{ filter: 'blur(2px)' }}
						src={team}
					/>
				</ParallaxLayer>
				<ParallaxLayer
					offset={0}
					speed={1}
					factor={2}
					onClick={() => parallax.current.scrollTo(1)}
				>
					<Box
						component='video'
						autoPlay
						loop
						muted
						playsInline
						style={{ filter: 'blur(2px)' }}
						src={home}
					/>
				</ParallaxLayer>

				{/*contents*/}
				<ParallaxLayer
					offset={0}
					speed={0.1}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box
						component='center'
						py={5}
						color={
							theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark'
						}
						bgcolor={
							theme.palette.mode === 'dark'
								? 'rgba(0, 0, 0, 0.7)'
								: 'rgba(255, 255, 255, 0.7)'
						}
						style={{ backdropFilter: 'blur(10px)' }}
					>
						<Grid container spacing={4} width='75%'>
							<Grid item xs={12} md={8} textAlign='left'>
								<Typography component='h1' variant='h2'>
									{t('t-welcome-to') + text}
								</Typography>
								<Typography paragraph fontFamily='Karla' my={4}>
									{t('p-intro')}
								</Typography>
								{user.id == null || undefined ? (
									<ButtonGroup>
										<Button
											variant='outlined'
											size='large'
											color='inherit'
											onClick={() => navigate('/signup')}
										>
											{t('t-signup')}
										</Button>
										<Button
											variant='outlined'
											size='large'
											color='inherit'
											onClick={() => navigate('/login')}
										>
											{t('t-login')}
										</Button>
									</ButtonGroup>
								) : (
									<ButtonGroup>
										<Button
											variant='outlined'
											size='large'
											color='inherit'
											onClick={() => handleCreateEntry()}
										>
											{t('t-create-entry')}
										</Button>
										<Button
											variant='outlined'
											size='large'
											color='inherit'
											onClick={handleLogout}
										>
											{t('t-logout')}
										</Button>
									</ButtonGroup>
								)}
								<Entry open={createEntry} handleClose={handleCloseEntry} />
							</Grid>
							<Grid
								item
								xs={12}
								md={4}
								onClick={() => parallax.current.scrollTo(1)}
							/>
						</Grid>
					</Box>
				</ParallaxLayer>

				<ParallaxLayer
					offset={1}
					speed={0.1}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Grid container spacing={2} height='100vh'>
						<Grid
							item
							xs={6}
							md={8}
							px={10}
							display='flex'
							flexDirection='column'
							alignItems='end'
							justifyContent='space-evenly'
							onClick={() => parallax.current.scrollTo(2)}
						>
							<Box
								bgcolor={
									theme.palette.mode === 'dark'
										? 'rgba(0, 0, 0, 0.7)'
										: 'rgba(255, 255, 255, 0.7)'
								}
								borderRadius={1}
								textAlign='left'
								p={4}
							>
								<Typography
									component='h1'
									variant='h4'
									fontFamily='Markazi Text'
								>
									{t('t-p1-title')}
								</Typography>
								<Typography paragraph my={4}>
									{t('t-p1-content')}
								</Typography>
							</Box>
							<Box
								bgcolor={
									theme.palette.mode === 'dark'
										? 'rgba(0, 0, 0, 0.7)'
										: 'rgba(255, 255, 255, 0.7)'
								}
								borderRadius={1}
								textAlign='left'
								p={4}
							>
								<Typography
									component='h1'
									variant='h4'
									fontFamily='Markazi Text'
								>
									{t('t-p2-title')}
								</Typography>
								<Typography paragraph my={4}>
									{t('t-p2-content')}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={6} md={4} p={4} display='flex' alignItems='center'>
							<Card
								sx={{
									display: 'flex',
									flexDirection: 'column',
									position: 'relative',
									maxHeight: '75vh',
									backgroundColor: 'transparent',
								}}
							>
								<CardContent
									sx={{
										flex: '1 0 auto',
										position: 'absolute',
										top: 0,
										width: '100%',
										zIndex: 1,
										backgroundColor:
											theme.palette.mode === 'dark'
												? 'rgba(0, 0, 0, 0.7)'
												: 'rgba(255, 255, 255, 0.7)',
									}}
								>
									<Typography component='div' variant='h5'>
										User Feedback
									</Typography>
								</CardContent>
								<CardMedia
									component='video'
									src={videos[videoSrc]}
									ref={videoRef}
									loop
									sx={{
										zIndex: '0',
										width: '100%',
										objectFit: 'contain',
									}}
								/>
								<CardActionArea
									sx={{
										display: 'flex',
										position: 'absolute',
										bottom: 0,
										width: '100%',
										alignItems: 'baseline',
										justifyContent: 'space-between',
										pl: 1,
										pb: 1,
										px: 2,
										backgroundColor:
											theme.palette.mode === 'dark'
												? 'rgba(0, 0, 0, 0.7)'
												: 'rgba(255, 255, 255, 0.7)',
										zIndex: 1,
									}}
								>
									<ButtonGroup>
										<IconButton
											aria-label='previous'
											onClick={previousVideoHandler}
										>
											{theme.direction === 'rtl' ? (
												<SkipNextIcon />
											) : (
												<SkipPreviousIcon />
											)}
										</IconButton>
										<IconButton
											aria-label='play/pause'
											onClick={playPauseHandler}
										>
											{videoPlaying ? (
												<PauseIcon sx={{ height: 38, width: 38 }} />
											) : (
												<PlayArrowIcon sx={{ height: 38, width: 38 }} />
											)}
										</IconButton>
										<IconButton aria-label='next' onClick={nextVideoHandler}>
											{theme.direction === 'rtl' ? (
												<SkipPreviousIcon />
											) : (
												<SkipNextIcon />
											)}
										</IconButton>
									</ButtonGroup>
									<Stack
										spacing={2}
										direction='row'
										width={200}
										sx={{ mb: 1 }}
										alignItems='center'
									>
										<VolumeDown />
										<Slider
											aria-label='Volume'
											value={volume}
											onChange={handleChangeVolume}
											min={0}
											max={100}
											valueLabelDisplay='auto'
											valueLabelFormat={(value) => `${value}%`}
										/>
										<VolumeUp />
									</Stack>
								</CardActionArea>
							</Card>
						</Grid>
					</Grid>
				</ParallaxLayer>

				<ParallaxLayer
					offset={2}
					speed={-0}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
					onClick={() => parallax.current.scrollTo(0)}
				>
					<Stack>
						<Box component='div' display='flex'>
							<HandshakeIcon
								sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
								color={theme.palette.mode === 'dark' ? 'inherit' : 'action'}
							/>
							<Typography
								variant='h5'
								noWrap
								component='h1'
								color={
									theme.palette.mode === 'dark'
										? 'primary.light'
										: 'primary.dark'
								}
								display={{ xs: 'none', md: 'flex' }}
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
						</Box>
						<Stack direction='row' spacing={2}>
							{teammates.map((teammate) => (
								<Card
									sx={{
										maxWidth: 345,
										backgroundColor:
											theme.palette.mode === 'dark'
												? 'rgba(0, 0, 0, 0.7)'
												: 'rgba(255, 255, 255, 0.7)',
									}}
								>
									<CardActionArea>
										<CardMedia
											component='img'
											height='250rem'
											image={teammate.avatar}
											alt={teammate.name}
										/>
										<CardContent style={{ textAlign: 'left' }}>
											<Typography
												gutterBottom
												variant='h3'
												fontFamily='Markazi Text'
												component='div'
											>
												{teammate.name}
											</Typography>
											<Typography gutterBottom variant='h6' component='div'>
												{teammate.role}
											</Typography>
											<Typography variant='body2' color='text.secondary'>
												{teammate.bio}
											</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions>
										<IconButton href={teammate.github}>
											<GitHubIcon />
										</IconButton>
										<IconButton href={`mailto:${teammate.email}`}>
											<EmailIcon />
										</IconButton>
									</CardActions>
								</Card>
							))}
						</Stack>
					</Stack>
				</ParallaxLayer>
			</Parallax>
		</Box>
	);
}
