import typescriptEslint from '@typescript-eslint/eslint-plugin'
import eslintPluginImport from 'eslint-plugin-import'
import eslintPluginNoLoops from 'eslint-plugin-no-loops'
import eslintPluginNoSecrets from 'eslint-plugin-no-secrets'
import eslintPluginSecurity from 'eslint-plugin-security'
import eslintPluginSonarjs from 'eslint-plugin-sonarjs'
import globals from 'globals'
import tsParser from '@typescript-eslint/parser'
import js from '@eslint/js'

/** @type {import('eslint').Config} */
const config = [
	// global ignore patterns
	{
		ignores: [
			'**/cdk.out/',
			'**/dist/',
			'**/node_modules/',
			'**/jest.config.js',
		],
	},
	// global settings for all files
	{
		plugins: {
			'@typescript-eslint': typescriptEslint,
			'import': eslintPluginImport,
			'no-loops': eslintPluginNoLoops,
			'no-secrets': eslintPluginNoSecrets,
			'security': eslintPluginSecurity,
			'sonarjs': eslintPluginSonarjs,
		},
		languageOptions: {
			globals: {
				...globals.node
			},
			parser: tsParser,
			ecmaVersion: 'latest',
			sourceType: 'module',
		},

		rules: {
			// base configurations
			...js.configs.recommended.rules, // recommended rules
			...eslintPluginImport.configs.recommended.rules, // recommended import plugin rules
			...eslintPluginSecurity.configs.recommended.rules, // recommended security plugin rules
			...eslintPluginSonarjs.configs.recommended.rules, // recommended sonarjs plugin rules

			// general rules
			'array-callback-return': 'error',
			'arrow-body-style': 'error',
			'block-scoped-var': 'error',
			'camelcase': ['error', {
				'allow': ['Java_EMF_Metrics']
			}],
			'class-methods-use-this': 'error',
			'consistent-return': 'error',
			'consistent-this': 'error',
			'curly': 'error',
			'default-case': 'error',
			'default-case-last': 'error',
			'default-param-last': 'error',
			'eqeqeq': 'error',
			'func-name-matching': 'error',
			'func-names': 'error',
			'func-style': 'error',
			'grouped-accessor-pairs': 'error',
			'guard-for-in': 'error',
			'no-alert': 'error',
			'no-array-constructor': 'error',
			'no-await-in-loop': 'error',
			'no-bitwise': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-constant-binary-expression': 'error',
			'no-constructor-return': 'error',
			'no-delete-var': 'error',
			'no-div-regex': 'error',
			'no-duplicate-imports': 'error',
			'no-else-return': 'error',
			'no-empty': 'error',
			'no-empty-function': 'error',
			'no-empty-static-block': 'error',
			'no-eq-null': 'error',
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-boolean-cast': 'error',
			'no-extra-label': 'error',
			'no-global-assign': 'error',
			'no-implicit-coercion': 'error',
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-invalid-this': 'error',
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'error',
			'no-loop-func': 'error',
			'no-multi-assign': 'error',
			'no-new': 'off',
			'no-new-func': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-new-wrappers': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-object-constructor': 'error',
			'no-octal': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': 'error',
			'no-promise-executor-return': 'error',
			'no-proto': 'error',
			'no-redeclare': 'error',
			'no-regex-spaces': 'error',
			'no-restricted-syntax': 'error',
			'no-return-assign': 'error',
			'no-script-url': 'error',
			'no-self-compare': 'error',
			'no-sequences': 'error',
			'no-shadow': 'error',
			'no-shadow-restricted-names': 'error',
			'no-template-curly-in-string': 'error',
			'no-throw-literal': 'error',
			'no-undef-init': 'error',
			'no-undefined': 'error',
			'no-underscore-dangle': 'error',
			'no-unmodified-loop-condition': 'error',
			'no-unneeded-ternary': 'error',
			'no-unreachable-loop': 'error',
			'no-unused-expressions': 'error',
			'no-unused-labels': 'error',
			'no-unused-private-class-members': 'error',
			'no-use-before-define': 'error',
			'no-useless-call': 'error',
			'no-useless-catch': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-constructor': 'error',
			'no-useless-escape': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'error',
			'no-with': 'error',
			'one-var': ['error', 'never'],
			'prefer-arrow-callback': 'error',
			'prefer-const': 'error',
			'prefer-exponentiation-operator': 'error',
			'prefer-named-capture-group': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': 'error',
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'warn',
			'require-atomic-updates': 'error',
			'require-await': 'error',
			'require-unicode-regexp': 'error',
			'require-yield': 'error',
			'symbol-description': 'error',
			'vars-on-top': 'error',
			'yoda': 'error',

			// import rules
			'import/no-cycle': 'error',

			// no-loops rules
			'no-loops/no-loops': 'off', // for..of loops are fine (the plugin can still be useful to once in a while check for other kind of loops)

			// no-secrets rules
			'no-secrets/no-secrets': ['error', {
				'tolerance': 4.2, // slightly increase tolerance (4.0 is the default)
				'ignoreCase': true, // ignore case (since code contains a lot of camel case and all-upper case, e.g. rds.PerformanceInsightRetention.DEFAULT)
				'ignoreContent': [
					'(service-role/)?(AWS|Amazon)[a-zA-Z0-9]+' // ignore e.g. AWSCloud9SSMInstanceProfile or AmazonSSMManagedEC2InstanceDefaultPolicy or service-role/AmazonECSTaskExecutionRolePolicy
				]
			}],
			// security rules
			'security/detect-non-literal-fs-filename': 'off', // path traversal attacks (e.g. ../../secret) are not an issue, since there is no user input
			'security/detect-object-injection': 'off', // disabled for now (many warnings)
			// sonarjs rules
			'sonarjs/aws-s3-bucket-versioning': 'off', // we often don't need versioning
			'sonarjs/no-hardcoded-ip': 'off', // IPs are sometimes needed in CDK code, e.g. for allow lists
			'sonarjs/todo-tag': 'off', // (for now) we manually search for ToDos

			// @typescript-eslint rules
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					'args': 'all',
					'argsIgnorePattern': '^_',
					'caughtErrors': 'all',
					'caughtErrorsIgnorePattern': '^_',
					'destructuredArrayIgnorePattern': '^_',
					'varsIgnorePattern': '^_',
					'ignoreRestSiblings': true
				}
			]
		},
		settings: {
			'import/resolver': {
				typescript: {},
			},
		},
	},
	// settings for TypeScript files
	{
		files: ['**/*.ts'],
		languageOptions: {
			parserOptions: {
				project: ['./tsconfig.json'],
			},
		},
		rules: {
			// base configurations
			...typescriptEslint.configs.recommended.rules,

			// general rules
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': 'error',
		},
	},
	// settings for test files
	{
		files: ['test/**/*.ts'],
		languageOptions: {
			globals: {
				// add Jest globals (such as 'describe') to avoid '... is not defined' errors
				...globals.jest,
			},
		},
	},
]

export default config
