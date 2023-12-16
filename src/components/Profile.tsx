import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import { Box, Grid, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import pic1 from '../assets/images/goods1.jpg';
import pic2 from '../assets/images/goods2.jpg';

export default function Profile() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<Grid
			container
			justifyContent='center'
			borderRadius={1}
			md={8}
			boxShadow={5}
			minHeight='50vh'
			minWidth='50vw'
			bgcolor={
				theme.palette.mode === 'dark'
					? 'rgba(0, 0, 0, 0.7)'
					: 'rgba(255, 255, 255, 0.7)'
			}
		>
			<Grid
				item
				xs={12}
				sm={6}
				md={6}
				lg={6}
				display='flex'
				flexDirection='column'
				alignItems='center'
				sx={{
					backgroundImage: `url(${pic1})`,
					backgroundSize: 'auto 100%',
					backgroundPositionX: 'center',
				}}
			>
				<Box
					height='100%'
					display='flex'
					flexDirection='column'
					justifyContent='center'
					borderRadius={1}
					bgcolor='rgba(0,0,0,0.5)'
					sx={{
						':hover': { bgcolor: 'rgba(0,0,0,0.7)' },
						transitionDuration: '1s',
					}}
				>
					<Link href='/signup' color='primary.light' underline='none'>
						Do not have an account? Join us now!
					</Link>
				</Box>
			</Grid>
			<Grid
				item
				xs={12}
				sm={6}
				md={6}
				lg={6}
				display='flex'
				flexDirection='column'
				alignItems='center'
				sx={{
					backgroundImage: `url(${pic2})`,
					backgroundSize: 'auto 100%',
					backgroundPositionX: 'center',
				}}
			>
				<Box
					height='100%'
					display='flex'
					flexDirection='column'
					justifyContent='center'
					borderRadius={1}
					bgcolor='rgba(0,0,0,0.5)'
					sx={{
						':hover': { bgcolor: 'rgba(0,0,0,0.7)' },
						transitionDuration: '1s',
					}}
				>
					<Link href='/signup' color='primary.light' underline='none'>
						Do not have an account? Join us now!
					</Link>
				</Box>
			</Grid>
		</Grid>
	);
}
