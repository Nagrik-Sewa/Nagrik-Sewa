import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  language?: string;
  userType?: 'customer' | 'worker';
}

export interface ChatSession {
  id: string;
  userId?: string;
  userType: 'customer' | 'worker';
  language: string;
  messages: ChatMessage[];
  status: 'active' | 'escalated' | 'resolved';
  createdAt: Date;
  updatedAt: Date;
}

class ChatbotService {
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  private activeSessions = new Map<string, ChatSession>();

  // System prompts for different user types and languages
  private getSystemPrompt(userType: 'customer' | 'worker', language: string): string {
    const basePrompt = `You are a helpful AI assistant for Nagrik Sewa, a professional home services platform in India. You help ${userType}s with their questions and provide accurate, helpful information.

Platform Context:
- Nagrik Sewa connects customers with verified service providers (workers)
- Services include: plumbing, electrical, cleaning, carpentry, painting, appliance repair, beauty services, tutoring, etc.
- Workers can join the platform, get verified, access training, and build their profiles
- Customers can book services, track bookings, and rate workers

${userType === 'customer' ? `
Customer Support Areas:
- How to book services and find workers
- Booking management and tracking
- Payment and pricing questions
- Safety and verification information
- Platform features and app usage
- Cancellation and refund policies
` : `
Worker Support Areas:
- How to join and register as a worker
- Profile setup and verification process
- Skill training and certification programs
- Government schemes and benefits
- Resume building and profile optimization
- Earnings and payment information
- Customer interaction best practices
`}

Language: Please respond in ${this.getLanguageName(language)} language.

Guidelines:
1. Be helpful, friendly, and professional
2. Provide accurate information about Nagrik Sewa services
3. If you don't know something specific, admit it and suggest contacting support
4. For complex issues, recommend human support escalation
5. Keep responses concise but informative
6. Use appropriate cultural context for Indian users
7. Always prioritize user safety and platform integrity

If the query is too complex, requires personal account access, or involves sensitive information, respond with: "I'd like to connect you with our human support team for better assistance with this specific issue."
`;

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
      // Check if message should be escalated
      if (this.shouldEscalate(message)) {
        const escalationMessage: ChatMessage = {
          id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          role: 'assistant',
          content: this.getEscalationMessage(session.language),
          timestamp: new Date(),
          language: session.language,
          userType: session.userType
        };

        session.messages.push(escalationMessage);
        session.status = 'escalated';
        this.activeSessions.set(sessionId, session);

        // Trigger human support notification
        this.notifyHumanSupport(session, userMessage);

        return escalationMessage;
      }

      // Generate AI response
      const systemPrompt = this.getSystemPrompt(session.userType, session.language);
      const conversationHistory = session.messages
        .slice(-10) // Keep last 10 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      const prompt = `${systemPrompt}\n\nConversation History:\n${conversationHistory}\n\nUser: ${message}\n\nAssistant:`;

      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text();

      // Check if AI response indicates escalation needed
      if (responseText.includes("connect you with our human support team")) {
        session.status = 'escalated';
        this.notifyHumanSupport(session, userMessage);
      }

      const assistantMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: responseText,
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
      
      // Fallback response
      const fallbackMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: this.getFallbackMessage(session.language),
        timestamp: new Date(),
        language: session.language,
        userType: session.userType
      };

      session.messages.push(fallbackMessage);
      session.status = 'escalated';
      this.activeSessions.set(sessionId, session);

