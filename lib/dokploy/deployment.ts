import { dokployRequest, DokployResponse } from "./client";

export interface DokployDeployment {
  deploymentId: string;
  title?: string;
  description?: string;
  applicationId?: string;
  composeId?: string;
  serverId?: string;
  status?: string;
  logPath?: string;
  createdAt?: string;
  finishedAt?: string;
}

export async function deploymentAll(applicationId: string): Promise<DokployResponse<DokployDeployment[]>> {
  return dokployRequest<DokployDeployment[]>("GET", "/deployment.all", undefined, { applicationId });
}

export async function deploymentAllByServer(serverId: string): Promise<DokployResponse<DokployDeployment[]>> {
  return dokployRequest<DokployDeployment[]>("GET", "/deployment.allByServer", undefined, { serverId });
}

export async function deploymentAllCentralized(): Promise<DokployResponse<DokployDeployment[]>> {
  return dokployRequest<DokployDeployment[]>("GET", "/deployment.allCentralized");
}

export async function deploymentQueueList(): Promise<DokployResponse<DokployDeployment[]>> {
  return dokployRequest<DokployDeployment[]>("GET", "/deployment.queueList");
}

export async function deploymentByType(
  id: string,
  type: "application" | "compose" | "server" | "schedule" | "previewDeployment" | "backup" | "volumeBackup"
): Promise<DokployResponse<DokployDeployment[]>> {
  return dokployRequest<DokployDeployment[]>("GET", "/deployment.allByType", undefined, { id, type });
}

export async function deploymentReadLogs(
  deploymentId: string,
  tail?: number
): Promise<DokployResponse<{ logs: string }>> {
  return dokployRequest<{ logs: string }>("GET", "/deployment.readLogs", undefined, {
    deploymentId,
    tail: tail != null ? String(tail) : undefined,
  } as Record<string, string>);
}

export async function deploymentKillProcess(deploymentId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/deployment.killProcess", { deploymentId });
}

export async function deploymentRemove(deploymentId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/deployment.removeDeployment", { deploymentId });
}
