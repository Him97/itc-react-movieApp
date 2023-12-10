import * as React from 'react';
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';

export type LanguageType = 'en' | 'he' | 'zh_hans' | 'zh_hant';

interface LocaleContextProps {
	language: LanguageType;
	setLanguage: (language: LanguageType) => void;
}

const LocaleContext = React.createContext<LocaleContextProps | undefined>(
	undefined
);

const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
});

const cacheLtr = createCache({
	key: 'muiltr',
	stylisPlugins: [prefixer],
});

export const LocaleProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const storedLanguage = localStorage.getItem(
		'language'
	) as LanguageType | null;
	const [language, setLanguageState] = React.useState<LanguageType>(
		storedLanguage || ('en' as LanguageType)
	);

	const setLanguage = (newLanguage: LanguageType) => {
		setLanguageState(newLanguage);
		localStorage.setItem('language', newLanguage);
	};

	React.useEffect(() => {
		setLanguageState((prevLanguage) => {
			localStorage.setItem('language', prevLanguage);
			return prevLanguage;
		});
		document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
	}, [language]);

	return (
		<CacheProvider value={language === 'he' ? cacheRtl : cacheLtr}>
			<LocaleContext.Provider value={{ language, setLanguage }}>
				{children}
			</LocaleContext.Provider>
		</CacheProvider>
	);
};

export const useLocale = () => {
	const context = React.useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocale must be used within a LocaleProvider');
	}
	return context;
};
