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
	Toolbar,
	Tooltip,
	Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material/styles';

const pages = ['Home', 'Pricing', 'About Us'];

export default function Navbar({ colorMode }) {
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const theme = useTheme();

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
						Zeleze
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
						Zeleze
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
