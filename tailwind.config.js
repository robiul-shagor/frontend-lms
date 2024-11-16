/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-banner": "url('/assets/images/banner-bg.svg')"
      },
      fontFamily: {
        // abhaya: ['"Abhaya Libre"', "serif"],
        poppins: ['"Poppins"', "sans-serif"],
        // lato: ['"Lato"', "sans-serif"],
        urbanist: ['"Urbanist"', "sans-serif"],
        // josefin: ['"Josefin Sans"', "sans-serif"],
      },
      colors: {
        "custom-start": "#C8B3FF",
        "custom-end": "#94ABFF",
        "gradient2-start": "#DCDBFF",
        "gradient2-end": "#F4FFF2",
        "gradient3-start": "#96DFFF",
        "gradient3-end": "#6485FC",
      },
    },
  },
  plugins: [],
};
