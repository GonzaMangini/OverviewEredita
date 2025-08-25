/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        eredita: {
          // Nuevos colores basados en criterios de la imagen
          neutral: '#FFE5F0',     // Fondo principal - crema cálido
          'text-main': '#333333',  // Texto principal - gris casi negro
          'title-pink': '#D64E8C', // Titular (frase rosa) - fucsia suave
          'text-light': '#B71C5F', // Texto en rosa claro - bordó fucsia
          'text-green': '#3E8E7E', // Texto en verde pastel - verde hoja
          'button-coral': '#F76C6C', // Botones destacados - coral
          'button-teal': '#4D7C8A',  // Botones destacados - verde azulado
          
          // Mantener algunos colores originales como alternativas
          pink: '#D64E8C',         // Fucsia suave
          green: '#3E8E7E',        // Verde hoja
          orange: '#f3c7a6',       // Naranja pastel (mantenido)
        },
        // Alias actualizados para facilidad de uso
        'pink-pastel': '#D64E8C',
        'green-pastel': '#3E8E7E',
        'orange-pastel': '#f3c7a6',
        'neutral-pastel': '#FFE5F0',
        'text-dark': '#333333',
        'coral': '#F76C6C',
        'teal': '#4D7C8A',
      },
      fontFamily: {
        brand: ['"Dancing Script"', 'cursive'], // Sugerencia para el estilo de logo
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
