import * as React from 'react';
import { GET } from '../utils/api';

type UserObj = {
	id: number;
	fisrtName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	bio: string | null;
	admin: boolean | null;
};
interface UserContextProps {
	user: UserObj | object;
}

export const UserContext = React.createContext<UserContextProps | undefined>(
	undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<UserContextProps | object>({});
	const token = localStorage.getItem('USER');
	console.log(token);
	React.useEffect(() => {
		const handleGetUser = async () => {
			if (token) {
				const response: UserContextProps = await GET('/auth/login', {
					headers: { Authorization: token },
				});
				setUser(response);
			}
		};
		handleGetUser();
	}, [token]);

	return (
		<UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
	);
};
