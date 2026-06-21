import { NextRequest, NextResponse } from "next/server";
import { DockerManager } from "@/lib/docker-manager";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, cpuLimit, memoryLimit } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Project name is required" },
        { status: 400 }
      );
    }

    // Programmatically provision the container workspace
    const connection = await DockerManager.createWorkspace({
      projectName: name,
      cpuLimit: cpuLimit ? parseInt(cpuLimit, 10) : 2,
      memoryLimit: memoryLimit || "2g",
    });

    // Return connection credentials as JSON
    return NextResponse.json(connection);

  } catch (error: any) {
    console.error("❌ API Error creating project workspace:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
