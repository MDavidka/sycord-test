import { dokployGet } from "./client";

export interface DokployGithubRepo {
  name: string;
  owner: string;
  url: string;
  defaultBranch: string;
  private: boolean;
}

export async function githubGetRepositories(githubId: string): Promise<DokployGithubRepo[]> {
  const res = await dokployGet<DokployGithubRepo[]>("github.getGithubRepositories", { githubId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to get GitHub repositories");
  return res.data || [];
}

export async function githubGetBranches(params: {
  repo: string;
  owner: string;
  githubId?: string;
}): Promise<string[]> {
  const res = await dokployGet<string[]>("github.getGithubBranches", {
    repo: params.repo,
    owner: params.owner,
    githubId: params.githubId || "",
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to get GitHub branches");
  return res.data || [];
}
