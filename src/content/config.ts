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

// schema for the "projects" collection
const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    screenshot: z.string(),
    livesite: z.string().url().optional(),
    github: z.string().url().optional(),
    tags: z.array(z.string()),
  })
})

// schema for the "posts" collection
const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    pubDate: z.date(),
  }),
});

export const collections = {
  profile: profileCollection,
  work: workCollection,
  education: educationCollection,
  projects: projectsCollection,
  posts: postsCollection,
};
