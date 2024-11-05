/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}, // Añade autoprefixer para compatibilidad de navegadores
  },
};

export default config;
