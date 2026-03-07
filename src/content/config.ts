import { defineCollection, z } from 'astro:content';

const termsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    term: z.string(),
    translation: z.string(),
    category: z.enum(['قديم/مستعاد', 'كلمة جديدة', 'جهد شخصي', 'مصطلح منحوت', 'إسهام غير معروف']).optional(),
    references: z.array(z.object({
      label: z.string(),
      url: z.string().optional(),
    })).optional(),
  }),
});


export const collections = {
  'terms': termsCollection,
};
