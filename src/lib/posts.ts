// 1. Define the shape of our data to match the dev.to API response.
// You can find all available fields in the dev.to API documentation.
export interface DevToPost {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string; // The API returns a string
  cover_image: string | null;
  tag_list: string[];
  public_reactions_count: number;
}

/**
 * Fetches and returns a list of your public posts from dev.to.
 */
export async function getDevToPosts(): Promise<DevToPost[]> {
  const apiKey = import.meta.env.DEV_TO_API_KEY;
  const username = import.meta.env.DEV_TO_USERNAME;

  // Ensure the required environment variables are set.
  if (!apiKey || !username) {
    throw new Error(
      "DEV_TO_API_KEY and DEV_TO_USERNAME must be set in your .env file."
    );
  }

  try {
    const response = await fetch(
      `https://dev.to/api/articles?username=${username}`,
      {
        headers: { "api-key": apiKey },
      }
    );

    if (!response.ok) {
      // Log a more helpful error message
      console.error(
        `Error fetching from dev.to: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const posts: DevToPost[] = await response.json();

    // Sort posts by publication date, newest first.
    posts.sort(
      (a, b) =>
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    );

    return posts;
  } catch (error) {
    console.error("Failed to fetch dev.to posts:", error);
    return []; // Return an empty array on error
  }
}
