import { z, defineCollection } from "astro:content";

// schema for the "profile" structure
const profileCollection = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string(),
    links: z.object({
      x: z.string().url(),
      github: z.string().url(),
      linkedin: z.string().url(),
      resume: z.string().url(),
    }),
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
  profile: profileCollection,
  work: workCollection,
  education: educationCollection,
};
