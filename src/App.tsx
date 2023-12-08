import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Navbar from './components/Navbar';
import Router from './utils/Router';
const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function App() {
	const [mode, setMode] = React.useState<'light' | 'dark'>('light');
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
					fontFamily: ['Karla', 'sans-serif', 'Markazi Text', 'serif'].join(
						','
					),
				},
				palette: {
					primary: {
						light: grey[50],
						dark: grey[900],
						main: grey[500],
					},
					mode,
				},
			}),
		[mode]
	);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<Navbar colorMode={colorMode} />
				<Router theme={theme} />
			</ThemeProvider>
		</ColorModeContext.Provider>
	);
}
