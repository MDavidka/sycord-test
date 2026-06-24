import { dokployRequest, DokployResponse } from "./client";

export type BuildType = "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
export type TriggerType = "push" | "tag";

export interface DokployApplication {
  applicationId: string;
  name: string;
  appName?: string;
  description?: string | null;
  environmentId: string;
  serverId?: string | null;
  buildType?: string;
  dockerfile?: string | null;
  repository?: string | null;
  owner?: string | null;
  branch?: string;
  applicationStatus?: string;
  createdAt?: string;
}

export async function applicationCreate(params: {
  name: string;
  environmentId: string;
  appName?: string;
  description?: string | null;
  serverId?: string | null;
}): Promise<DokployResponse<DokployApplication>> {
  return dokployRequest<DokployApplication>("POST", "/application.create", params);
}

export async function applicationOne(applicationId: string): Promise<DokployResponse<DokployApplication>> {
  return dokployRequest<DokployApplication>("GET", "/application.one", undefined, { applicationId });
}

export async function applicationDeploy(params: {
  applicationId: string;
  title?: string;
  description?: string;
}): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.redeploy", params);
}

export async function applicationStart(applicationId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.start", { applicationId });
}

export async function applicationStop(applicationId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.stop", { applicationId });
}

export async function applicationDelete(applicationId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.delete", { applicationId });
}

export async function applicationReload(params: {
  appName: string;
  applicationId: string;
}): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.reload", params);
}

export async function applicationSaveEnvironment(params: {
  applicationId: string;
  env: string | null;
  buildArgs: string | null;
  buildSecrets: string | null;
  createEnvFile: boolean;
}): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.saveEnvironment", params);
}

export async function applicationSaveBuildType(params: {
  applicationId: string;
  buildType: BuildType;
  dockerfile?: string | null;
  dockerContextPath?: string | null;
  dockerBuildStage?: string | null;
  herokuVersion?: string | null;
  railpackVersion?: string | null;
  publishDirectory?: string | null;
  isStaticSpa?: boolean | null;
}): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.saveBuildType", params);
}

export async function applicationSaveGithubProvider(params: {
  applicationId: string;
  repository: string | null;
  owner: string | null;
  buildPath: string | null;
  githubId: string | null;
  branch: string;
  triggerType?: TriggerType;
  enableSubmodules?: boolean;
  watchPaths?: string[] | null;
}): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.saveGithubProvider", params);
}

export async function applicationSaveGitProvider(params: {
  applicationId: string;
  customGitBuildPath: string | null;
  customGitUrl: string | null;
  watchPaths: string[] | null;
  customGitBranch: string;
  customGitSSHKeyId?: string | null;
  enableSubmodules?: boolean;
}): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.saveGitProvider", params);
}

export async function applicationSaveDockerProvider(params: {
  dockerImage: string | null;
  applicationId: string;
  username: string | null;
  password: string | null;
  registryUrl: string | null;
}): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.saveDockerProvider", params);
}

export async function applicationDisconnectGitProvider(applicationId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.disconnectGitProvider", { applicationId });
}

export async function applicationMarkRunning(applicationId: string): Promise<DokployResponse> {
  return dokployRequest("POST", "/application.markRunning", { applicationId });
}