      this.notifyHumanSupport(session, userMessage);
      return fallbackMessage;
    }
  }

  private shouldEscalate(message: string): boolean {
    const escalationKeywords = [
      'emergency', 'urgent', 'complaint', 'refund', 'money', 'payment failed',
      'account locked', 'cannot login', 'fraud', 'scam', 'theft', 'harassment',
      'safety issue', 'inappropriate', 'legal', 'police', 'court'
    ];

    const lowerMessage = message.toLowerCase();
    return escalationKeywords.some(keyword => lowerMessage.includes(keyword));
  }

  private getEscalationMessage(language: string): string {
    const messages: Record<string, string> = {
      'en': "I understand this is an important matter. Let me connect you with our human support team who can provide personalized assistance. Please hold on while I transfer your chat.",
      'hi': "मैं समझता हूं कि यह एक महत्वपूर्ण मामला है। मैं आपको हमारी मानव सहायता टीम से जोड़ता हूं जो व्यक्तिगत सहायता प्रदान कर सकती है। कृपया प्रतीक्षा करें जब तक मैं आपकी चैट ट्रांसफर करता हूं।",
      'ta': "இது ஒரு முக்கியமான விষயம் என்று நான் புரிந்துகொள்கிறேன். தனிப்பட்ட உதவி வழங்கக்கூดிய எங்கள் மனித ஆதரவு குழுவுடன் உங்களை இணைக்கிறேன். நான் உங்கள் அரட்டையை மாற்றும்போது தயவுசெய்து காத்திருக்கவும்."
    };
    return messages[language] || messages['en'];
  }

  private getFallbackMessage(language: string): string {
    const messages: Record<string, string> = {
      'en': "I'm sorry, I'm experiencing some technical difficulties. Let me connect you with our human support team for immediate assistance.",
      'hi': "मुझे खेद है, मैं कुछ तकनीकी कठिनाइयों का सामना कर रहा हूं। तत्काल सहायता के लिए मैं आपको हमारी मानव सहायता टीम से जोड़ता हूं।",
      'ta': "மன்னிக்கவும், நான் சில தொழில்நுட்ப சிக்கல்களை எதிர்கொள்கிறேன். உடனடி உதவிக்காக எங்கள் மனித ஆதரவு குழுவுடன் உங்களை இணைக்கிறேன்."
    };
    return messages[language] || messages['en'];
  }

  private async notifyHumanSupport(session: ChatSession, userMessage: ChatMessage): Promise<void> {
    // In a real implementation, this would send a notification to human support agents
    console.log('Human support notification:', {
      sessionId: session.id,
      userType: session.userType,
      language: session.language,
      message: userMessage.content,
      userId: session.userId
    });

    // Here you would typically:
    // 1. Send notification to support team via email/SMS/WebSocket
    // 2. Create a support ticket in your ticketing system
    // 3. Add the session to a human support queue
  }

  getChatSession(sessionId: string): ChatSession | undefined {
    return this.activeSessions.get(sessionId);
  }

  getActiveSessionsForUser(userId: string): ChatSession[] {
    return Array.from(this.activeSessions.values())
      .filter(session => session.userId === userId && session.status === 'active');
  }

  closeChatSession(sessionId: string): void {
    const session = this.activeSessions.get(sessionId);
    if (session) {
      session.status = 'resolved';
      session.updatedAt = new Date();
      this.activeSessions.set(sessionId, session);
    }
  }

  // AI Resume Enhancement Features
  async enhanceResume(resumeData: any, language: string = 'en'): Promise<any> {
    try {
      const prompt = `As an expert resume writer, enhance this resume data to make it more professional and appealing to employers in India's service industry. 

Resume Data:
${JSON.stringify(resumeData, null, 2)}

Language: Respond in ${this.getLanguageName(language)}

Please provide:
1. Enhanced professional summary
2. Improved skill descriptions
3. Better job descriptions with action words
4. Relevant keywords for Indian job market
5. Professional formatting suggestions

Focus on making the resume suitable for service industry workers (plumbers, electricians, cleaners, etc.) while maintaining authenticity.

Return the response as JSON with enhanced fields.`;

      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text();
      
      // Try to parse JSON response, fallback to text if needed
      try {
        return JSON.parse(responseText);
      } catch {
        return { enhancedContent: responseText };
      }
    } catch (error) {
      console.error('Resume enhancement error:', error);
      throw new Error('Failed to enhance resume');
    }
  }

  async generateResumeContent(jobTitle: string, experience: number, skills: string[], language: string = 'en'): Promise<any> {
    try {
      const prompt = `Create professional resume content for a ${jobTitle} with ${experience} years of experience in India.

Skills: ${skills.join(', ')}
Language: ${this.getLanguageName(language)}

Generate:
1. Professional summary (2-3 lines)
2. Key achievements (3-4 points)
3. Core competencies
4. Professional objective
5. Industry-specific keywords

Make it suitable for Indian service industry and employment market.
Return as JSON structure.`;

      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text();
      
      try {
        return JSON.parse(responseText);
      } catch {
        return { generatedContent: responseText };
      }
    } catch (error) {
      console.error('Resume generation error:', error);
      throw new Error('Failed to generate resume content');
    }
  }
}

export const chatbotService = new ChatbotService();
