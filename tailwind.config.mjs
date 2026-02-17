import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import starlightPlugin from '@astrojs/starlight-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				accent: '#0891B2',
                secondary: '#22D3EE',
				gray: {
					900: '#164E63', // Cyan-900 (Text)
                    50: '#ECFEFF', // Cyan-50 (Background)
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                }
            }
		},
	},
	plugins: [starlightPlugin(), require('tailwindcss-animate')],
    darkMode: ['class', '[data-theme="dark"]'],
};
