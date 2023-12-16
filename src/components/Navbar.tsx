import * as React from 'react';
import {
	AppBar,
	Box,
	Button,
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
import SearchIcon from '@mui/icons-material/Search';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { useLocale } from '../utils/useLocale';
import { LanguageType } from '../contexts/Locale';
import i18n from '../utils/i18n';

interface toggleColorMode {
	toggleColorMode: () => void;
}
interface NavbarProps {
	colorMode: toggleColorMode;
	handleOpen: () => void;
}

export default function Navbar({ colorMode, handleOpen }: NavbarProps) {
	const { setLanguage } = useLocale();
	const { t } = useTranslation();
	const theme = useTheme();

	const pages = ['Home', 'Services', 'About'];

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);

	const chooseLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
		event.preventDefault();
		const selectedLanguage = event.target.value as LanguageType;
		i18n.changeLanguage(event.target.value);
		setLanguage(selectedLanguage);
	};

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	return (
		<AppBar
			position='absolute'
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

					<Box display={{ xs: 'flex', md: 'none' }} flexGrow={1}>
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
						color={theme.palette.mode === 'dark' ? 'primary' : 'primary'}
					/>
					<Typography
						variant='h5'
						noWrap
						component='a'
						href='/'
						color={
							theme.palette.mode === 'dark' ? 'primary.light' : 'primary.dark'
						}
						mr={2}
						display={{ xs: 'flex', md: 'none' }}
						flexGrow={1}
						fontFamily='monospace'
						fontWeight={700}
						letterSpacing='.3rem'
						sx={{ textDecoration: 'none' }}
					>
						{t('t-zelaze')}
					</Typography>
					<Box flexGrow={1} display={{ xs: 'none', md: 'flex' }}>
						{pages.map((page) => (
							<Link
								key={page}
								variant='button'
								onClick={handleCloseNavMenu}
								m={2}
								display='block'
								sx={{ textDecoration: 'none' }}
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

					<Box sx={{ flexGrow: 0 }} display={{ xs: 'none', md: 'flex' }}>
						<Button
							variant='outlined'
							color='inherit'
							startIcon={<SearchIcon />}
							style={{ border: 'none' }}
							size='large'
							onClick={handleOpen}
						>
							Search
						</Button>
						<NativeSelect
							IconComponent={TranslateIcon}
							id='language'
							name='language'
							title='language'
							aria-label='language'
							onChange={chooseLanguage}
							color='primary'
						>
							<option disabled>{t('t-select-lang')}</option>
							<option value={'en'}>English</option>
							<option value={'fr'}>Français</option>
							<option value={'sw'}>Kiswahili</option>
							<option value={'zh_hans'}>简体中文</option>
							<option value={'zh_hant'}>正體中文</option>
							<option value={'he'}>עברית</option>
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
