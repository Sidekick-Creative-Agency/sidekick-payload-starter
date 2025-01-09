/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        '2xl': '5rem',
        xl: '2.5rem',
        lg: '2.5rem',
        md: '2.5rem',
        sm: '2.5rem',
      },
      screens: {
        '2xl': '92rem',
        xl: '80rem',
        lg: '64rem',
        md: '48rem',
        sm: '40rem',
      },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        // lg: 'var(--radius)',
        // md: 'calc(var(--radius) - 2px)',
        // sm: 'calc(var(--radius) - 4px)',
        mediaSm: 'var(--radius)',
        mediaMd: 'calc(var(--radius) + 4px)',
        mediaLg: 'calc(var(--radius) + 12px)',
        mediaXl: 'calc(var(--radius) + 20px)',
        media2Xl: 'calc(var(--radius) + 36px)',
      },
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        background: 'hsl(var(--background))',
        border: 'hsl(var(--border))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        foreground: 'hsl(var(--foreground))',
        input: 'hsl(var(--input))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        ring: 'hsl(var(--ring))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        brand: {
          navy: 'var(--brand-navy)',
          offWhite: 'var(--brand-off-white)',
          tan: 'var(--brand-tan)',
          blue: 'var(--brand-blue)',
          brown: 'var(--brand-brown)',
          green: 'var(--brand-green)',
          'gray-01': 'var(--brand-gray-00)',
          'gray-01': 'var(--brand-gray-01)',
          'gray-02': 'var(--brand-gray-02)',
          'gray-03': 'var(--brand-gray-03)',
          'gray-04': 'var(--brand-gray-04)',
          'gray-06': 'var(--brand-gray-06)',
        },
        success: 'hsl(var(--success))',
        error: 'hsl(var(--error))',
        warning: 'hsl(var(--warning))',
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)'],
        sans: ['var(--font-geist-sans)'],
        'basic-sans': ['basic-sans', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            h1: {
              fontSize: '4rem',
              fontWeight: '700',
              marginBottom: 0,
              marginTop: 0,
            },
            h2: {
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: 0,
              marginTop: 0,
            },
            h3: {
              fontSize: '2rem',
              fontWeight: '700',
              lineHeight: 1.25,
              marginBottom: 0,
              marginTop: 0,
            },
            h4: {
              fontWeight: '700',
              lineHeight: 1.25,
              marginBottom: 0,
              marginTop: 0,
            },
            p: {
              fontWeight: '300',
              lineHeight: 1.8,
            },
          },
        },
      }),
    },
  },
}
