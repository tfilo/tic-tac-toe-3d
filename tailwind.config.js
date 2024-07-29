/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-9deg)' },
                    '50%': { transform: 'rotate(9deg)' }
                }
            },
            animation: {
                wiggle: 'wiggle 0.2s ease-in-out 3'
            }
        }
    },
    plugins: []
};
