import OpenAI from 'openai';
import { env } from '../env';

export const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
  baseURL: 'https://openrouter.ai/api/v1',
});
