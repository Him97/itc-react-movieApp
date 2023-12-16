import * as React from 'react';
import axios from 'axios';

interface UserContextProps {
	id: number;
	fisrtName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	bio: string;
	admin: boolean;
}

const UserContext = React.createContext<UserContextProps | undefined>(
	undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const token = localStorage.getItem('token');
	React.useEffect(() => {
		const handleGetUser = async () => {
			if (token) {
				const response = await axios.get('/login', {
					headers: { Authorization: token },
				});
				console.log(response.data);
			}
		};

		handleGetUser();
	}, [token]);

	return (
		<UserContext.Provider
			value={{
				id: 0,
				fisrtName: '',
				lastName: '',
				email: '',
				phone: '',
				password: '',
				bio: '',
				admin: false,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
