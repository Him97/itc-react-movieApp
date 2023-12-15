import * as React from 'react';
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import './assets/fonts/HYWenHei-55S.ttf';
import './assets/fonts/Tangut.ttf';
import Navbar from './components/Navbar';
import Router from './utils/Router';
import Search from './components/Search';
import { ColorModeContext } from './contexts/ColorMode';
import { LocaleProvider } from './contexts/Locale';

declare module '@mui/material/styles' {
	interface DefaultTheme extends Theme {}
}

export default function App() {
	type ModeType = 'light' | 'dark';
	type LanguageType = 'en' | 'he' | 'fr' | 'sw' | 'zh_hans' | 'zh_hant';
	const [mode, setMode] = React.useState<ModeType>('light');
	const [language, setLanguage] = React.useState<LanguageType>('en');
	const [open, setOpen] = React.useState<boolean>(false);

	const colorMode = React.useMemo(
		() => ({
			toggleColorMode: () => {
				setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
			},
		}),
		[]
	);

	const DefaultTheme = React.useMemo(
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
			<ThemeProvider theme={DefaultTheme}>
				<LocaleProvider>
					<Navbar colorMode={colorMode} handleOpen={handleOpen} />
					<Router />
					<Search open={open} handleClose={handleClose} />
				</LocaleProvider>
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
