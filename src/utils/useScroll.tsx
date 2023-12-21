import * as React from 'react';
import { ScrollContext } from '../contexts/Scroll';

export default function useScrollContext() {
	const context = React.useContext(ScrollContext);
	if (!context) {
		throw new Error('useScrollContext must be used within a ScrollProvider');
	}
	return context;
}
