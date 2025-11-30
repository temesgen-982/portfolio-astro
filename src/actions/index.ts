import { defineAction, ActionError } from "astro:actions";
import { z } from "astro:schema";
import { Resend } from "resend";

// schema
const contactSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  body: z.string().min(1),
  honeypot: z.string().optional(),
});

// setup Resend client
const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const server = {
  contact: defineAction({
    accept: "form",
    input: contactSchema,
    handler: async ({ email, subject, body, honeypot }) => {
      if (honeypot) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Spam detected' });
      }

      const { data, error } = await resend.emails.send({
        from: "Your Name <onboarding@resend.dev>",
        to: ["tedenadane@gmail.com"],
        subject: `[Portfolio Contact] ${subject}`,
        text: `From: ${email}\n\n${body}`,
        replyTo: email,
      });

      if (error) {
        throw error;
      }

      return data;
    },
  }),
};
