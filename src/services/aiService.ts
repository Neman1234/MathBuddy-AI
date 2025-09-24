import { GoogleGenerativeAI } from '@google/generative-ai';
import { MathValidator } from './mathValidator';

// Initialize Gemini client
let genAI: GoogleGenerativeAI | null = null;

// Initialize client with API key from environment
const initializeClient = () => {
  const googleKey = import.meta.env.VITE_GOOGLE_API_KEY;
  
  if (googleKey && !genAI) {
    try {
      genAI = new GoogleGenerativeAI(googleKey);
      console.log('Gemini client initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Gemini client:', error);
    }
  } else if (!googleKey) {
    console.error('Google API key not found in environment variables');
  }
};

export interface AIResponse {
  model: string;
  response: string;
  error?: string;
  isLoading: boolean;
}

// Helper function to convert file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove the data:image/jpeg;base64, prefix
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// Helper function to get mime type from file
const getMimeType = (file: File): string => {
  return file.type || 'image/jpeg';
};

// Enhanced system prompt for math-only responses
const MATH_SYSTEM_PROMPT = `You are MathBuddy AI, a specialized math tutor designed for kids aged 8-16. You MUST:

1. ONLY respond to mathematics-related questions and problems
2. Provide clear, step-by-step solutions that kids can understand
3. Use simple language and explain each step
4. Show your work clearly with proper mathematical notation
5. Be encouraging and positive in your responses
6. Break down complex problems into smaller steps
7. Verify your calculations before responding

If the input is not math-related, respond with: "I can only help with mathematics problems! Please ask me a math question like 'solve 2x + 5 = 15' or 'find the area of a circle with radius 5cm'. 🔢"

Remember: You're helping kids learn math, so be patient, clear, and encouraging!`;

const IMAGE_MATH_PROMPT = `You are MathBuddy AI, a specialized math tutor for kids aged 8-16. I'm showing you an image that should contain a math problem. Please:

1. CAREFULLY examine the image for any mathematical content
2. If you find a math problem, solve it step-by-step with clear explanations
3. If the image contains text, read it and solve any math problems you find
4. If the image contains mathematical diagrams, analyze and solve them
5. Use simple language that kids can understand
6. Show all your work clearly
7. Be encouraging and positive

If the image does NOT contain any math problems, respond with: "I can only help with mathematics problems! Please upload an image with a math problem, equation, or mathematical diagram. 🔢"

Remember: You're helping kids learn math, so be patient, clear, and encouraging!`;

export class AIService {
  static async getGeminiResponse(problem: string): Promise<AIResponse> {
    try {
      console.log('Starting Gemini API request for problem:', problem);
      
      // Initialize client
      initializeClient();
      
      // Validate the problem first
      const validation = MathValidator.validateProblem(problem);
      if (!validation.isValid) {
        console.log('Problem validation failed:', validation.reason);
        return {
          model: 'Gemini AI',
          response: validation.reason || 'Invalid problem format',
          isLoading: false
        };
      }

      // Check if client is initialized
      if (!genAI) {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        console.error('Gemini client not initialized. API Key present:', !!apiKey);
        
        return {
          model: 'Gemini AI',
          response: '',
          error: 'Google Gemini API is not properly configured. Please check the API key.',
          isLoading: false
        };
      }

      console.log('Getting Gemini model...');
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.2, // Low temperature for consistent math solutions
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });
      
      const prompt = `${MATH_SYSTEM_PROMPT}

Math Problem: ${problem}

Please provide a clear, step-by-step solution that a student can easily follow and understand.`;

      console.log('Sending request to Gemini...');
      const result = await model.generateContent(prompt);
      
      if (!result.response) {
        throw new Error('No response received from Gemini');
      }

      const responseText = result.response.text();
      console.log('Received response from Gemini:', responseText.substring(0, 100) + '...');

      // Sanitize the response
      const sanitizedResponse = MathValidator.sanitizeResponse(responseText);

