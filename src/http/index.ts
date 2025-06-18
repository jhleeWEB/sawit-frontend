import axios from 'axios';

const backendApiUrl = process.env.NEXT_PUBLIC_API_URL;

const http = axios.create({
	baseURL: backendApiUrl,
});

export default http;
