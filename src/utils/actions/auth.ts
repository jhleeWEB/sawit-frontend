'use client';

import { signIn, signOut } from 'next-auth/react';

export const login = async (authType: string) => {
	await signIn(authType, { callbackUrl: '/home' });
};
export const logout = async () => {
	await signOut({ callbackUrl: '/home' });
};
