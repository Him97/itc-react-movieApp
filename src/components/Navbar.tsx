import * as React from 'react';
import {
	AppBar,
	Box,
	Container,
	IconButton,
	Link,
	Menu,
	MenuItem,
	NativeSelect,
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import i18n from '../utils/i18n';

const pages = ['Home', 'Services', 'About'];

export default function Navbar({ colorMode }) {
	const { t } = useTranslation();
	const theme = useTheme();

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [language, setLanguage] = React.useState<string>('en');

	const chooseLanguage = (e) => {
		e.preventDefault();
		i18n.changeLanguage(e.target.value);
		setLanguage(e.target.value);
	};

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar
			position='fixed'
			style={{
				backgroundColor:
					theme.palette.mode === 'dark'
						? 'rgba(0, 0, 0, 0.7)'
						: 'rgba(255, 255, 255, 0.7)',
			}}
		>
			<Container maxWidth='lg'>
				<Toolbar disableGutters>
					<HandshakeIcon
						sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
						color={theme.palette.mode === 'dark' ? 'inherit' : 'action'}
					/>
					<Typography
						variant='h6'
						noWrap
						component='a'
						href='/'
						color={
							theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark'
						}
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							textDecoration: 'none',
						}}
					>
						{t('zeleze')}
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									<Typography
										textAlign='center'
										color={
											theme.palette.mode === 'dark'
												? 'primary.light'
												: 'primary.dark'
										}
									>
										{page}
									</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
					<HandshakeIcon
						sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
						color={
							theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark'
						}
					/>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='/'
						color={
							theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark'
						}
						sx={{
							mr: 2,
							display: { xs: 'flex', md: 'none' },
							flexGrow: 1,
							fontFamily: 'monospace',
							fontWeight: 700,
							letterSpacing: '.3rem',
							textDecoration: 'none',
						}}
					>
						{t('zeleze')}
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Link
								key={page}
								variant='button'
								onClick={handleCloseNavMenu}
								sx={{ m: 2, display: 'block', textDecoration: 'none' }}
								color={
									theme.palette.mode === 'dark'
										? 'primary.light'
										: 'primary.dark'
								}
							>
								{page}
							</Link>
						))}
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<NativeSelect
							defaultValue='Select Language'
							inputProps={{
								name: 'adoption_status',
								id: 'adoption_status',
							}}
							onChange={chooseLanguage}
							color='success'
						>
							<option disabled style={{ textAlign: 'center' }}>
								{t('t-select-lang')}
							</option>
							<option value={'en'} style={{ textAlign: 'center' }}>
								English
							</option>
							<option value={'zh_hans'} style={{ textAlign: 'center' }}>
								简体中文
							</option>
							<option value={'zh_hant'} style={{ textAlign: 'center' }}>
								正體中文
							</option>
							<option value={'he'} style={{ textAlign: 'center' }}>
								עברית
							</option>
						</NativeSelect>
						<Tooltip
							title={theme.palette.mode === 'dark' ? 'Light Mode' : 'Dark Mode'}
						>
							<IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
								{theme.palette.mode === 'dark' ? (
									<Brightness7Icon />
								) : (
									<Brightness4Icon />
								)}
							</IconButton>
						</Tooltip>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
