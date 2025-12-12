import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Gemini AI with error handling
const getGeminiModel = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('Gemini API key not found. AI features will be limited.');
    return null;
  }
  
  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    return genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  } catch (error) {
    console.error('Failed to initialize Gemini model:', error);
    return null;
  }
};

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
  private model = getGeminiModel();
  private activeSessions = new Map<string, ChatSession>();

  // Simplified system prompt for better responses
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
      if (!this.model) {
        throw new Error('AI service is not available. Please check your configuration.');
      }

      const systemPrompt = this.getSystemPrompt(session.userType, session.language);
      
      // Enhanced conversation context with user intent analysis
      const conversationHistory = session.messages
        .slice(-10) // Keep last 10 messages for context
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n');

      // Simple prompt for better AI responses
      const simplePrompt = `${systemPrompt}

Previous conversation:
${conversationHistory}

User asks: ${message}

Please respond helpfully and keep it brief (2-3 sentences):`;

      const result = await this.model.generateContent(simplePrompt);
      const responseText = result.response.text();

      // Simple response processing
      const processedResponse = responseText.trim();

      // Check if AI response indicates escalation needed
      if (processedResponse.includes("connect you with our specialist team") || 
          processedResponse.includes("human agent")) {
        session.status = 'escalated';
        this.notifyHumanSupport(session, userMessage);
      }

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
      
      // Enhanced fallback with context-aware messaging
      const fallbackContent = this.getEnhancedFallback(message, session);
      
      const fallbackMessage: ChatMessage = {
        id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        role: 'assistant',
        content: fallbackContent,
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

  // Analyze user intent from their message
  private analyzeUserIntent(message: string, userType: 'customer' | 'worker'): {
    primary: string;
    category: string;
    confidence: string;
  } {
    const lowerMessage = message.toLowerCase();
    
    // Customer intents
    const customerIntents = {
      booking: ['book', 'schedule', 'appointment', 'service', 'need'],
      pricing: ['cost', 'price', 'rate', 'charge', 'fee', 'expensive'],
      tracking: ['status', 'track', 'where', 'when', 'eta', 'progress'],
      cancellation: ['cancel', 'reschedule', 'change', 'modify'],
      payment: ['pay', 'payment', 'bill', 'invoice', 'refund'],
      complaint: ['problem', 'issue', 'wrong', 'bad', 'complain', 'dissatisfied']
    };

    // Worker intents
    const workerIntents = {
      registration: ['join', 'register', 'signup', 'apply', 'become'],
      verification: ['verify', 'document', 'approve', 'certificate'],
      earnings: ['earn', 'money', 'income', 'salary', 'payment'],
      training: ['train', 'learn', 'skill', 'course', 'certificate'],
      profile: ['profile', 'resume', 'portfolio', 'improve', 'optimize']
    };

    const intents = userType === 'customer' ? customerIntents : workerIntents;
    
    let bestMatch = { intent: 'general', confidence: 0 };
    
    for (const [intent, keywords] of Object.entries(intents)) {
      const matches = keywords.filter(keyword => lowerMessage.includes(keyword)).length;
      const confidence = matches / keywords.length;
      
      if (confidence > bestMatch.confidence) {
        bestMatch = { intent, confidence };
      }
    }

    return {
      primary: bestMatch.intent,
      category: userType,
      confidence: bestMatch.confidence > 0.3 ? 'high' : bestMatch.confidence > 0.1 ? 'medium' : 'low'
    };
  }

  // Get contextual information based on user intent
  private getContextualInfo(intent: any, session: ChatSession): string {
    // Use predefined knowledge base
    const kb = {
      services: {
        categories: [
          'plumbing', 'electrical', 'cleaning', 'carpentry', 'painting',
          'appliance repair', 'gardening', 'pest control'
        ]
      },
      emergencyKeywords: [
        'emergency', 'urgent', 'help', 'broke', 'leak', 'fire', 'safety'
      ],
      commonIssues: {
        plumbing: ['leak', 'blockage', 'no water', 'low pressure'],
        electrical: ['no power', 'short circuit', 'flickering lights'],
        cleaning: ['deep cleaning', 'regular cleaning', 'move-in cleaning']
      },
      booking: {
        steps: ['Select Service', 'Choose Date & Time', 'Confirm Details', 'Make Payment'],
        cancellation: {
          policy: 'Free cancellation up to 2 hours before scheduled time'
        }
      },
      worker: {
        requirements: {
          documents: ['Aadhaar Card', 'PAN Card', 'Police Verification'],
          skills: ['Technical Skills', 'Communication', 'Reliability']
        },
        earnings: {
          commission: '15% platform fee',
          payment: 'Weekly direct bank transfer'
        }
      }
    };
    
    switch (intent.primary) {
      case 'booking':
        return `📋 BOOKING CONTEXT:
Available Services: ${kb.services.categories.join(', ')}
Booking Steps: ${kb.booking.steps.join(' → ')}
Cancellation Policy: ${kb.booking.cancellation.policy}`;

      case 'pricing':
        return `💰 PRICING CONTEXT:
Service Rates: Vary by location and complexity
Popular Services: Plumbing (₹200-800), Electrical (₹150-600), Cleaning (₹300-1200)
Payment: Multiple options available, pay after service completion`;

      case 'registration':
        return `📝 WORKER REGISTRATION CONTEXT:
Requirements: ${Object.values(kb.worker.requirements).flat().join(', ')}
Process: Document submission → Verification → Training → Profile setup
Timeline: 3-7 days for complete verification`;

      case 'earnings':
        return `💰 EARNINGS CONTEXT:
Commission: ${kb.worker.earnings.commission}
Payment: ${kb.worker.earnings.payment}
Average Earnings: ₹15,000-45,000/month based on availability and skills`;

      default:
        return `ℹ️ GENERAL CONTEXT:
Platform: Professional home services across 100+ Indian cities
Users: 50,000+ verified workers, millions of satisfied customers
Support: 24/7 available via app, phone (1800-123-NAGRIK), email`;
    }
  }

  // Post-process AI response for better formatting and accuracy
  private postProcessResponse(response: string, intent: any, session: ChatSession): string {
    let processed = response.trim();

    // Ensure proper formatting
    if (!processed.includes('📞') && intent.primary !== 'general') {
      processed += '\n\n📞 Need more help? Call 1800-123-NAGRIK or use in-app support chat.';
    }

    // Add quick action suggestions based on intent
    const suggestions = this.getQuickActionSuggestions(intent, session.userType);
    if (suggestions.length > 0) {
      processed += '\n\n💡 Quick Actions: ' + suggestions.join(' | ');
    }

    return processed;
  }

  // Get enhanced fallback message with context
  private getEnhancedFallback(message: string, session: ChatSession): string {
    const intent = this.analyzeUserIntent(message, session.userType);
    
    const baseMessage = this.getFallbackMessage(session.language);
    
    let contextualHelp = '';
    switch (intent.primary) {
      case 'booking':
        contextualHelp = session.userType === 'customer' ? 
          '\n\n🔧 For immediate booking: Open app → Select Service → Choose Date/Time' :
          '\n\n📱 Check your worker dashboard for new booking requests';
        break;
      case 'payment':
        contextualHelp = '\n\n💳 For payment issues: Contact support at 1800-123-NAGRIK immediately';
        break;
      case 'emergency':
        contextualHelp = '\n\n🚨 For emergencies: Press SOS in app or call 1800-123-NAGRIK';
        break;
    }

    return baseMessage + contextualHelp;
  }

  // Get quick action suggestions based on user intent
  private getQuickActionSuggestions(intent: any, userType: 'customer' | 'worker'): string[] {
    const suggestions: Record<string, Record<string, string[]>> = {
      customer: {
        booking: ['Book Service', 'Check Availability', 'View Pricing'],
        pricing: ['Get Quote', 'Compare Services', 'Book Now'],
        tracking: ['Track Order', 'Contact Worker', 'View Details'],
        payment: ['Payment Help', 'View Invoice', 'Refund Status']
      },
      worker: {
        registration: ['Start Registration', 'Upload Documents', 'Check Status'],
        earnings: ['View Earnings', 'Payment History', 'Withdraw'],
        profile: ['Edit Profile', 'Add Skills', 'Portfolio Help'],
        training: ['Browse Courses', 'My Certificates', 'Skill Test']
      }
    };

    return suggestions[userType]?.[intent.primary] || ['Contact Support', 'Help Center', 'FAQ'];
  }

  private shouldEscalate(message: string): boolean {
    const escalationKeywords = [
      'emergency', 'urgent', 'complaint', 'refund', 'money lost', 'payment failed',
      'account locked', 'cannot login', 'fraud', 'scam', 'theft', 'harassment',
      'safety issue', 'inappropriate', 'legal', 'police', 'court', 'lawyer',
      'suicide', 'harm', 'abuse', 'assault', 'violence', 'threat'
    ];

    const lowerMessage = message.toLowerCase();
    
    // Check for direct escalation keywords
    const hasEscalationKeywords = escalationKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Check for frustration indicators
    const frustrationIndicators = ['frustrated', 'angry', 'terrible', 'worst', 'useless', 'stupid', 'hate'];
    const hasFrustration = frustrationIndicators.some(indicator => lowerMessage.includes(indicator));
    
    // Check for repeated complaints in recent messages
    const hasRepeatedIssues = this.checkForRepeatedIssues(message);

    return hasEscalationKeywords || (hasFrustration && hasRepeatedIssues);
  }

  private checkForRepeatedIssues(currentMessage: string): boolean {
    // This would check session history for repeated similar complaints
    // For now, return false - in production, implement proper logic
    return false;
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
      if (!this.model) {
        throw new Error('AI service is not available for resume enhancement.');
      }

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
