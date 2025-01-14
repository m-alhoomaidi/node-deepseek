import dotenv from 'dotenv';

dotenv.config();

export const TEST_API_KEY = process.env.DEEPSEEK_API_KEY || 'test-api-key'; 