import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

interface SnackbarContextProps {
	SnackbarProps: (message: string, isSuccess: boolean) => void;
}

export const SnackbarContext = React.createContext<
	SnackbarContextProps | undefined
>(undefined);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [snackbarState, setSnackbarState] = React.useState<{
		message: string;
		isSuccess: boolean;
	} | null>(null);

	const SnackbarProps = (message: string, isSuccess: boolean) => {
		setSnackbarState({ message, isSuccess });
	};

	const handleClose = () => {
		setSnackbarState(null);
	};

	return (
		<SnackbarContext.Provider value={{ SnackbarProps }}>
			{children}
			{snackbarState && (
				<Snackbar open={true} autoHideDuration={6000} onClose={handleClose}>
					<Alert
						severity={snackbarState.isSuccess ? 'success' : 'error'}
						sx={{ width: '100%' }}
					>
						{snackbarState.message}
					</Alert>
				</Snackbar>
			)}
		</SnackbarContext.Provider>
	);
};
