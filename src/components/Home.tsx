import * as React from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { UserContext, UserContextProps } from '../contexts/User';
import { useTranslation } from 'react-i18next';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import Entry from './Entry';
import home from '../assets/video/bg-home.mp4';
import foods from '../assets/video/bg-foods.mp4';
import team from '../assets/video/bg-team.mp4';

export default function Home() {
	const { t } = useTranslation();
	const theme = useTheme();
	const user = React.useContext(UserContext) as UserContextProps;
	const [loopNum, setLoopNum] = React.useState<number>(0);
	const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
	const [text, setText] = React.useState<string>('');
	const [delta, setDelta] = React.useState<number>(300 - Math.random() * 100);
	const [createEntry, setCreateEntry] = React.useState<boolean>(false);

	const parallax = React.useRef<IParallax>(null!);
	const period: number = 2000;
	const toRotate = [
		'Zelaze',
		'助一助',
		'لبعضنا البعض',
		'ㄗㄝㄌㄚㄗㄝ',
		'Zlaze',
		'互幫互助',
		'זה לזה',
		'𗡨𗡨',
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
			setTimeout(() => {
				window.location.reload();
			}, 1000);
		} else {
			console.log('error');
		}
	};

	const handleCreateEntry = () => setCreateEntry(true);
	const handleCloseEntry = () => setCreateEntry(false);

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
											href='/signup'
										>
											{t('t-signup')}
										</Button>
										<Button
											variant='outlined'
											size='large'
											color='inherit'
											href='/login'
										>
											{t('t-login')}
										</Button>
									</ButtonGroup>
								) : (
									<ButtonGroup>
										<Entry open={createEntry} handleClose={handleCloseEntry} />
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
					onClick={() => parallax.current.scrollTo(2)}
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<div>This is the second layer</div>
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
					<div>This is the third layer</div>
				</ParallaxLayer>
			</Parallax>
		</Box>
	);
}
