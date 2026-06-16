import { GoogleGenAI } from '@google/genai';
import { Router } from 'express';
import { z } from 'zod';
import { asyncHandler, validateBody } from '../http';

const router = Router();

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required for AI consultations.');
    }

    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'asra-vedha'
        }
      }
    });
  }

  return aiClient;
}

const consultSchema = z.object({
  productName: z.string().default('ASRA VEDHA product'),
  productDescription: z.string().default(''),
  productIngredients: z.string().default(''),
  question: z.string().min(1, 'Consultation query is empty.')
});

router.post(
  '/consult',
  asyncHandler(async (req, res) => {
    const body = validateBody(consultSchema, req.body);

    try {
      const client = getGeminiClient();
      const systemInstruction = `
        You are a clinical Ayurvedic botanical advisor for "ASRA VEDHA", a premium eco-luxury apothecary.
        The customer is viewing: "${body.productName}"
        Product description: "${body.productDescription}"
        Product formula / ingredients: "${body.productIngredients}"

        Keep responses concise, polished, empathetic, and scannable. Clarify safe timing, standard use, and practical benefits.
        Include a brief disclaimer that botanical products support normal wellness and do not replace medical diagnosis.
      `;

      const response = await client.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: body.question,
        config: {
          systemInstruction,
          temperature: 0.7
        }
      });

      res.json({
        response:
          response.text ||
          'ASRA VEDHA botanical support is temporarily unavailable. Please try again in a moment.'
      });
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Consultation service is temporarily unavailable.';

      res.json({
        response: `Greetings from ASRA VEDHA. Regarding ${body.productName}, we generally recommend following the serving guidance on the pack and consulting a qualified clinician for condition-specific advice.`,
        error: message
      });
    }
  })
);

export default router;
