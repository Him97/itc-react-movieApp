import * as React from 'react';
import axios, { AxiosResponse } from 'axios';
import {
	Avatar,
	Box,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import pic from '../assets/images/goods1.jpg';

export default function Login() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = React.useContext(ThemeContext);
	const [email, setEmail] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');

	const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		try {
			const response = await axios.post('/login', { email, password });
			localStorage.setItem('USER', JSON.stringify(response.token));
			console.log('Token saved in localStorage:', localStorage.getItem('USER'));
			if (localStorage.getItem('USER')) {
				setTimeout(async () => {
					navigate('/');
				}, 1000);
			} else {
				console.log('something is wrong');
			}
		} catch (error) {
			console.error('Full Error Object:', error);
		}
	};

	return (
		<Grid
			container
			justifyContent='center'
			borderRadius={1}
			md={8}
			boxShadow={5}
			maxHeight='10%'
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
				p={4}
				display='flex'
				flexDirection='column'
				alignItems='center'
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{t('t-login')}
				</Typography>
				<Box component='form' noValidate onSubmit={handleLogin}>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label={t('t-email')}
						name='email'
						autoComplete='email'
						autoFocus
						onChange={(e) => setEmail(e.target.value)}
						value={email}
						error={
							email !== '' &&
							!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
						}
						helperText={
							email !== '' &&
							!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
								? t('t-invalid-email')
								: ''
						}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label={t('t-password')}
						type='password'
						id='password'
						autoComplete='current-password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>

					<FormControlLabel
						control={<Checkbox value='remember' color='primary' />}
						label='Remember me'
					/>
					<Button
						type='submit'
						fullWidth
						variant='outlined'
						sx={{ my: 3 }}
						disabled={
							email === '' ||
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
							password === ''
						}
					>
						{t('t-login')}
					</Button>
					<Link href='#' variant='body2'>
						Forgot password?
					</Link>
				</Box>
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
