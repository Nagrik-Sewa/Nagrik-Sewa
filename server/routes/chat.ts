import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

// Chat endpoint
router.post('/chat', async (req, res) => {
  try {
    const { message, language = 'hi' } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required'
      });
    }

    // Check if API key is available
    if (!process.env.VITE_GEMINI_API_KEY) {
      return res.status(500).json({
        success: false,
        message: 'AI service is not configured'
      });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create context-aware prompt for Nagrik Sewa
    const prompt = `You are an AI assistant for Nagrik Sewa, a home services platform in India. 
    
Context: Nagrik Sewa connects customers with verified home service providers for cleaning, plumbing, electrical work, carpentry, painting, appliance repair, gardening, pest control, moving services, and beauty services.

Language: Respond in ${language === 'hi' ? 'Hindi' : 'English'}.

User message: ${message}

Provide helpful, accurate information about home services. If the user asks about booking, pricing, or specific services, guide them appropriately. Keep responses concise and helpful.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({
      success: true,
      data: {
        response: text,
        language
      }
    });

  } catch (error) {
    console.error('Chat error:', error);
    res.status(500).json({
      success: false,
      message: 'Chat service temporarily unavailable',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

export default router;
