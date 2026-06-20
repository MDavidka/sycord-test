import { NextRequest, NextResponse } from "next/server";
import {
  projectAll,
  projectOne,
  projectCreate,
  projectUpdate,
  projectRemove,
  environmentCreate,
  environmentOne,
  environmentByProjectId,
  environmentRemove,
  environmentUpdate,
  applicationCreate,
  applicationOne,
  applicationDelete,
  applicationStart,
  applicationStop,
  applicationRedeploy,
  applicationReload,
  applicationSaveEnvironment,
  applicationSaveBuildType,
  applicationSaveGithubProvider,
  applicationSaveDockerProvider,
  applicationSaveGitProvider,
  applicationMarkRunning,
  deploymentAll,
  deploymentKillProcess,
  dockerGetContainers,
  dockerRestartContainer,
  dockerGetConfig,
  dockerGetContainersByAppName,
  githubGetRepositories,
  githubGetBranches,
} from "@/lib/dokploy";

export const dynamic = "force-dynamic";

const handlerMap: Record<string, (params: Record<string, unknown>) => Promise<unknown>> = {
  "project.all": async () => projectAll(),
  "project.one": async (p) => projectOne(p.projectId as string),
  "project.create": async (p) => projectCreate(p as { name: string; description?: string; env?: string }),
  "project.update": async (p) => projectUpdate(p as { projectId: string; name?: string; description?: string; env?: string }),
  "project.remove": async (p) => { await projectRemove(p.projectId as string); return { removed: true }; },

  "environment.create": async (p) => environmentCreate(p as { name: string; description?: string; projectId: string }),
  "environment.one": async (p) => environmentOne(p.environmentId as string),
  "environment.byProjectId": async (p) => environmentByProjectId(p.projectId as string),
  "environment.remove": async (p) => { await environmentRemove(p.environmentId as string); return { removed: true }; },
  "environment.update": async (p) => environmentUpdate(p as { environmentId: string; name?: string; description?: string; projectId?: string; env?: string }),

  "application.create": async (p) => applicationCreate(p as { name: string; appName?: string; description?: string; environmentId: string; serverId?: string }),
  "application.one": async (p) => applicationOne(p.applicationId as string),
  "application.delete": async (p) => { await applicationDelete(p.applicationId as string); return { deleted: true }; },
  "application.start": async (p) => { await applicationStart(p.applicationId as string); return { started: true }; },
  "application.stop": async (p) => { await applicationStop(p.applicationId as string); return { stopped: true }; },
  "application.redeploy": async (p) => { await applicationRedeploy(p as { applicationId: string; title?: string; description?: string }); return { redeploying: true }; },
  "application.reload": async (p) => { await applicationReload(p as { appName: string; applicationId: string }); return { reloaded: true }; },
  "application.saveEnvironment": async (p) => { await applicationSaveEnvironment(p as { applicationId: string; env: string; buildArgs?: string; buildSecrets?: string; createEnvFile?: boolean }); return { saved: true }; },
  "application.saveBuildType": async (p) => { await applicationSaveBuildType(p as { applicationId: string; buildType: "dockerfile" | "heroku_buildpacks" | "paketo_buildpacks" | "nixpacks" | "static" | "railpack"; dockerfile?: string; dockerContextPath?: string; dockerBuildStage?: string }); return { saved: true }; },
  "application.saveGithubProvider": async (p) => { await applicationSaveGithubProvider(p as { applicationId: string; repository: string; owner: string; branch: string; buildPath?: string; githubId?: string; triggerType?: "push" | "tag" }); return { saved: true }; },
  "application.saveDockerProvider": async (p) => { await applicationSaveDockerProvider(p as { applicationId: string; dockerImage: string; username?: string; password?: string; registryUrl?: string }); return { saved: true }; },
  "application.saveGitProvider": async (p) => { await applicationSaveGitProvider(p as { applicationId: string; customGitUrl: string; customGitBranch: string; customGitBuildPath?: string; customGitSSHKeyId?: string; watchPaths?: string[]; enableSubmodules?: boolean }); return { saved: true }; },
  "application.markRunning": async (p) => { await applicationMarkRunning(p.applicationId as string); return { marked: true }; },

  "deployment.all": async (p) => deploymentAll(p.applicationId as string),
  "deployment.killProcess": async (p) => { await deploymentKillProcess(p.deploymentId as string); return { killed: true }; },

  "docker.getContainers": async (p) => dockerGetContainers(p.serverId as string | undefined),
  "docker.restartContainer": async (p) => { await dockerRestartContainer(p as { containerId: string; serverId?: string }); return { restarted: true }; },
  "docker.getConfig": async (p) => dockerGetConfig(p as { containerId: string; serverId?: string }),
  "docker.getContainersByAppName": async (p) => dockerGetContainersByAppName(p as { appName: string; appType?: "stack" | "docker-compose"; serverId?: string }),

  "github.getRepositories": async (p) => githubGetRepositories(p.githubId as string),
  "github.getBranches": async (p) => githubGetBranches(p as { repo: string; owner: string; githubId?: string }),
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, params } = body as { action: string; params?: Record<string, unknown> };

    if (!action) {
      return NextResponse.json({ error: "Missing 'action' field" }, { status: 400 });
    }

    const handler = handlerMap[action];
    if (!handler) {
      return NextResponse.json({
        error: `Unknown action: ${action}`,
        availableActions: Object.keys(handlerMap),
      }, { status: 400 });
    }

    const result = await handler(params || {});
    return NextResponse.json({ ok: true, data: result });
  } catch (err) {
    return NextResponse.json({
      ok: false,
      error: err instanceof Error ? err.message : "Internal server error",
    }, { status: 500 });
  }
}
