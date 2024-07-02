import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const openai = createOpenAI({
    // custom settings, e.g.
    compatibility: 'strict', // strict mode, enable when using the OpenAI API
    apiKey: process.env.OPEN_API_KEY
  });

export async function POST(req: Request) {
  try {
    const prompt = "Create a list of three open-ended and engaging questions formatted as a single string. Each question formatted as single string. Each question should be separated by '||'. These questions are for anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience, Avoid universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive amd welcoming conversational environment."
    // const { messages } = await req.json();

    const result = await streamText({
        model: openai('gpt-3.5-turbo'),
        // messages,
        prompt,
    });

    return result.toAIStreamResponse();
  } catch (error) {
        // console.log('An unexpected error occurred', (error as {message: string})?.message)
        // throw error
        return Response.json({
            success: false,
            message: (error as {message: string})?.message,
            error
        }, {status: (error as {status: number})?.status || 500})
  }
}