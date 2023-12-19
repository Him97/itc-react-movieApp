import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { LocaleProvider } from './contexts/Locale.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter basename='/zelaze'>
			<LocaleProvider>
				<App />
			</LocaleProvider>
		</BrowserRouter>
	</React.StrictMode>
);
