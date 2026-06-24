import { dokployGet, dokployPost } from "./client";

export interface DokployDeployment {
  deploymentId: string;
  applicationId: string;
  status: string;
  title: string;
  description: string;
  logPath: string;
  createdAt: string;
}

export async function deploymentAll(applicationId: string): Promise<DokployDeployment[]> {
  const res = await dokployGet<DokployDeployment[]>("deployment.all", { applicationId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to list deployments");
  return res.data || [];
}

export async function deploymentKillProcess(deploymentId: string): Promise<void> {
  const res = await dokployPost("deployment.killProcess", { deploymentId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to kill deployment process");
}
