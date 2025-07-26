import { Octokit } from "octokit";

export interface LanguageStats {
  [language: string]: number; // percentage from 0 to 100
}

export interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  languagePercentages?: LanguageStats;
  topics: string[];
  pushed_at: string;
  homepage?: string; // ← add this
}

const octokit = new Octokit({
  auth: import.meta.env.GITHUB_TOKEN,
});

/**
 * Parses a .gitmodules content string and returns an array of GitHub repo URLs
 */
function parseSubmoduleUrls(content: string): string[] {
  return [...content.matchAll(/url = (.+)/g)].map((m) => m[1].trim());
}

/**
 * Extracts the owner and repo name from a GitHub URL
 */
function extractOwnerRepo(url: string): { owner: string; repo: string } | null {
  const match = url.match(/github\.com[:/](.+?)\/(.+?)(?:\.git)?$/);
  if (!match) return null;
  return { owner: match[1], repo: match[2] };
}

/**
 * Helper function to format repo names: "a-b-c" to "A B C"
 */
function formatRepoName(name: string): string {
  return name
    .split("-") // Split by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join with spaces
}

/**
 * Fetches metadata for a single repo and normalizes it
 */
async function fetchAndFormatRepo(
  owner: string,
  repo: string
): Promise<Repo | null> {
  try {
    const { data } = await octokit.rest.repos.get({ owner, repo });

    // Fetch languages breakdown
    const langData = await octokit.rest.repos.listLanguages({ owner, repo });

    const totalBytes = Object.values(langData.data).reduce(
      (sum, bytes) => sum + bytes,
      0
    );

    // Calculate percentages
    const languagePercentages: LanguageStats = {};
    if (totalBytes > 0) {
      for (const [lang, bytes] of Object.entries(langData.data)) {
        languagePercentages[lang] = +((bytes / totalBytes) * 100).toFixed(2);
      }
    }

    return {
      id: data.id,
      name: formatRepoName(data.name),
      description: data.description,
      html_url: data.html_url,
      stargazers_count: data.stargazers_count ?? 0,
      language: data.language ?? "N/A",
      languagePercentages,
      topics: data.topics || [],
      pushed_at: data.pushed_at ?? new Date().toISOString(),
      homepage: data.homepage || undefined, // ← this line adds the live site
    };
  } catch (error) {
    console.warn(`Failed to fetch repo ${owner}/${repo}:`, error);
    return null;
  }
}

/**
 * Fetches your public top-level repos and submodules, excluding duplicates
 */
export async function getRepos(): Promise<Repo[]> {
  const seen = new Set<string>(); // Tracks repos by "owner/name"
  const submoduleNames = new Set<string>(); // Repos listed as submodules
  const result: Repo[] = [];

  try {
    // Step 1: Fetch all your public non-fork repos
    const { data: userRepos } = await octokit.rest.repos.listForUser({
      username: "temesgen-982",
      type: "owner",
      sort: "pushed",
      per_page: 100,
    });

    // Step 2: Look through each repo to check for .gitmodules
    for (const repo of userRepos) {
      if (repo.fork) continue;

      const repoKey = `${repo.owner.login}/${repo.name}`;
      seen.add(repoKey); // Always add to seen, whether we show it or not

      try {
        const file = await octokit.rest.repos.getContent({
          owner: repo.owner.login,
          repo: repo.name,
          path: ".gitmodules",
        });

        const content = Buffer.from(
          (file.data as any).content,
          "base64"
        ).toString("utf-8");
        const urls = parseSubmoduleUrls(content);

        for (const url of urls) {
          const parsed = extractOwnerRepo(url);
          if (!parsed) continue;

          const key = `${parsed.owner}/${parsed.repo}`;
          submoduleNames.add(key); // mark this repo as a submodule
        }
      } catch {
        // No .gitmodules file — skip
      }
    }

    // Step 3: Add your own repos that are NOT submodules
    for (const repo of userRepos) {
      const key = `${repo.owner.login}/${repo.name}`;
      if (
        !submoduleNames.has(key) &&
        !repo.fork &&
        repo.name !== "temesgen-982" // exclude profile README repo
      ) {
        const formatted = await fetchAndFormatRepo(repo.owner.login, repo.name);
        if (formatted) result.push(formatted);
      }
    }

    // Step 4: Fetch submodule repos (if not already seen)
    for (const key of submoduleNames) {
      if (seen.has(key)) continue;

      const [owner, repo] = key.split("/");
      const submoduleRepo = await fetchAndFormatRepo(owner, repo);
      if (submoduleRepo) {
        result.push(submoduleRepo);
        seen.add(key);
      }
    }

    return result;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return [];
  }
}
