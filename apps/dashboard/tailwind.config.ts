import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
      fontFamily: {
        heading: ['var(--font-heading)', 'serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			navy: {
  				DEFAULT: '#001a40',
  				50: '#f0f4f8',
  			},
        primary: {
          DEFAULT: '#d4af37', // Synced Gold
          foreground: '#001a40',
        },
  			action: {
  				DEFAULT: '#d4af37',
  				hover: '#c5a028',
  			},
  			gold: {
  				DEFAULT: '#d4af37',
  			},
  			beige: {
  				DEFAULT: '#f4f3ea',
  			},
  			divider: 'rgba(0, 26, 64, 0.08)',
  			border: 'rgba(0, 26, 64, 0.08)',
  			subtle: '#66768c',
  			placeholder: '#99a3b2',
  		},
  		borderRadius: {
  			card: '12px',
  			button: '8px',
  			input: '8px',
  			pill: '9999px',
  		},
  		boxShadow: {
  			card: '0 4px 24px rgba(0, 26, 64, 0.08)',
  			glass: '0 2px 12px rgba(0, 26, 64, 0.14)',
  		},
  		fontSize: {
  			nav: ['14px', '20px'],
  			body: ['15px', '24px'],
  			caption: ['12px', '16px'],
  			h1: ['32px', '40px'],
  			h2: ['24px', '32px'],
  			h3: ['20px', '28px'],
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
