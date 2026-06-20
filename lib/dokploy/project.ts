import { dokployGet, dokployPost } from "./client";

export interface DokployProject {
  projectId: string;
  name: string;
  description: string;
  createdAt: string;
  adminId: string;
  env?: string;
  applications: unknown[];
  mariadb: unknown[];
  mongo: unknown[];
  mysql: unknown[];
  postgres: unknown[];
  redis: unknown[];
  compose: unknown[];
}

export async function projectAll(): Promise<DokployProject[]> {
  const res = await dokployGet<DokployProject[]>("project.all");
  if (!res.ok) throw new Error(res.error?.message || "Failed to list projects");
  return res.data || [];
}

export async function projectOne(projectId: string): Promise<DokployProject> {
  const res = await dokployGet<DokployProject>("project.one", { projectId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to get project");
  return res.data!;
}

export async function projectCreate(params: {
  name: string;
  description?: string;
  env?: string;
}): Promise<DokployProject> {
  const res = await dokployPost<DokployProject>("project.create", {
    name: params.name,
    description: params.description || null,
    env: params.env || null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to create project");
  return res.data!;
}

export async function projectUpdate(params: {
  projectId: string;
  name?: string;
  description?: string;
  env?: string;
}): Promise<DokployProject> {
  const res = await dokployPost<DokployProject>("project.update", {
    projectId: params.projectId,
    name: params.name,
    description: params.description || null,
    env: params.env || null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to update project");
  return res.data!;
}

export async function projectRemove(projectId: string): Promise<void> {
  const res = await dokployPost("project.remove", { projectId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to remove project");
}
