/* eslint-disable quote-props */
import { config } from 'dotenv';

config();

module.exports = {
	development: {
		use_env_variable: 'DATABASE_URL_DEV',
		dialect: 'postgres',
		logging: false,
		dialectOptions: {
			ssl: true
		}
	},
	test: {
		use_env_variable: 'DATABASE_URL_TEST',
		dialect: 'postgres',
		logging: false,
		dialectOptions: {
			ssl: true
		}
	},
	production: {
		use_env_variable: 'DATABASE_URL_PROD',
		dialect: 'postgres',
		logging: false,
		dialectOptions: {
			ssl: true
		}
	}
};
