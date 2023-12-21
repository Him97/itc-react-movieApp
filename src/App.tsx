import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { grey } from '@mui/material/colors';
import './assets/fonts/HYWenHei-55S.ttf';
import './assets/fonts/Tangut.ttf';
import Navbar from './components/Navbar';
import Router from './utils/Router';
import Search from './components/Search';
import Footer from './components/Footer';
import { UserProvider } from './contexts/User';
import { ColorModeContext } from './contexts/ColorMode';
import { LocaleProvider } from './contexts/Locale';
import { useLocale } from './utils/useLocale';
import { SnackbarProvider } from './contexts/Snackbar';
import { ScrollProvider } from './contexts/Scroll';

export default function App() {
	type ModeType = 'light' | 'dark';
	const [mode, setMode] = React.useState<ModeType>('light');
	const { language } = useLocale();
	const [open, setOpen] = React.useState<boolean>(false);

	console.log(localStorage.getItem('language'));
	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	const theme = React.useMemo(
		() =>
			createTheme({
				typography: {
					h2: {
						fontFamily: [
							'Markazi Text',
							'serif',
							'HYWenhei',
							'Tangut',
							'IBM Plex Sans Hebrew',
						].join(','),
					},
					fontFamily: [
						'Karla',
						'sans-serif',
						'Markazi Text',
						'serif',
						'HYWenhei',
						'Tangut',
						'IBM Plex Sans Hebrew',
					].join(','),
				},
				palette: {
					primary: {
						light: grey[50],
						dark: grey[900],
						main: grey[500],
					},
					mode,
				},
				direction: language === 'he' ? 'rtl' : 'ltr',
			}),
		[mode, language]
	);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<LocaleProvider>
					<UserProvider>
						<SnackbarProvider>
							<ScrollProvider>
								<Box
									component='center'
									position='relative'
									display='flex'
									flexDirection='column'
									minHeight='100vh'
									sx={{ filter: open ? 'blur(5px)' : 'none' }}
								>
									<CssBaseline />
									<Navbar colorMode={colorMode} handleOpen={handleOpen} />
									<Router />
									<Search open={open} handleClose={handleClose} />
									<Footer />
								</Box>
							</ScrollProvider>
						</SnackbarProvider>
					</UserProvider>
				</LocaleProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
