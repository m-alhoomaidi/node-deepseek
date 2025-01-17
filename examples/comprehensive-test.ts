import { deepseekClient } from './setup-client';

async function testAllFeatures() {
  try {
    const chatResponse = await deepseekClient.chat.createCompletion({
      messages: [{ role: 'user', content: 'Hello' }],
      model: 'deepseek-chat',
      temperature: 0.7,
    });
    console.log('Chat Response:', chatResponse.choices[0].message.content);

    const codeResponse = await deepseekClient.chat.createCompletion({
      messages: [{ role: 'user', content: 'Write a Python function to sort a list' }],
      model: 'deepseek-coder',
      temperature: 0.3,
    });
    console.log('Code Response:', codeResponse.choices[0].message.content);

    console.log('Streaming Response:');
    await deepseekClient.chat.streamCompletion(
      {
        messages: [{ role: 'user', content: 'Tell me a story' }],
        model: 'deepseek-chat',
        stream: true,
      },
      (chunk) => {
        process.stdout.write(chunk.choices[0].delta.content || '');
      },
    );

    const systemResponse = await deepseekClient.chat.createCompletion({
      messages: [
        { role: 'system', content: 'You are a helpful math tutor.' },
        { role: 'user', content: 'Explain the Pythagorean theorem' },
      ],
      model: 'deepseek-chat',
      max_tokens: 500,
    });
    console.log('\nSystem Message Response:', systemResponse.choices[0].message.content);
  } catch (error) {
    console.error('Error:', error);
  }
}

testAllFeatures();
