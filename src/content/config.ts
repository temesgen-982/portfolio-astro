import { z, defineCollection } from "astro:content";

// schema for the "work" collection
const workCollection = defineCollection({
  type: "content", // or 'data'
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),

    tags: z.array(z.string()).optional(),
  }),
});

// schema for the "education" collection
const educationCollection = defineCollection({
  type: "content",
  schema: z.object({}),
});

export const collections = {
  work: workCollection,
  education: educationCollection,
};
