import { z } from 'zod';

export const orgUserSchema = z.object({
  email: z.string(),
});
