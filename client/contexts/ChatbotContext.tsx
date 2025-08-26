import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { chatbotService, ChatMessage, ChatSession } from '../services/chatbot';
import { useAuth } from './AuthContext';
import { useLanguage } from './LanguageContext';

interface ChatbotContextType {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  sessionId: string | null;
  userType: 'customer' | 'worker';
  
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (message: string) => Promise<void>;
  setUserType: (type: 'customer' | 'worker') => void;
  clearChat: () => void;
}

const ChatbotContext = createContext<ChatbotContextType | undefined>(undefined);

export const useChatbot = () => {
  const context = useContext(ChatbotContext);
  if (!context) {
    throw new Error('useChatbot must be used within a ChatbotProvider');
  }
  return context;
};

interface ChatbotProviderProps {
  children: React.ReactNode;
}

export const ChatbotProvider: React.FC<ChatbotProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [userType, setUserType] = useState<'customer' | 'worker'>('customer');
  
  const { user } = useAuth();
  const { language } = useLanguage();

  // Initialize chat session when opening chat
  const initializeSession = useCallback(async () => {
    try {
      const newSessionId = await chatbotService.createChatSession(
        userType,
        language,
        user?._id
      );
      setSessionId(newSessionId);
      
      // Add welcome message
      const welcomeMessage: ChatMessage = {
        id: `welcome_${Date.now()}`,
        role: 'assistant',
        content: getWelcomeMessage(userType, language),
        timestamp: new Date(),
        language: language,
        userType
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Failed to initialize chat session:', error);
    }
  }, [userType, language, user?._id]);

  const getWelcomeMessage = (type: 'customer' | 'worker', language: string): string => {
    const messages: Record<string, Record<string, string>> = {
      en: {
        customer: "Hello! 👋 I'm your Nagrik Sewa AI assistant. I can help you with booking services, finding workers, tracking orders, and answering questions about our platform. How can I assist you today?",
        worker: "Hello! 👋 I'm your Nagrik Sewa AI assistant for workers. I can help you with profile setup, verification process, training programs, government schemes, earnings, and platform features. How can I help you today?"
      },
      hi: {
        customer: "नमस्ते! 👋 मैं आपका नागरिक सेवा AI सहायक हूं। मैं आपको सेवाएं बुक करने, कामगार खोजने, ऑर्डर ट्रैक करने और हमारे प्लेटफॉर्म के बारे में प्रश्नों के जवाब देने में मदद कर सकता हूं। आज मैं आपकी कैसे सहायता कर सकता हूं?",
        worker: "नमस्ते! 👋 मैं कामगारों के लिए आपका नागरिक सेवा AI सहायक हूं। मैं आपको प्रोफाइल सेटअप, सत्यापन प्रक्रिया, प्रशिक्षण कार्यक्रम, सरकारी योजनाओं, कमाई और प्लेटफॉर्म सुविधाओं में मदद कर सकता हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
      }
    };
    
    return messages[language]?.[type] || messages.en[type];
  };

  const openChat = useCallback(async () => {
    setIsOpen(true);
    if (!sessionId) {
      await initializeSession();
    }
  }, [sessionId, initializeSession]);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(async (message: string) => {
    if (!sessionId || !message.trim()) return;

    setIsLoading(true);
    
    try {
      // Add user message to UI immediately
      const userMessage: ChatMessage = {
        id: `temp_${Date.now()}`,
        role: 'user',
        content: message,
        timestamp: new Date(),
        language: language,
        userType
      };
      
      setMessages(prev => [...prev, userMessage]);
      
      // Send to AI service and get response
      const response = await chatbotService.sendMessage(sessionId, message);
      
      // Update messages with actual response
      setMessages(prev => {
        // Remove temporary user message and add both actual user message and response
        const withoutTemp = prev.filter(msg => msg.id !== userMessage.id);
        const session = chatbotService.getChatSession(sessionId);
        return session ? session.messages : withoutTemp;
      });
      
    } catch (error) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error_${Date.now()}`,
        role: 'assistant',
        content: "I'm sorry, I'm having trouble responding right now. Please try again or contact our support team.",
        timestamp: new Date(),
        language: language,
        userType
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [sessionId, language, userType]);

  const clearChat = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    if (isOpen) {
      initializeSession();
    }
  }, [isOpen, initializeSession]);

  // Update user type and reinitialize session
  const handleSetUserType = useCallback(async (type: 'customer' | 'worker') => {
    setUserType(type);
    if (sessionId) {
      chatbotService.closeChatSession(sessionId);
    }
    setSessionId(null);
    setMessages([]);
    
    if (isOpen) {
      await initializeSession();
    }
  }, [sessionId, isOpen, initializeSession]);

  // Auto-detect user type based on auth context
  useEffect(() => {
    if (user?.role) {
      const detectedType = user.role === 'worker' ? 'worker' : 'customer';
      if (detectedType !== userType) {
        handleSetUserType(detectedType);
      }
    }
  }, [user?.role, userType, handleSetUserType]);

  const value: ChatbotContextType = {
    isOpen,
    messages,
    isLoading,
    sessionId,
    userType,
    openChat,
    closeChat,
    sendMessage,
    setUserType: handleSetUserType,
    clearChat
  };

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
};
