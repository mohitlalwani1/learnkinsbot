# LearnerBot - AI Chat Interface

A modern, dark-themed chat interface for AI-powered learning assistance.

## Features

- 🤖 Real-time AI chat interface
- 🎨 Modern dark theme with gradient accents
- 📱 Fully responsive design
- ✨ Smooth animations and transitions
- 📝 Markdown support for rich responses
- 🔒 Secure API integration
- ⚡ TypeScript for type safety

## Setup

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure your API key:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your API key:
   ```
   VITE_OPENAI_API_KEY=your_actual_api_key_here
   VITE_API_BASE_URL=https://api.openai.com/v1
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## API Integration

The app is configured to work with OpenAI's API by default, but you can easily adapt it for other AI providers:

### OpenAI Integration
- Uses GPT-3.5-turbo model
- Maintains conversation history
- Includes system prompt for LearnerBot personality

### Custom API Integration
You can modify `src/services/apiService.ts` to work with any AI API:

```typescript
// Example for custom API
const response = await apiService.sendMessageToCustomEndpoint(
  message, 
  'https://your-api-endpoint.com/chat'
);
```

## Security Best Practices

- ✅ API keys stored in environment variables
- ✅ No sensitive data in source code
- ✅ Error handling for API failures
- ✅ Input validation and sanitization

## Project Structure

```
src/
├── components/
│   ├── ChatInterface.tsx    # Main chat container
│   ├── MessageBubble.tsx    # Individual message display
│   ├── ChatInput.tsx        # Message input field
│   ├── TypingIndicator.tsx  # Loading animation
│   └── SidePanel.tsx        # Info sidebar
├── services/
│   └── apiService.ts        # API communication
└── App.tsx                  # Root component
```

## Customization

### Styling
The app uses Tailwind CSS with a custom dark theme. Key colors:
- Background: `#121212`
- Text: `#e0e0e0`
- Accents: Purple and blue gradients

### AI Personality
Modify the system prompt in `apiService.ts` to change LearnerBot's personality and behavior.

## Deployment

Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENAI_API_KEY` | Your OpenAI API key | Yes |
| `VITE_API_BASE_URL` | API base URL | No (defaults to OpenAI) |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for your own applications.