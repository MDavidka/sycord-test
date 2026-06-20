import { NextRequest, NextResponse } from "next/server";
import {
  projectCreate,
  projectOne,
  projectAll,
  environmentCreate,
  environmentByProjectId,
  applicationCreate,
  applicationSaveGithubProvider,
  applicationSaveBuildType,
  applicationSaveEnvironment,
  applicationDeploy,
  domainCreate,
  domainByApplicationId,
} from "@/lib/dokploy";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, ...params } = body;

    switch (action) {
      case "deploy": {
        const { name, githubOwner, githubRepo, githubBranch, domain } = params;

        const project = await projectCreate({ name, description: `Project: ${name}` });
        if (!project.ok) {
          return NextResponse.json({ success: false, error: project.error, step: "project.create" }, { status: project.status });
        }

        const env = await environmentCreate({
          name: "production",
          projectId: project.data!.projectId,
        });
        if (!env.ok) {
          return NextResponse.json({ success: false, error: env.error, step: "environment.create" }, { status: env.status });
        }

        const appName = name.toLowerCase().replace(/[^a-z0-9._-]/g, "-");
        const app = await applicationCreate({
          name,
          appName,
          environmentId: env.data!.environmentId,
        });
        if (!app.ok) {
          return NextResponse.json({ success: false, error: app.error, step: "application.create" }, { status: app.status });
        }

        await applicationSaveBuildType({
          applicationId: app.data!.applicationId,
          buildType: "nixpacks",
          publishDirectory: ".next",
        });

        await applicationSaveEnvironment({
          applicationId: app.data!.applicationId,
          env: null,
          buildArgs: null,
          buildSecrets: null,
          createEnvFile: true,
        });

        const provider = await applicationSaveGithubProvider({
          applicationId: app.data!.applicationId,
          repository: githubRepo,
          owner: githubOwner,
          buildPath: "/",
          githubId: null,
          branch: githubBranch || "main",
        });
        if (!provider.ok) {
          return NextResponse.json({ success: false, error: provider.error, step: "application.saveGithubProvider" }, { status: provider.status });
        }

        if (domain) {
          await domainCreate({
            host: domain,
            https: true,
            applicationId: app.data!.applicationId,
            certificateType: "letsencrypt",
          });
        }

        const deploy = await applicationDeploy({ applicationId: app.data!.applicationId });
        if (!deploy.ok) {
          return NextResponse.json({ success: false, error: deploy.error, step: "application.redeploy" }, { status: deploy.status });
        }

        return NextResponse.json({
          success: true,
          project: project.data,
          application: app.data,
          deploymentTriggered: true,
        });
      }

      case "listProjects": {
        const result = await projectAll();
        return NextResponse.json({ success: result.ok, data: result.data, error: result.error });
      }

      case "getProject": {
        const result = await projectOne(params.projectId);
        return NextResponse.json({ success: result.ok, data: result.data, error: result.error });
      }

      case "listEnvironments": {
        const result = await environmentByProjectId(params.projectId);
        return NextResponse.json({ success: result.ok, data: result.data, error: result.error });
      }

      case "redeploy": {
        const deploy = await applicationDeploy({
          applicationId: params.applicationId,
          title: params.title,
          description: params.description,
        });
        return NextResponse.json({ success: deploy.ok, error: deploy.error });
      }

      case "addDomain": {
        const result = await domainCreate({
          host: params.host,
          https: true,
          applicationId: params.applicationId,
          certificateType: "letsencrypt",
        });
        return NextResponse.json({ success: result.ok, data: result.data, error: result.error });
      }

      case "listDomains": {
        const result = await domainByApplicationId(params.applicationId);
        return NextResponse.json({ success: result.ok, data: result.data, error: result.error });
      }

      default:
        return NextResponse.json({ success: false, error: { message: `Unknown action: ${action}` } }, { status: 400 });
    }
  } catch (err) {
    return NextResponse.json(
      { success: false, error: { message: err instanceof Error ? err.message : "Internal error" } },
      { status: 500 }
    );
  }
}
