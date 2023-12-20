import * as React from 'react';
import axios from 'axios';
import { POST } from '../utils/api';
import {
	Avatar,
	Box,
	Button,
	ButtonBase,
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
import HandshakeIcon from '@mui/icons-material/Handshake';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import pic from '../assets/images/goods2.jpg';
import useSnackbar from '../utils/useSnackbar';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserObj, CountryObj } from './types';

export default function Signup() {
	const { t } = useTranslation();
	const { SnackbarProps } = useSnackbar();
	const navigate = useNavigate();
	const theme = useTheme();
	const [formData, setFormData] = React.useState<UserObj>({
		firstname: '',
		lastname: '',
		bio:'',
		email: '',
		phone: '',
		password: '',
		country: '',
		region: '',
	});
	const [confirmPassword, setConfirmPassword] = React.useState<string>('');
	const [showPassword, setShowPassword] = React.useState<boolean>(false);
	const [countries, setCountries] = React.useState<CountryObj[]>([]);
	const [regions, setRegions] = React.useState<Array<string>>([]);
	const [bio, setBio] = React.useState<Array<string>>([]);

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
			if (formData.country !== '') {
				try {
					const response = await axios.post(
						`https://countriesnow.space/api/v0.1/countries/cities`,
						{ country: formData.country }
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
	}, [formData.country]);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const handleChange = (
		event: React.ChangeEvent<{ name?: string; value: unknown }>
	) => {
		setFormData({
			...formData,
			[event.target.name as string]: event.target.value as string,
		});
	};

	const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const body = {
			firstname: formData.firstname,
			lastname: formData.lastname,
			email: formData.email,
			phone: formData.phone,
			password: formData.password,
			country: formData.country,
			region: formData.region,
			bio: formData.bio,
			admin: false,
		};
		const data = await POST('/auth/register', body);
		if (data) {
			SnackbarProps(t('t-signup-success'), true);
			setTimeout(async () => {
				navigate('/login');
			}, 1000);
		} else {
			SnackbarProps(t('t-signup-failed'), false);
		}
	};

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
					<IconButton size='large' onClick={() => navigate('/login')}>
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
					<ButtonBase
						style={{
							fontSize: 20,
							color: 'white',
							fontFamily: 'Karla',
						}}
						onClick={() => navigate('/login')}
					>
						{t('t-to-login')}
					</ButtonBase>
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
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='firstname'>{t('t-firstname')}</InputLabel>
						<OutlinedInput
							required
							id='firstname'
							name='firstname'
							type='firstname'
							label={t('t-firstname')}
							value={formData.firstname}
							onChange={handleChange}
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
							value={formData.lastname}
							onChange={handleChange}
						/>
					</FormControl>

					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel htmlFor='bio'>{t('t-bio')}</InputLabel>
						<OutlinedInput
							required
							id='bio'
							name='bio'
							type='bio'
							label={t('t-bio')}
							value={formData.bio}
							onChange={handleChange}
						/>
					</FormControl>

					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel
							htmlFor='email'
							error={
								formData.email !== '' &&
								!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(
									formData.email
								)
							}
						>
							{t('t-email')}
						</InputLabel>
						<OutlinedInput
							required
							id='email'
							name='email'
							type='email'
							label={t('t-email')}
							error={
								formData.email !== '' &&
								!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(
									formData.email
								)
							}
							value={formData.email}
							onChange={handleChange}
						/>
						<FormHelperText error>
							{formData.email !== '' &&
							!/^([A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4})$/i.test(
								formData.email
							)
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
							value={formData.phone}
							onChange={handleChange}
						/>
					</FormControl>
					<NativeSelect fullWidth onChange={handleChange} defaultValue=''>
						<option disabled value=''>
							{t('t-country')}
						</option>
						{countries.map((item: CountryObj) => (
							<option key={item.iso2} value={item.name}>
								{item.name}
							</option>
						))}
					</NativeSelect>
					<NativeSelect fullWidth onChange={handleChange} defaultValue=''>
						<option disabled value=''>
							{t('t-region')}
						</option>
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
							value={formData.password}
							onChange={handleChange}
						/>
					</FormControl>
					<FormControl fullWidth variant='outlined' margin='dense'>
						<InputLabel
							htmlFor='confirm-password'
							error={
								confirmPassword != '' && formData.password !== confirmPassword
							}
						>
							{t('t-confirm-password')}
						</InputLabel>
						<OutlinedInput
							required
							id='confirm-password'
							name='confirm-password'
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
							label={t('t-confirm-password')}
							value={confirmPassword}
							error={
								confirmPassword != '' && formData.password !== confirmPassword
							}
							onChange={(event) => setConfirmPassword(event.target.value)}
						/>
						<FormHelperText error>
							{confirmPassword != '' && formData.password !== confirmPassword
								? t('t-password-mismatch')
								: null}
						</FormHelperText>
					</FormControl>
					<Button
						type='submit'
						fullWidth
						variant='outlined'
						sx={{ mt: 3, mb: 2 }}
						disabled={
							formData.password !== confirmPassword ||
							formData.firstname === '' ||
							formData.lastname === '' ||
							formData.email === '' ||
							!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
								formData.email
							) ||
							formData.password === '' ||
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
