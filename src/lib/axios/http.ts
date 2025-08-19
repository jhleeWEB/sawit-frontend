import axios from 'axios';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/auth-options';

const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;

const http = axios.create({
	baseURL: backendApiUrl,
});

axios.interceptors.request.use(async (config) => {
	const session = await getServerSession(authOptions);
	console.log('interceptor', session);
	if (session) {
		config.headers.Authorization = `Bearer ${session.accessToken}`;
	}
	return config;
});

export default http;
