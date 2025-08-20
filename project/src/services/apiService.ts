// OpenRouter API service for LearnerBot
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ApiResponse {
  message: string;
  error?: string;
}

class OpenRouterApiService {
  private apiKey: string;
  private baseUrl: string = 'https://openrouter.ai/api/v1';
  private siteUrl: string;
  private siteName: string;

  constructor() {
    this.apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || '';
    this.siteUrl = import.meta.env.VITE_SITE_URL || 'https://learnerbot.ai';
    this.siteName = import.meta.env.VITE_SITE_NAME || 'LearnerBot AI Assistant';
    
    if (!this.apiKey) {
      console.warn('OpenRouter API key not found. Please set VITE_OPENROUTER_API_KEY in your .env file');
    }
  }

  async sendMessage(message: string, conversationHistory: ChatMessage[] = []): Promise<ApiResponse> {
    if (!this.apiKey) {
      throw new Error('OpenRouter API key not configured. Please add your API key to the .env file.');
    }

    try {
      const messages: ChatMessage[] = [
        {
          role: 'system',
          content: `You are LearnerBot, an advanced AI learning assistant created to help users learn, understand complex concepts, and grow their knowledge across various subjects. 

Your personality:
- Friendly, encouraging, and patient
- Enthusiastic about learning and teaching
- Clear and concise in explanations
- Supportive and motivating

Your capabilities:
- Explain complex topics in simple terms
- Provide step-by-step guidance
- Offer examples and analogies
- Help with homework, coding, science, math, languages, and more
- Adapt explanations to the user's level of understanding

Always format your responses with markdown when appropriate for better readability. Use code blocks for code examples, bullet points for lists, and emphasis for important concepts.`
        },
        ...conversationHistory,
        {
          role: 'user',
          content: message
        }
      ];

      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': this.siteUrl,
          'X-Title': this.siteName,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'openai/gpt-4o',
          messages: messages,
          max_tokens: 1500,
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0.1,
          presence_penalty: 0.1,
          stream: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error?.message || `OpenRouter API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from OpenRouter API');
      }

      return {
        message: data.choices[0].message.content.trim()
      };

    } catch (error) {
      console.error('OpenRouter API Error:', error);
      
      if (error instanceof Error) {
        return {
          message: '',
          error: error.message
        };
      }
      
      return {
        message: '',
        error: 'An unexpected error occurred while communicating with the OpenRouter API'
      };
    }
  }

  // Get available models
  async getAvailableModels(): Promise<any[]> {
    try {
      const response = await fetch(`${this.baseUrl}/models`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch models');
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('Error fetching models:', error);
      return [];
    }
  }
}

export const apiService = new OpenRouterApiService();