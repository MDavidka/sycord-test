import { dokployGet, dokployPost } from "./client";

export interface DokployApplication {
  applicationId: string;
  name: string;
  appName: string;
  description: string;
  environmentId: string;
  serverId: string | null;
  buildType: string;
  dockerfile: string | null;
  applicationStatus: "idle" | "running" | "done" | "error";
  createdAt: string;
  repository?: string;
  owner?: string;
  branch?: string;
  buildPath?: string;
}

export async function applicationCreate(params: {
  name: string;
  appName?: string;
  description?: string;
  environmentId: string;
  serverId?: string;
}): Promise<DokployApplication> {
  const res = await dokployPost<DokployApplication>("application.create", {
    name: params.name,
    appName: params.appName || null,
    description: params.description || null,
    environmentId: params.environmentId,
    serverId: params.serverId || null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to create application");
  return res.data!;
}

export async function applicationOne(applicationId: string): Promise<DokployApplication> {
  const res = await dokployGet<DokployApplication>("application.one", { applicationId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to get application");
  return res.data!;
}

export async function applicationDelete(applicationId: string): Promise<void> {
  const res = await dokployPost("application.delete", { applicationId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to delete application");
}

export async function applicationStart(applicationId: string): Promise<void> {
  const res = await dokployPost("application.start", { applicationId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to start application");
}

export async function applicationStop(applicationId: string): Promise<void> {
  const res = await dokployPost("application.stop", { applicationId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to stop application");
}

export async function applicationRedeploy(params: {
  applicationId: string;
  title?: string;
  description?: string;
}): Promise<void> {
  const res = await dokployPost("application.redeploy", {
    applicationId: params.applicationId,
    title: params.title || null,
    description: params.description || null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to redeploy application");
}

export async function applicationReload(params: {
  appName: string;
  applicationId: string;
}): Promise<void> {
  const res = await dokployPost("application.reload", {
    appName: params.appName,
    applicationId: params.applicationId,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to reload application");
}

export async function applicationSaveEnvironment(params: {
  applicationId: string;
  env: string;
  buildArgs?: string;
  buildSecrets?: string;
  createEnvFile?: boolean;
}): Promise<void> {
  const res = await dokployPost("application.saveEnvironment", {
    applicationId: params.applicationId,
    env: params.env,
    buildArgs: params.buildArgs || "",
    buildSecrets: params.buildSecrets || "",
    createEnvFile: params.createEnvFile ?? true,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to save environment");
}

export async function applicationSaveBuildType(params: {
  applicationId: string;
  buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack";
  dockerfile?: string;
  dockerContextPath?: string;
  dockerBuildStage?: string;
  publishDirectory?: string;
}): Promise<void> {
  const res = await dokployPost("application.saveBuildType", {
    applicationId: params.applicationId,
    buildType: params.buildType,
    dockerfile: params.dockerfile || "",
    dockerContextPath: params.dockerContextPath || ".",
    dockerBuildStage: params.dockerBuildStage || "",
    herokuVersion: null,
    railpackVersion: null,
    publishDirectory: params.publishDirectory || null,
    isStaticSpa: null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to save build type");
}

export async function applicationSaveGithubProvider(params: {
  applicationId: string;
  repository: string;
  owner: string;
  branch: string;
  buildPath?: string;
  githubId?: string;
  triggerType?: "push" | "tag";
  watchPaths?: string[];
}): Promise<void> {
  const res = await dokployPost("application.saveGithubProvider", {
    applicationId: params.applicationId,
    repository: params.repository,
    owner: params.owner,
    buildPath: params.buildPath || "/",
    githubId: params.githubId || null,
    branch: params.branch,
    triggerType: params.triggerType || "push",
    enableSubmodules: false,
    watchPaths: params.watchPaths || [],
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to save GitHub provider");
}

export async function applicationSaveDockerProvider(params: {
  applicationId: string;
  dockerImage: string;
  username?: string;
  password?: string;
  registryUrl?: string;
}): Promise<void> {
  const res = await dokployPost("application.saveDockerProvider", {
    applicationId: params.applicationId,
    dockerImage: params.dockerImage,
    username: params.username || null,
    password: params.password || null,
    registryUrl: params.registryUrl || null,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to save Docker provider");
}

export async function applicationSaveGitProvider(params: {
  applicationId: string;
  customGitUrl: string;
  customGitBranch: string;
  customGitBuildPath?: string;
  customGitSSHKeyId?: string;
  watchPaths?: string[];
  enableSubmodules?: boolean;
}): Promise<void> {
  const res = await dokployPost("application.saveGitProvider", {
    applicationId: params.applicationId,
    customGitUrl: params.customGitUrl,
    customGitBranch: params.customGitBranch,
    customGitBuildPath: params.customGitBuildPath || "/",
    customGitSSHKeyId: params.customGitSSHKeyId || null,
    watchPaths: params.watchPaths || null,
    enableSubmodules: params.enableSubmodules || false,
  });
  if (!res.ok) throw new Error(res.error?.message || "Failed to save Git provider");
}

export async function applicationMarkRunning(applicationId: string): Promise<void> {
  const res = await dokployPost("application.markRunning", { applicationId });
  if (!res.ok) throw new Error(res.error?.message || "Failed to mark application as running");
}
