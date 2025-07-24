import { Octokit } from "octokit";

// Define the shape of the repository data we care about for type safety.
export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
}

// Initialize Octokit with our secure API token.
const octokit = new Octokit({
  auth: import.meta.env.GITHUB_TOKEN,
});

/**
 * Fetches and returns a list of your public repositories.
 */
export async function getRepos(): Promise<Repo[]> {
  try {
    const response = await octokit.rest.repos.listForUser({
      username: "temesgen-982",
      type: "owner",
      sort: "pushed",
      per_page: 100,
    });

    const repos = response.data
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,

        // THE FIX: Provide default values for optional properties.
        stargazers_count: repo.stargazers_count ?? 0,
        language: repo.language ?? "N/A",
        topics: repo.topics || [], // Using || is also fine here
        pushed_at: repo.pushed_at ?? new Date().toISOString(),
      }));

    // Now, the `repos` array is guaranteed to match the `Repo[]` type.
    return repos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
