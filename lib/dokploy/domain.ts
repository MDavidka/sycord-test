import { dokployRequest, DokployResponse } from "./client";

export type CertificateType = "letsencrypt" | "none" | "custom";

export interface DokployDomain {
  domainId: string;
  host: string;
  path?: string | null;
  port?: number | null;
  https?: boolean;
  certificateType?: string;
  applicationId?: string | null;
  composeId?: string | null;
  serviceName?: string | null;
  createdAt?: string;
}

export async function domainCreate(params: {
  host: string;
  path?: string | null;
  port?: number | null;
  https?: boolean;
  applicationId?: string | null;
  certificateType?: CertificateType;
  composeId?: string | null;
  serviceName?: string | null;
  internalPath?: string | null;
  stripPath?: boolean;
  middlewares?: string[] | null;
  forwardAuthEnabled?: boolean;
}): Promise<DokployResponse<DokployDomain>> {
  return dokployRequest<DokployDomain>("POST", "/domain.create", params);
}

export async function domainByApplicationId(applicationId: string): Promise<DokployResponse<DokployDomain[]>> {
  return dokployRequest<DokployDomain[]>("GET", "/domain.byApplicationId", undefined, { applicationId });
}

export async function domainOne(domainId: string): Promise<DokployResponse<DokployDomain>> {
  return dokployRequest<DokployDomain>("GET", "/domain.one", undefined, { domainId });
}

export async function domainUpdate(params: {
  host: string;
  domainId: string;
  path?: string | null;
  port?: number | null;
  https?: boolean;
  certificateType?: CertificateType;
  serviceName?: string | null;
  internalPath?: string | null;
  stripPath?: boolean;
  middlewares?: string[] | null;
  forwardAuthEnabled?: boolean;
}): Promise<DokployResponse<DokployDomain>> {
  return dokployRequest<DokployDomain>("POST", "/domain.update", params);
}

export async function domainDelete(domainId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/domain.delete", { domainId });
}

export async function domainGenerateDomain(appName: string, serverId?: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/domain.generateDomain", { appName, serverId });
}

export async function domainValidateDomain(domain: string, serverIp?: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/domain.validateDomain", { domain, serverIp });
}