      return {
        model: 'Gemini AI',
        response: sanitizedResponse,
        isLoading: false
      };
      
    } catch (error: any) {
      console.error('Gemini API Error Details:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        stack: error.stack
      });
      
      let errorMessage = 'Failed to get response from Gemini AI';
      
      // Handle specific error types
      if (error.message?.includes('API_KEY_INVALID') || error.status === 400) {
        errorMessage = 'Invalid API key. Please check your Google AI API key configuration.';
      } else if (error.message?.includes('QUOTA_EXCEEDED') || error.status === 429) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error.message?.includes('SAFETY') || error.message?.includes('blocked')) {
        errorMessage = 'Content was blocked by safety filters. Please try rephrasing your math problem.';
      } else if (error.status === 403) {
        errorMessage = 'API access denied. Please check your API key permissions.';
      } else if (error.status === 404) {
        errorMessage = 'Gemini model not found. Please check your configuration.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network and try again.';
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      return {
        model: 'Gemini AI',
        response: '',
        error: errorMessage,
        isLoading: false
      };
    }
  }

  static async getGeminiImageResponse(imageFile: File): Promise<AIResponse> {
    try {
      console.log('Starting Gemini Vision API request for image:', imageFile.name);
      
      // Initialize client
      initializeClient();

      // Check if client is initialized
      if (!genAI) {
        const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
        console.error('Gemini client not initialized. API Key present:', !!apiKey);
        
        return {
          model: 'Gemini Vision AI',
          response: '',
          error: 'Google Gemini API is not properly configured. Please check the API key.',
          isLoading: false
        };
      }

      // Validate file type
      if (!imageFile.type.startsWith('image/')) {
        return {
          model: 'Gemini Vision AI',
          response: '',
          error: 'Please upload a valid image file (JPG, PNG, GIF, etc.)',
          isLoading: false
        };
      }

      // Check file size (max 4MB for Gemini)
      if (imageFile.size > 4 * 1024 * 1024) {
        return {
          model: 'Gemini Vision AI',
          response: '',
          error: 'Image file is too large. Please upload an image smaller than 4MB.',
          isLoading: false
        };
      }

      console.log('Getting Gemini Vision model...');
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });

      // Convert image to base64
      console.log('Converting image to base64...');
      const base64Data = await fileToBase64(imageFile);
      const mimeType = getMimeType(imageFile);

      // Prepare the image part for Gemini
      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      };

      console.log('Sending image to Gemini Vision...');
      const result = await model.generateContent([IMAGE_MATH_PROMPT, imagePart]);
      
      if (!result.response) {
        throw new Error('No response received from Gemini Vision');
      }

      const responseText = result.response.text();
      console.log('Received response from Gemini Vision:', responseText.substring(0, 100) + '...');

      // Sanitize the response
      const sanitizedResponse = MathValidator.sanitizeResponse(responseText);

      return {
        model: 'Gemini Vision AI',
        response: sanitizedResponse,
        isLoading: false
      };
      
    } catch (error: any) {
      console.error('Gemini Vision API Error Details:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        stack: error.stack
      });
      
      let errorMessage = 'Failed to analyze image with Gemini Vision';
      
      // Handle specific error types
      if (error.message?.includes('API_KEY_INVALID') || error.status === 400) {
        errorMessage = 'Invalid API key. Please check your Google AI API key configuration.';
      } else if (error.message?.includes('QUOTA_EXCEEDED') || error.status === 429) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error.message?.includes('SAFETY') || error.message?.includes('blocked')) {
        errorMessage = 'Image content was blocked by safety filters. Please try a different image.';
      } else if (error.message?.includes('UNSUPPORTED_IMAGE')) {
        errorMessage = 'Unsupported image format. Please use JPG, PNG, or GIF.';
      } else if (error.status === 403) {
        errorMessage = 'API access denied. Please check your API key permissions.';
      } else if (error.status === 404) {
        errorMessage = 'Gemini Vision model not found. Please check your configuration.';
      } else if (!navigator.onLine) {
        errorMessage = 'No internet connection. Please check your network and try again.';
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your internet connection and try again.';
      }
      
      return {
        model: 'Gemini Vision AI',
        response: '',
        error: errorMessage,
        isLoading: false
      };
    }
  }

  static async getSolution(problem: string): Promise<AIResponse> {
    return this.getGeminiResponse(problem);
  }

  static async getSolutionFromImage(imageFile: File): Promise<AIResponse> {
    return this.getGeminiImageResponse(imageFile);
  }

  // Check if API is configured
  static isConfigured(): boolean {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
    const isConfigured = !!apiKey && apiKey.length > 10;
    console.log('API Configuration check:', { 
      hasKey: !!apiKey, 
      keyLength: apiKey?.length || 0,
      isConfigured 
    });
    return isConfigured;
  }

  // Test API connection
  static async testConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      const testResponse = await this.getGeminiResponse('What is 2 + 2?');
      return { 
        success: !testResponse.error,
        error: testResponse.error 
      };
    } catch (error: any) {
      return { 
        success: false, 
        error: error.message || 'Connection test failed' 
      };
    }
  }
}