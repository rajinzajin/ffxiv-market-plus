const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				primary: "rgb(32 36 66)",
				secondary: "rgb(37 41 74)",
				item: "rgb(45 50 90)",
			},
			fontFamily: {
				display: "Catamaran, sans-serif",
				body: "Poppins, sans-serif"
			},
		},
		// colors: {
		//   // primary: "rgb(32 36 66)",
		//   // primary: "rgb(var(--primary-color) / var(--tw-bg-opacity))",
		// }
	},
};
