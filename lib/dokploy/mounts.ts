import { dokployRequest, DokployResponse } from "./client";

export type MountType = "bind" | "volume" | "file";
export type ServiceType = "application" | "postgres" | "mysql" | "mariadb" | "mongo" | "redis" | "compose" | "libsql";

export interface DokployMount {
  mountId: string;
  type: MountType;
  hostPath?: string | null;
  volumeName?: string | null;
  mountPath: string;
  content?: string | null;
  filePath?: string | null;
  serviceType: ServiceType;
  serviceId: string;
  createdAt?: string;
}

export async function mountsCreate(params: {
  type: MountType;
  hostPath?: string | null;
  volumeName?: string | null;
  content?: string | null;
  mountPath: string;
  filePath?: string | null;
  serviceType: ServiceType;
  serviceId: string;
}): Promise<DokployResponse<DokployMount>> {
  return dokployRequest<DokployMount>("POST", "/mounts.create", params);
}

export async function mountsRemove(mountId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/mounts.remove", { mountId });
}

export async function mountsOne(mountId: string): Promise<DokployResponse<DokployMount>> {
  return dokployRequest<DokployMount>("GET", "/mounts.one", undefined, { mountId });
}

export async function mountsUpdate(params: {
  mountId: string;
  type?: MountType;
  hostPath?: string | null;
  volumeName?: string | null;
  filePath?: string | null;
  content?: string | null;
  mountPath?: string;
  serviceType?: ServiceType;
}): Promise<DokployResponse<DokployMount>> {
  return dokployRequest<DokployMount>("POST", "/mounts.update", params);
}

export async function mountsAllNamedByApplicationId(applicationId: string): Promise<DokployResponse<DokployMount[]>> {
  return dokployRequest<DokployMount[]>("GET", "/mounts.allNamedByApplicationId", undefined, { applicationId });
}

export async function mountsListByServiceId(serviceType: string, serviceId: string): Promise<DokployResponse<DokployMount[]>> {
  return dokployRequest<DokployMount[]>("GET", "/mounts.listByServiceId", undefined, { serviceType, serviceId });
}
