import { defineAction } from "astro:actions";
import { z } from "astro/zod";
import { Resend } from "resend";

// 1. Define schema
const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
});

// 2. Setup Resend client
const resend = new Resend(import.meta.env.RESEND_API_KEY);

// 3. Define action
export const actions = {
  contact: defineAction({
    input: contactSchema,
    handler: async ({ email, subject, body }) => {
      try {
        const { error } = await resend.emails.send({
          from: "Your Name <onboarding@resend.dev>", // Remember to change for production
          to: "tedenadane@gmail.com",
          subject: `[Portfolio Contact] ${subject}`,
          text: body,
          replyTo: email,
        });

        if (error) {
          console.error(error);
          return { success: false, error: "Email failed to send." };
        }

        return {
          success: true,
          message: "Thanks! Your message has been sent.",
        };
      } catch (err) {
        console.error(err);
        return { success: false, error: "Something went wrong." };
      }
    },
  }),
};
