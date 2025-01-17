import { Deepseek } from '../src';
// Create a singleton instance
export const deepseekClient = new Deepseek({
  apiKey: process.env.DEEPSEEK_API_KEY!,

  timeout: 30000,
});
