import * as React from 'react';
import { Box, Button, ButtonGroup, Grid, Typography } from '@mui/material';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';
import Footer from './Footer';
import home from '../assets/bg-home.mp4';

export default function Home({ theme }) {
	const [loopNum, setLoopNum] = React.useState(0);
	const [isDeleting, setIsDeleting] = React.useState(false);
	const [text, setText] = React.useState('');
	const [delta, setDelta] = React.useState(300 - Math.random() * 100);

	const parallax = React.useRef<IParallax>(null!);
	const period = 2000;
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
			<ParallaxLayer
				offset={1}
				speed={1}
				style={{ backgroundColor: '#805E73' }}
			/>
			<ParallaxLayer
				offset={2}
				speed={1}
				style={{ backgroundColor: '#87BCDE' }}
			/>

			<ParallaxLayer
				offset={0}
				speed={1}
				factor={1}
				style={{
					backgroundColor: '#87BCDE',
					fill: 'blur(10px)',
					zIndex: 0,
				}}
				onClick={() => parallax.current.scrollTo(1)}
			>
				<video autoPlay loop muted playsInline style={{ filter: 'blur(2px)' }}>
					<source src={home} type='video/mp4' />
				</video>
			</ParallaxLayer>

			{/*contents*/}
			<ParallaxLayer
				offset={2}
				speed={-0.3}
				style={{
					backgroundSize: '80%',
					backgroundPosition: 'center',
					border: '1px solid black',
				}}
			>
				<div>This is the 3rd layer</div>
			</ParallaxLayer>

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
								Welcome to {text}
							</Typography>
							<Typography paragraph fontFamily='Karla' my={4}>
								Welcome to Zeleze, your go-to platform for customized mutual
								help services. Zeleze addresses this challenge by providing a
								platform that accurately defines and communicates the real-time
								needs of individuals and groups. We connect those in need with
								individuals and communities willing to offer assistance,
								ensuring aid is targeted and avoiding duplication. Whether
								you're looking to support your local community or extend a
								helping hand internationally, Zeleze is your hub for creating
								and fulfilling meaningful needs. You can easily create your own
								need page, specifying whether you require objects or services,
								and share it with your network. Join Zeleze, be part of a
								international network of solidarity, and contribute to building
								a global community where assistance is personalized, impactful,
								and efficiently delivered.
							</Typography>
							<ButtonGroup>
								<Button
									variant='outlined'
									size='large'
									color='inherit'
									href='/signup'
								>
									Sign up
								</Button>
								<Button
									variant='outlined'
									size='large'
									color='inherit'
									href='/login'
								>
									Log in
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
