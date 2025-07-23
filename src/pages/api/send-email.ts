import type { APIRoute } from "astro";

// This is a serverless function that runs on the server
export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();

    // --- Server-Side Validation ---
    // NEVER trust the client. Always re-validate on the server.
    const { email, subject, body } = data;
    if (!email || !subject || !body) {
      return new Response(
        JSON.stringify({ message: "Missing required fields." }),
        { status: 400 }
      );
    }

    console.log("Received data:", data);

    // --- Email Sending Logic ---
    // In a real project, you would use a service like Resend, SendGrid, or Mailgun.
    // You would use your secret API key here, which is safe because this code
    // never runs in the browser.
    // Example using Resend:
    // const resend = new Resend(import.meta.env.RESEND_API_KEY);
    // await resend.emails.send({ ... });

    // For this example, we'll just pretend it was successful after a short delay.
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // --- Return a success response ---
    return new Response(
      JSON.stringify({ message: "Your message has been sent successfully!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Something went wrong." }), {
      status: 500,
    });
  }
};
