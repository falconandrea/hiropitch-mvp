import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ['var(--font-outfit)'],
      },
      maxWidth: {
        '8xl': '160rem',
      },
      lineHeight: { '12': '3.4rem', '16': '4.2rem' },
    },
  },
  plugins: [],
};
export default config;
