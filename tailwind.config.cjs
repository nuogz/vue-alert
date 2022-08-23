const plugin = require('tailwindcss/plugin');



module.exports = {
	content: ['./src/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	plugins: [
		plugin(({ addUtilities }) => {
			addUtilities({
				// inblock = inline-block + align-top
				'.inblock': {
					display: 'inline-block',
					verticalAlign: 'top'
				},
				// text ellipsis
				'.elli': {
					overflow: 'hidden',
					whiteSpace: 'nowrap',
					textOverflow: 'ellipsis'
				},
			});
		}),
	],
};
