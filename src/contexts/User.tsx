import * as React from 'react';
import { GET } from '../utils/api';

export type UserContextProps = {
	id: number;
	fisrtName: string;
	lastName: string;
	email: string;
	phone: string | null | undefined;
	password: string;
	country: string;
	region: string;
	bio: string | null | undefined;
	admin: boolean | null;
};

export const UserContext = React.createContext<UserContextProps | object>({});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<UserContextProps | object>({});
	const token = localStorage.getItem('USER');

	React.useEffect(() => {
		const handleGetUser = async () => {
			if (token) {
				try {
					const response: UserContextProps = await GET('/auth/login', {
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
