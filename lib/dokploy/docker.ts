import { dokployRequest, DokployResponse } from "./client";

export interface DokployContainer {
  containerId: string;
  name?: string;
  image?: string;
  state?: string;
  status?: string;
  ports?: unknown[];
  created?: string;
}

export async function dockerGetContainers(serverId?: string): Promise<DokployResponse<DokployContainer[]>> {
  return dokployRequest<DokployContainer[]>("GET", "/docker.getContainers", undefined, serverId ? { serverId } : undefined);
}

export async function dockerRestartContainer(containerId: string, serverId?: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/docker.restartContainer", { containerId, serverId });
}

export async function dockerStartContainer(containerId: string, serverId?: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/docker.startContainer", { containerId, serverId });
}

export async function dockerStopContainer(containerId: string, serverId?: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/docker.stopContainer", { containerId, serverId });
}

export async function dockerKillContainer(containerId: string, serverId?: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/docker.killContainer", { containerId, serverId });
}

export async function dockerRemoveContainer(containerId: string, serverId?: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/docker.removeContainer", { containerId, serverId });
}

export async function dockerGetConfig(containerId: string, serverId?: string): Promise<DokployResponse> {
  return dokployRequest("GET", "/docker.getConfig", undefined, { containerId, ...(serverId ? { serverId } : {}) } as Record<string, string>);
}

export async function dockerGetContainersByAppNameMatch(
  appName: string,
  appType?: "stack" | "docker-compose",
  serverId?: string
): Promise<DokployResponse<DokployContainer[]>> {
  const query: Record<string, string> = { appName };
  if (appType) query.appType = appType;
  if (serverId) query.serverId = serverId;
  return dokployRequest<DokployContainer[]>("GET", "/docker.getContainersByAppNameMatch", undefined, query);
}

export async function dockerGetContainersByAppLabel(
  appName: string,
  type: "standalone" | "swarm",
  serverId?: string
): Promise<DokployResponse<DokployContainer[]>> {
  const query: Record<string, string> = { appName, type };
  if (serverId) query.serverId = serverId;
  return dokployRequest<DokployContainer[]>("GET", "/docker.getContainersByAppLabel", undefined, query);
}

export async function dockerUploadFileToContainer(params: {
  containerId: string;
  file: File;
  destinationPath: string;
  serverId?: string;
}): Promise<DokployResponse> {
  const formData = new FormData();
  formData.append("containerId", params.containerId);
  formData.append("file", params.file);
  formData.append("destinationPath", params.destinationPath);
  if (params.serverId) formData.append("serverId", params.serverId);
  return dokployRequest("POST", "/docker.uploadFileToContainer", undefined, undefined, formData);
}
