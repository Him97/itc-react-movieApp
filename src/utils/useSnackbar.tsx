import * as React from 'react';
import { SnackbarContext } from '../contexts/Snackbar';

export default function useSnackbar() {
	const context = React.useContext(SnackbarContext);
	if (!context) {
		throw new Error('useSnackbar must be used within a SnackbarProvider');
	}
	return context;
}
