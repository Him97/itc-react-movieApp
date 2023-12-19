import * as React from 'react';
import axios from 'axios';
import {
	Avatar,
	Box,
	Button,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputAdornment,
	InputLabel,
	NativeSelect,
	OutlinedInput,
	Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Entry from './Entry';
import pic from '../assets/images/goods2.jpg';
import { CountryObj } from './types';

export default function Profile() {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const theme = useTheme();
	const [firstname, setFirstname] = React.useState<string>('');
	const [lastname, setLastname] = React.useState<string>('');
	const [email, setEmail] = React.useState<string>('');
	const [phone, setPhone] = React.useState<string>('');
	const [password, setPassword] = React.useState<string>('');
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [bio, setBio] = React.useState<string>('');
	const [countries, setCountries] = React.useState<CountryObj[]>([]);
	const [country, setCountry] = React.useState<string>('');
	const [regions, setRegions] = React.useState<Array<string>>([]);
	const [region, setRegion] = React.useState<string>('');
	const [createEntry, setCreateEntry] = React.useState<boolean>(false);

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
			if (country !== '') {
				try {
					const response = await axios.post(
						`https://countriesnow.space/api/v0.1/countries/cities`,
						{ country: country }
					);
					const data = await response.data;
					console.log(data);
					if (data.error === false) {
						setRegions(data.data);
					}
				} catch (error) {
					console.log(error);
				}
			}
		};
		getRegions();
	}, [country]);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

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
		const data = await axios.put('http://localhost:2555/register', body);
		if (data) {
			setTimeout(async () => {
				navigate('/login');
			}, 1000);
		} else {
			console.log('error');
		}
	};

	const handleCreateEntry = () => setCreateEntry(true);
	const handleCloseEntry = () => setCreateEntry(false);

	return (
		<Grid
			container
			justifyContent='center'
			borderRadius={1}
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
					{t('t-profile')}
				</Typography>
				<Box component='form' noValidate onSubmit={handleSignup}>
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='firstname'>{t('t-firstname')}</InputLabel>
						<OutlinedInput
							required
							id='firstname'
							name='firstname'
							type='firstname'
							label={t('t-firstname')}
							value={firstname}
							onChange={(event) => setFirstname(event.target.value)}
						/>
					</FormControl>
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='lastname'>{t('t-lastname')}</InputLabel>
						<OutlinedInput
							required
							id='lastname'
							name='lastname'
							type='lastname'
							label={t('t-lastname')}
							value={lastname}
							onChange={(event) => setLastname(event.target.value)}
						/>
					</FormControl>
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='email'>{t('t-email')}</InputLabel>
						<OutlinedInput
							required
							id='email'
							name='email'
							type='email'
							label={t('t-email')}
							error={
								email !== '' &&
								!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
							}
							value={email}
							onChange={(event) => setEmail(event.target.value)}
						/>
						<FormHelperText>
							{email !== '' &&
							!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(email)
								? t('t-invalid-email')
								: ''}
						</FormHelperText>
					</FormControl>
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='phone'>{t('t-phone')}</InputLabel>
						<OutlinedInput
							required
							id='phone'
							name='phone'
							type='phone'
							label={t('t-phone')}
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
						/>
					</FormControl>
					<NativeSelect
						fullWidth
						onChange={(event) => setCountry(event.target.value)}
						placeholder={t('t-country')}
					>
						<option disabled>{t('t-country')}</option>
						{countries.map((item: CountryObj) => (
							<option key={item.iso2} value={item.name}>
								{item.name}
							</option>
						))}
					</NativeSelect>
					<NativeSelect
						fullWidth
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
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='password'>{t('t-password')}</InputLabel>
						<OutlinedInput
							required
							id='password'
							name='password'
							type={showPassword ? 'text' : 'password'}
							endAdornment={
								<InputAdornment position='end'>
									<IconButton
										aria-label='toggle password visibility'
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge='end'
									>
										{showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
							label={t('t-password')}
							value={password}
							onChange={(event) => setPassword(event.target.value)}
						/>
					</FormControl>
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='bio'>{t('t-bio')}</InputLabel>
						<OutlinedInput
							required
							id='bio'
							name='bio'
							type='text'
							label={t('t-bio')}
							value={bio}
							onChange={(event) => setBio(event.target.value)}
						/>
					</FormControl>
					<Button
						type='submit'
						fullWidth
						variant='outlined'
						sx={{ mt: 3, mb: 2 }}
						disabled={!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)}
					>
						{t('t-signup')}
					</Button>
					<Entry open={createEntry} handleClose={handleCloseEntry} />
				</Box>
			</Grid>
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
					<Button
						variant='outlined'
						size='large'
						color='inherit'
						onClick={() => handleCreateEntry()}
					>
						{t('t-create-entry')}
					</Button>
				</Box>
			</Grid>
		</Grid>
	);
}
