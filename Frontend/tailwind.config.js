/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{js,jsx}',
		'./components/**/*.{js,jsx}',
		'./app/**/*.{js,jsx}',
		'./src/**/*.{js,jsx}',
		'./index.html',
	],
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
		extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica Neue', 'sans-serif'], // More retro sans-serif
        serif: ['Lora', 'Georgia', 'serif'], // Classic serif
      },
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))',
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
				},
        gold: {
          DEFAULT: 'hsl(var(--secondary))', // Using secondary as gold
          dark: 'hsl(var(--secondary) / 0.8)', // Darker shade of secondary
        },
        greekBlue: '#3E5F8A', // Kept if needed elsewhere
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 1px)', // Adjusted for new radius
				sm: 'calc(var(--radius) - 2px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
        'pulse-subtle': {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.7, transform: 'scale(1.05)' },
        }
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
        'pulse-subtle': 'pulse-subtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
			},
      boxShadow: {
        'retro-green': '4px 4px 0px 0px hsl(var(--primary) / 0.7)', // Adjusted shadow
        'retro-gold': '4px 4px 0px 0px hsl(var(--secondary) / 0.7)', // Adjusted shadow
        'retro-hard': '6px 6px 0px hsl(var(--foreground) / 0.15)',
      },
      backgroundImage: {
        'greek-pattern': "url(\"data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ctitle%3Egreek-key%3C/title%3E%3Cg fill='%234A8C4A' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='M20 4h2v16h-2zM4 4h2v16H4zm0 0h16v2H4zm0 14h16v2H4zM8 8h2v8H8zm8 0h2v8h-2zM8 8h8v2H8zm0 6h8v2H8z'/%3E%3C/g%3E%3C/svg%3E\")",
      }
		},
	},
	plugins: [require('tailwindcss-animate')],
};