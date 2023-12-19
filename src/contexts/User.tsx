import * as React from 'react';
import { GET } from '../utils/api';
import { UserObj } from '../components/types';

export const UserContext = React.createContext<UserObj | object>({});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<UserObj | object>({});
	const token = localStorage.getItem('USER');

	React.useEffect(() => {
		const handleGetUser = async () => {
			if (token) {
				try {
					const response: UserObj = await GET('/auth/login', {
						headers: { Authorization: token },
					});
					setUser(response);
				} catch (error) {
					console.error('Error fetching user:', error);
				}
			}
		};

		handleGetUser();
	}, [token]);

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
