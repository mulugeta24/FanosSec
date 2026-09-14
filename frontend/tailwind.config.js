/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                cyber: {
                    dark: '#0a0a0a',
                    darker: '#050505',
                    neon: '#00FF41',
                    cyan: '#00FFFF',
                    red: '#FF003C',
                    purple: '#B026FF',
                    blue: '#1F51FF',
                    gray: '#111111',
                    text: '#E0E0E0',
                    muted: '#888888'
                }
            },
            fontFamily: {
                sans: ['Inter', 'Roboto', 'sans-serif'],
                mono: ['Fira Code', 'Courier New', 'monospace']
            },
            animation: {
                'glow': 'glow 2s ease-in-out infinite alternate',
                'float': 'float 6s ease-in-out infinite',
            },
            keyframes: {
                glow: {
                    '0%': { boxShadow: '0 0 5px #00FF41, 0 0 10px #00FF41, 0 0 15px #00FF41' },
                    '100%': { boxShadow: '0 0 10px #00FF41, 0 0 20px #00FF41, 0 0 30px #00FF41' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' }
                }
            }
        },
    },
    plugins: [],
}
