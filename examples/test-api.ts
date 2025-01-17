import { Deepseek } from '../src';

async function test() {
  const client = new Deepseek({
    apiKey: process.env.DEEPSEEK_API_KEY || '',
  });

  try {
    const response = await client.chat.createCompletion({
      messages: [{ role: 'user', content: 'Hello, how are you?' }],
      model: 'deepseek-chat',
    });

    console.log('Response:', response.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();
