'use client';
import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
	id: string;
	email?: string;
	// 필요한 최소 필드만
} | null;

const UserContext = createContext<{ user: User; setUser: (u: User) => void }>({
	user: null,
	setUser: () => {},
});

export function UserProvider({
	initialUser,
	children,
}: {
	initialUser: User;
	children: ReactNode;
}) {
	const [user, setUser] = useState<User>(initialUser);
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUser() {
	return useContext(UserContext);
}
