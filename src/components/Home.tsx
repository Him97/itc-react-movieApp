import * as React from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
	useTransition,
	useSpring,
	useChain,
	config,
	animated,
	useSpringRef,
} from '@react-spring/web';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import Footer from './Footer';
import home from '../assets/video/bg-home.mp4';
import foods from '../assets/video/bg-foods.mp4';
import team from '../assets/video/bg-team.mp4';

export default function Home({ theme }) {
	const { t } = useTranslation();
	const [loopNum, setLoopNum] = React.useState<number>(0);
	const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
	const [text, setText] = React.useState<string>('');
	const [delta, setDelta] = React.useState<number>(300 - Math.random() * 100);

	const parallax = React.useRef<IParallax>(null!);
	const period: number = 2000;
	const toRotate = ['Zeleze', '助一助', 'Zlaze', '互幫互助', 'זה לזה', '𗡨𗡨'];

	React.useEffect(() => {
		const ticker = setInterval(() => {
			tick();
		}, delta);
		return () => clearInterval(ticker);
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

	return (
		<Parallax ref={parallax} pages={3}>
			{/*backgrounds*/}
			<ParallaxLayer offset={1} speed={1} factor={2}>
				{' '}
				<video
					autoPlay
					loop
					muted
					playsInline
					style={{ filter: 'blur(2px)' }}
					src={foods}
				/>
			</ParallaxLayer>
			<ParallaxLayer offset={2} speed={1} style={{ objectFit: 'cover' }}>
				{' '}
				<video
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
				<video
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
							<Typography variant='h2' fontFamily='Markazi Text'>
								{t('t-welcome-to') + text}
							</Typography>
							<Typography paragraph fontFamily='Karla' my={4}>
								{t('p-intro')}
							</Typography>
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
				<Footer theme={theme} />
			</ParallaxLayer>
		</Parallax>
	);
}
