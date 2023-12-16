import * as React from 'react';
import { LocaleContext } from '../contexts/Locale';

export const useLocale = () => {
	const context = React.useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocale must be used within a LocaleProvider');
	}
	return context;
};
