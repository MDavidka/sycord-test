import { dokployRequest, DokployResponse } from "./client";

export interface DokployEnvironment {
  environmentId: string;
  name: string;
  description?: string | null;
  projectId: string;
  createdAt?: string;
  env?: string;
}

export async function environmentCreate(params: {
  name: string;
  description?: string;
  projectId: string;
}): Promise<DokployResponse<DokployEnvironment>> {
  return dokployRequest<DokployEnvironment>("POST", "/environment.create", params);
}

export async function environmentOne(environmentId: string): Promise<DokployResponse<DokployEnvironment>> {
  return dokployRequest<DokployEnvironment>("GET", "/environment.one", undefined, { environmentId });
}

export async function environmentByProjectId(projectId: string): Promise<DokployResponse<DokployEnvironment[]>> {
  return dokployRequest<DokployEnvironment[]>("GET", "/environment.byProjectId", undefined, { projectId });
}

export async function environmentRemove(environmentId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/environment.remove", { environmentId });
}

export async function environmentUpdate(params: {
  environmentId: string;
  name?: string;
  description?: string;
  env?: string;
}): Promise<DokployResponse<DokployEnvironment>> {
  return dokployRequest<DokployEnvironment>("POST", "/environment.update", params);
}
