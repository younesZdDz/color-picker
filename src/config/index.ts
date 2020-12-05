import dotenv from 'dotenv';

dotenv.config();

export default {
    API_URI: process.env.API_URI || 'http://localhost:3000',
};
