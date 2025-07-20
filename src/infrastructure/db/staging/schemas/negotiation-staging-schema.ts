import { z } from 'zod/v4';

export const negotiationStagingSchema = z.object({
  title: z.string().min(1),
  client: z.string().min(1),
  user: z.string().optional(),
  tags: z.string().optional(),
  step: z.string().optional(),
  status: z.string().optional(),
  value: z.coerce.number().optional(),
  startsDate: z.string().optional(),
  observation: z.string().optional(),
  partnerId: z.string().optional(),
  averageGuide: z.coerce.number().optional(),
});
