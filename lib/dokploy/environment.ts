import { dokployGet, dokployPost } from "./client";

export interface DokployEnvironment {
  environmentId: string;
  name: string;
  description: string;
  projectId: string;
  env?: string;
  createdAt: string;
}

export async function environmentCreate(params: {
  name: string;
  description?: string;
  projectId: string;
}): Promise<DokployEnvironment> {
  const res = await dokployPost<DokployEnvironment>("environment.create", {
    name: params.name,
    description: params.description || null,
    projectId: params.projectId,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to create environment");
  return res.data!;
}

export async function environmentOne(environmentId: string): Promise<DokployEnvironment> {
  const res = await dokployGet<DokployEnvironment>("environment.one", { environmentId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to get environment");
  return res.data!;
}

export async function environmentByProjectId(projectId: string): Promise<DokployEnvironment[]> {
  const res = await dokployGet<DokployEnvironment[]>("environment.byProjectId", { projectId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to list environments");
  return res.data || [];
}

export async function environmentRemove(environmentId: string): Promise<void> {
  const res = await dokployPost("environment.remove", { environmentId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to remove environment");
}

export async function environmentUpdate(params: {
  environmentId: string;
  name?: string;
  description?: string;
  projectId?: string;
  env?: string;
}): Promise<DokployEnvironment> {
  const res = await dokployPost<DokployEnvironment>("environment.update", {
    environmentId: params.environmentId,
    name: params.name,
    description: params.description || null,
    projectId: params.projectId,
    env: params.env || null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to update environment");
  return res.data!;
}
