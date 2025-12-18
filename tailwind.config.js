/** @type {import('tailwindcss').Config} */
export default {
    // Force reload
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Paleta inspirada en Cusco y los Andes
                'inca-gold': '#D4AF37',
                'sacred-purple': '#6B46C1',
                'mountain-blue': '#1E3A8A',
                'earth-brown': '#8B4513',
                'mystic-teal': '#0D9488',
                'sunset-orange': '#F97316',
                // New Andino Theme
                'andino-green': '#1a472a',
                'andino-light-green': '#2d5a3f',
                'andino-gold': '#fbbf24', // amber-400
                'andino-cream': '#fef3c7', // amber-100
            },
            fontFamily: {
                'sans': ['Inter', 'system-ui', 'sans-serif'],
                'display': ['Outfit', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
