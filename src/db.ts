// Packages
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()

const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_USERNAME = process.env.DATABASE_USERNAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_PORT = process.env.DATABASE_PORT

const DATABASE_URL = `postgres://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

const database = new Sequelize(DATABASE_URL, { dialect: 'postgres' });

export default database;