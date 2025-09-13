import { z, defineCollection } from "astro:content";

// schema for the "profile" structure
const profileStructure = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    location: z.string(),
    x: z.string(),
    github: z.string(),
    linkedin: z.string(),
    resume: z.string(),
    email: z.string(),
  }),
});

// schema for the "work" collection
const workCollection = defineCollection({
  type: "content",
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
  schema: z.object({
    school: z.string(),
    degree: z.string(),
    location: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
  }),
});

export const collections = {
  profile: profileStructure,
  work: workCollection,
  education: educationCollection,
};
