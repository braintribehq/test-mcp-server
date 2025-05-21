/** @type {import('prettier').Config} */
const config = {
	embeddedLanguageFormatting: 'off',
	plugins: ['prettier-plugin-organize-imports'],
	printWidth: 150,
	semi: false,
	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
}

export default config
