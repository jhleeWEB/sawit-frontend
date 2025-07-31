// tailwind.config.js
import { heroui } from '@heroui/react';
import { gridAreas } from 'tailwindcss-grid-areas';

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		// ...
		// make sure it's pointing to the ROOT node_module
		'./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			keyframes: {
				'slide': {
					'0%': { transform: 'translate(0%)' },
					'100%': { transform: 'translate(-100%)' },
				},
			},
			animation: {
				slide: 'slide 20s linear infinite',
			},
		},
	},
	darkMode: 'class',
	plugins: [heroui(), gridAreas({})],
};

export default config;
