import { dokployRequest, DokployResponse } from "./client";

export interface DokployProject {
  projectId: string;
  name: string;
  description?: string | null;
  createdAt?: string;
  adminId?: string;
  applications?: unknown[];
  mariadb?: unknown[];
  mongo?: unknown[];
  mysql?: unknown[];
  postgres?: unknown[];
  redis?: unknown[];
  compose?: unknown[];
  env?: string;
}

export async function projectCreate(params: {
  name: string;
  description?: string | null;
  env?: string;
}): Promise<DokployResponse<DokployProject>> {
  return dokployRequest<DokployProject>("POST", "/project.create", params);
}

export async function projectOne(projectId: string): Promise<DokployResponse<DokployProject>> {
  return dokployRequest<DokployProject>("GET", "/project.one", undefined, { projectId });
}

export async function projectAll(): Promise<DokployResponse<DokployProject[]>> {
  return dokployRequest<DokployProject[]>("GET", "/project.all");
}

export async function projectRemove(projectId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/project.remove", { projectId });
}

export async function projectUpdate(params: {
  projectId: string;
  name?: string;
  description?: string | null;
  env?: string;
}): Promise<DokployResponse<DokployProject>> {
  return dokployRequest<DokployProject>("POST", "/project.update", params);
}

export async function projectDuplicate(params: {
  sourceEnvironmentId: string;
  name: string;
  description?: string;
  includeServices?: boolean;
  duplicateInSameProject?: boolean;
}): Promise<DokployResponse<DokployProject>> {
  return dokployRequest<DokployProject>("POST", "/project.duplicate", params);
}
