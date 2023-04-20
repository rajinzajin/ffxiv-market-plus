const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: "var(--color-primary)",
				secondary: "var(--color-secondary)",
				item: "rgb(45 50 90)",
				money: "hsl(74.66666666666667, 100%, 60%)",
				money2: "rgb(210 143 214)",
				summary: "rgb(255 177 63)",
			},
			fontFamily: {
				display: "Catamaran, sans-serif",
				body: "Poppins, sans-serif",
				market: "Chelsea Market, cursive"
			},
		},
		// colors: {
		//   // primary: "rgb(32 36 66)",
		//   // primary: "rgb(var(--primary-color) / var(--tw-bg-opacity))",
		// }
	},
};
