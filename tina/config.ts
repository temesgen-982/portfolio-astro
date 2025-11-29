import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/r/content-modelling-collections/
  schema: {
    collections: [
      {
        name: "profile",
        label: "Profile",
        path: "src/content/profile",
        fields: [
          { type: "string", name: "name", label: "Name", required: true },
          { type: "string", name: "title", label: "Title", required: true },
          { type: "string", name: "location", label: "Location", required: true },
          {
            type: "object",
            name: "links",
            label: "Links",
            fields: [
              { type: "string", name: "x", label: "X (Twitter)" },
              { type: "string", name: "github", label: "GitHub" },
              { type: "string", name: "linkedin", label: "LinkedIn" },
              { type: "string", name: "resume", label: "Resume" },
            ],
          },
          { type: "string", name: "email", label: "Email", required: true },
        ],
      },
      {
        name: "work",
        label: "Work",
        path: "src/content/work",
        fields: [
          { type: "string", name: "company", label: "Company", required: true, isTitle: true },
          { type: "string", name: "role", label: "Role", required: true },
          { type: "string", name: "location", label: "Location", required: true },
          { type: "datetime", name: "startDate", label: "Start Date", required: true },
          { type: "datetime", name: "endDate", label: "End Date" },
          { type: "string", name: "tags", label: "Tags", list: true },
        ],
      },
      {
        name: "education",
        label: "Education",
        path: "src/content/education",
        fields: [
          { type: "string", name: "school", label: "School", required: true, isTitle: true },
          { type: "string", name: "degree", label: "Degree", required: true },
          { type: "string", name: "location", label: "Location", required: true },
          { type: "datetime", name: "startDate", label: "Start Date", required: true },
          { type: "datetime", name: "endDate", label: "End Date" },
        ],
      },
      {
        name: "projects",
        label: "Projects",
        path: "src/content/projects",
        fields: [
          { type: "string", name: "title", label: "Title", required: true, isTitle: true },
          { type: "string", name: "description", label: "Description", required: true },
          { type: "image", name: "screenshot", label: "Screenshot" },
          { type: "string", name: "livesite", label: "Live Site URL" },
          { type: "string", name: "github", label: "GitHub URL" },
          { type: "string", name: "tags", label: "Tags", list: true },
        ],
      },
      {
        name: "post",
        label: "Posts",
        path: "src/content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "Date Posted",
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true,
          },
          {
            type: "image",
            name: "heroImage",
            label: "Hero Image",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
        ],
      },
    ],
  },
});
