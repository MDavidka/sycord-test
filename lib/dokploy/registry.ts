import { dokployRequest, DokployResponse } from "./client";

export interface DokployRegistry {
  registryId: string;
  registryName: string;
  username?: string;
  registryUrl?: string;
  registryType: string;
  imagePrefix?: string | null;
}

export async function registryCreate(params: {
  registryName: string;
  username: string;
  password: string;
  registryUrl: string;
  registryType: "cloud";
  imagePrefix?: string | null;
  serverId?: string;
}): Promise<DokployResponse<DokployRegistry>> {
  return dokployRequest<DokployRegistry>("POST", "/registry.create", params);
}

export async function registryRemove(registryId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/registry.remove", { registryId });
}

export async function registryUpdate(params: {
  registryId: string;
  registryName?: string;
  imagePrefix?: string | null;
  username?: string;
  password?: string;
  registryUrl?: string;
}): Promise<DokployResponse<DokployRegistry>> {
  return dokployRequest<DokployRegistry>("POST", "/registry.update", params);
}

export async function registryAll(): Promise<DokployResponse<DokployRegistry[]>> {
  return dokployRequest<DokployRegistry[]>("GET", "/registry.all");
}

export async function registryOne(registryId: string): Promise<DokployResponse<DokployRegistry>> {
  return dokployRequest<DokployRegistry>("GET", "/registry.one", undefined, { registryId });
}
