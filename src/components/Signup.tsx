import * as React from 'react';
import axios from 'axios';
import {
	Avatar,
	Box,
	Button,
	Grid,
	Link,
	NativeSelect,
	TextField,
	Typography,
} from '@mui/material';
import { ThemeContext } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import pic from '../assets/images/goods2.jpg';

export default function Signup() {
	interface Country {
		name: string;
		iso2: string;
	}

	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = React.useContext<object>(ThemeContext);
	const [firstname, setFirstname] = React.useState<string>('');
	const [lastname, setLastname] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [phone, setPhone] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [countries, setCountries] = React.useState<object>([]);
	const [country, setCountry] = React.useState<string>('');
	const [regions, setRegions] = React.useState<object>([]);
	const [region, setRegion] = React.useState<string>('');

	React.useEffect(() => {
		const getCountries = async () => {
			try {
				const response = await axios.get(
					'https://countriesnow.space/api/v0.1/countries/positions'
				);
				const data = await response.data;
				if (data.error === false) {
					setCountries(data.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getCountries();
	}, []);

	React.useEffect(() => {
		const getRegions = async () => {
			const body = {
				country: country,
			};
			try {
				const response = await axios.post(
					`https://countriesnow.space/api/v0.1/countries/cities`,
					body
				);
				const data = await response.data;
				console.log(data);
				if (data.error === false) {
					setRegions(data.data);
				}
			} catch (error) {
				console.log(error);
			}
		};
		getRegions();
	}, [country]);

	const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const body = {
			firstname,
			lastname,
			email,
			phone,
			country,
			region,
			password,
		};
		const data = await axios.post('/register', body);
		if (data) {
			setTimeout(async () => {
				navigate('/login');
			}, 1000);
		} else {
			console.log('error');
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
				borderRadius={1}
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
					bgcolor='rgba(0,0,0,0.5)'
					borderRadius={1}
					sx={{
						':hover': { bgcolor: 'rgba(0,0,0,0.7)' },
						transitionDuration: '1s',
					}}
				>
					<Link href='/login' color='primary.light' underline='none'>
						Already registered? Log in to your account now!
					</Link>
				</Box>
			</Grid>
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
					{t('t-signup')}
				</Typography>
				<Box component='form' noValidate onSubmit={handleSignup}>
					<TextField
						margin='normal'
						autoComplete='given-name'
						name='firstname'
						required
						id='firstname'
						label={t('t-firstname')}
						autoFocus
						onChange={(event) => setFirstname(event.target.value)}
						value={firstname}
					/>
					<TextField
						margin='normal'
						required
						id='lastname'
						label={t('t-lastname')}
						name='lastname'
						autoComplete='family-name'
						onChange={(event) => setLastname(event.target.value)}
						value={lastname}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						id='email'
						label={t('t-email')}
						name='email'
						autoComplete='email'
						onChange={(event) => setEmail(event.target.value)}
						value={email}
						error={
							email !== '' &&
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
						}
						helperText={
							email !== '' &&
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
								? t('t-invalid-email')
								: ''
						}
					/>
					<TextField
						margin='normal'
						fullWidth
						name='phone'
						label={t('t-phone')}
						type='text'
						id='phone'
						autoComplete='phone-number'
						onChange={(event) => setPhone(event.target.value)}
						value={phone}
					/>
					<NativeSelect
						onChange={(event) => setCountry(event.target.value)}
						placeholder={t('t-country')}
					>
						<option disabled>{t('t-country')}</option>
						{countries.map((item: Country) => (
							<option key={item.iso2} value={item.name}>
								{item.name}
							</option>
						))}
					</NativeSelect>
					<NativeSelect
						onChange={(event) => setRegion(event.target.value)}
						placeholder={t('t-region')}
					>
						<option disabled>{t('t-region')}</option>
						{regions.map((item: string) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</NativeSelect>
					<TextField
						margin='normal'
						required
						fullWidth
						name='password'
						label={t('t-password')}
						type='password'
						id='password'
						autoComplete='new-password'
						onChange={(event) => setPassword(event.target.value)}
						value={password}
					/>
					<TextField
						margin='normal'
						required
						fullWidth
						name='confirmPassword'
						label={t('t-confirm-password')}
						type='password'
						id='confirmPassword'
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						error={password !== confirmPassword}
						helperText={
							password !== confirmPassword ? t('t-password-not-match') : null
						}
					/>
					<Button
						type='submit'
						fullWidth
						variant='outlined'
						sx={{ mt: 3, mb: 2 }}
						disabled={
							password !== confirmPassword ||
							firstname === '' ||
							lastname === '' ||
							email === '' ||
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email) ||
							password === '' ||
							confirmPassword === ''
						}
					>
						{t('t-signup')}
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
