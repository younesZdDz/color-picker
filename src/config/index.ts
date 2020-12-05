import dotenv from 'dotenv';

dotenv.config();

export default {
    API_URI: process.env.REACT_APP_API_URI || 'http://localhost:3000',
};
