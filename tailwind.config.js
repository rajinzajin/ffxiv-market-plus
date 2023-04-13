const colors = require("tailwindcss/colors");
/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {
			colors: {
				"primary": "rgb(32 36 66)"
			},
		},
		// colors: {
		//   // primary: "rgb(32 36 66)",
		//   // primary: "rgb(var(--primary-color) / var(--tw-bg-opacity))",
		// }
	},
	plugins: [],
};
