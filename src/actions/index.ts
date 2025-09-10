import { defineAction, ActionError } from "astro:actions";
import { z } from "astro/zod";
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

export const actions = {
  contact: defineAction({
    input: contactSchema,
    handler: async ({ email, subject, body, honeypot }) => {
      if (honeypot) {
        throw new ActionError({ code: 'BAD_REQUEST', message: 'Spam detected' });
      }
      try {
        const { error } = await resend.emails.send({
          from: "Your Name <onboarding@resend.dev>",
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
