import { dokployGet, dokployPost } from "./client";

export interface DokployContainer {
  containerId: string;
  name: string;
  image: string;
  state: string;
  status: string;
  ports: string;
  created: string;
}

export async function dockerGetContainers(serverId?: string): Promise<DokployContainer[]> {
  const res = await dokployGet<DokployContainer[]>("docker.getContainers", serverId ? { serverId } : undefined);
  if (!res.ok) throw new Error(res.error?.message || "Failed to get Docker containers");
  return res.data || [];
}

export async function dockerRestartContainer(params: {
  containerId: string;
  serverId?: string;
}): Promise<void> {
  const res = await dokployPost("docker.restartContainer", {
    containerId: params.containerId,
    serverId: params.serverId || null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to restart container");
}

export async function dockerGetConfig(params: {
  containerId: string;
  serverId?: string;
}): Promise<unknown> {
  const res = await dokployGet("docker.getConfig", {
    containerId: params.containerId,
    serverId: params.serverId || "",
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to get container config");
  return res.data;
}

export async function dockerGetContainersByAppName(params: {
  appName: string;
  appType?: "stack" | "docker-compose";
  serverId?: string;
}): Promise<DokployContainer[]> {
  const res = await dokployGet<DokployContainer[]>("docker.getContainersByAppNameMatch", {
    appName: params.appName,
    appType: params.appType || "",
    serverId: params.serverId || "",
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to get containers by app name");
  return res.data || [];
}
