# Deepseek Node.js Client

A fully-featured TypeScript/Node.js client for interacting with the Deepseek AI API.

## Installation

```bash
npm install node-deepseek
```

## Quick Start

```typescript
import { Deepseek } from 'node-deepseek';

const client = new Deepseek({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
});

const response = await client.chat.createCompletion({
  messages: [{ role: 'user', content: 'Hello, how are you?' }],
  model: 'deepseek-chat',
});
```

## Features

- Comprehensive TypeScript support
- Streaming responses for real-time updates
- Robust error handling with detailed messages
- Full compatibility with all Deepseek models
- Automatic retries for rate-limited requests

## Available Models

- **`deepseek-chat`**
- **`deepseek-chat-v2`**
- **`deepseek-chat-v2.5`**
- **`deepseek-coder`**
- **`deepseek-coder-v2`**
- **`deepseek-coder-v2.5`**

## API Reference

### Configuration

```typescript
const client = new Deepseek({
  apiKey: process.env.DEEPSEEK_API_KEY || '',
});
```

### Chat Completion

```typescript
const response = await client.chat.createCompletion({
  messages: [{ role: 'user', content: 'Hello' }],
  model: 'deepseek-chat',
  temperature: 0.7,
  max_tokens: 100,
});
```

### Streaming

```typescript
await client.chat.streamCompletion(
  {
    messages: [{ role: 'user', content: 'Tell me a story' }],
    model: 'deepseek-chat',
    stream: true,
  },
  (chunk) => console.log(chunk.choices[0].delta.content),
);
```

## Error Handling

```typescript
try {
  const response = await client.chat.createCompletion({
    messages: [{ role: 'user', content: 'Hello' }],
    model: 'deepseek-chat',
  });
} catch (error) {
  if (error instanceof DeepseekError) {
    console.error('API Error:', error.message);
  }
}
```

## License

This project is licensed under the MIT License.

## Contributing

We welcome contributions! Please refer to [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to contribute.

## Development

### Installation

```bash
npm install
```

### Scripts

- **Run Tests**
  ```bash
  npm test
  ```

- **Run Tests in Watch Mode**
  ```bash
  npm run test:watch
  ```

- **Run Tests with Coverage**
  ```bash
  npm run test:coverage
  ```

- **Lint Code**
  ```bash
  npm run lint
  ```

- **Fix Linting Issues**
  ```bash
  npm run lint:fix
  ```

- **Format Code**
  ```bash
  npm run format
  ```

 