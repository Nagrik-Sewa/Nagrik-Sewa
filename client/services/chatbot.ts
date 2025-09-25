import { GoogleGenerativeAI } from '@google/generative-ai';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  language: string;
  userType: 'customer' | 'worker';
}

export interface ChatSession {
  id: string;
  userId?: string;
  userType: 'customer' | 'worker';
  language: string;
  messages: ChatMessage[];
  status: 'active' | 'resolved' | 'escalated';
  createdAt: Date;
  updatedAt: Date;
}

class ChatbotService {
  private genAI: GoogleGenerativeAI | null = null;
  private model: any = null;
  private activeSessions = new Map<string, ChatSession>();

  constructor() {
    this.initializeAI();
  }

  private async initializeAI() {
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        console.error('VITE_GEMINI_API_KEY not found');
        return;
      }

      this.genAI = new GoogleGenerativeAI(apiKey);
      this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      console.log('Chatbot AI initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AI:', error);
    }
  }

  private getSystemPrompt(userType: 'customer' | 'worker', language: string): string {
    const basePrompt = `You are a helpful AI assistant for Nagrik Sewa, India's home services platform. 

Keep responses SHORT and helpful (2-3 sentences max). Focus on being practical and direct.

${userType === 'customer' ? `
Help customers with:
- Booking services (plumbing, electrical, cleaning, etc.)
- Finding workers
- Pricing (₹200-800 typical range)  
- Tracking appointments
- Safety questions
` : `
Help workers with:
- Registration process
- Document verification
- Training programs
- Earnings (₹15,000-45,000/month average)
- Profile optimization
`}

Always end with: "Need more help? Call 1800-123-NAGRIK"
Respond in ${this.getLanguageName(language)}.`;

    return basePrompt;
  }

  private getLanguageName(code: string): string {
    const languages: Record<string, string> = {
      'en': 'English',
      'hi': 'Hindi (हिंदी)',
      'ta': 'Tamil (தமிழ்)',
      'te': 'Telugu (తెలుగు)',
      'bn': 'Bengali (বাংলা)',
      'mr': 'Marathi (मराठी)',
      'gu': 'Gujarati (ગુજરાતી)',
      'kn': 'Kannada (ಕನ್ನಡ)',
      'ml': 'Malayalam (മലയാളം)',
      'pa': 'Punjabi (ਪੰਜਾਬੀ)',
      'ur': 'Urdu (اردو)'
    };
    return languages[code] || 'English';
  }

  async createChatSession(userType: 'customer' | 'worker', language: string = 'en', userId?: string): Promise<string> {
    const sessionId = `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const session: ChatSession = {
      id: sessionId,
      userId,
      userType,
      language,
      messages: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.activeSessions.set(sessionId, session);
    return sessionId;
  }

  async sendMessage(sessionId: string, message: string): Promise<ChatMessage> {
    const session = this.activeSessions.get(sessionId);
    if (!session) {
      throw new Error('Chat session not found');
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
      language: session.language,
      userType: session.userType
    };

    session.messages.push(userMessage);

    try {
      // Generate AI response
      if (!this.model) {
        throw new Error('AI service is not available');
      }

      const systemPrompt = this.getSystemPrompt(session.userType, session.language);
      
      // Simple conversation context
      const conversationHistory = session.messages
        .slice(-5) // Keep last 5 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const simplePrompt = `${systemPrompt}

Previous conversation:
${conversationHistory}

User asks: ${message}

Please respond helpfully and keep it brief (2-3 sentences):`;

      const result = await this.model.generateContent(simplePrompt);
      const responseText = result.response.text();

      // Simple response processing
      const processedResponse = responseText.trim();

      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: processedResponse,
        timestamp: new Date(),
        language: session.language,
        userType: session.userType
      };

      session.messages.push(assistantMessage);
      session.updatedAt = new Date();
      this.activeSessions.set(sessionId, session);

      return assistantMessage;

    } catch (error) {
      console.error('AI response error:', error);
      
      // Fallback message
      const fallbackMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: this.getFallbackMessage(session.language),
        timestamp: new Date(),
        language: session.language,
        userType: session.userType
      };

      session.messages.push(fallbackMessage);
      this.activeSessions.set(sessionId, session);

      return fallbackMessage;
    }
  }

  private getFallbackMessage(language: string): string {
    const messages: Record<string, string> = {
      'en': "Sorry, I'm having trouble right now. Please contact support at 1800-123-NAGRIK.",
      'hi': "माफ करें, मुझे अभी समस्या हो रही है। कृपया 1800-123-NAGRIK पर सहायता से संपर्क करें।"
    };
    return messages[language] || messages['en'];
  }

  getChatSession(sessionId: string): ChatSession | undefined {
    return this.activeSessions.get(sessionId);
  }

  closeChatSession(sessionId: string): void {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      session.status = 'resolved';
      this.activeSessions.set(sessionId, session);
    }
  }
}

export const chatbotService = new ChatbotService();