import { exec } from "child_process";
import { promisify } from "util";
import * as fs from "fs/promises";
import * as path from "path";
import * as crypto from "crypto";

const execAsync = promisify(exec);

interface WorkspaceConfig {
  projectName: string;
  cpuLimit?: number;      // e.g., 2 cores
  memoryLimit?: string;   // e.g., "2g"
}

interface ConnectionDetails {
  status: string;
  containerName: string;
  sshHost: string;
  sshPort: number;
  sshUser: string;
  privateKey: string;
}

export class DockerManager {
  private static KEY_BASE_DIR = "/opt/sycord/keys";
  private static WORKSPACE_BASE_DIR = "/opt/sycord/workspaces";
  private static DEPLOYMENTS_DIR = "/opt/sycord/deployments";

  /**
   * Generates a modern, secure Ed25519 SSH Keypair in memory
   */
  private static generateSSHKeypair(): { publicKey: string; privateKey: string } {
    const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519" as any, {
      privateKeyEncoding: { format: "pem", type: "pkcs8" },
      publicKeyEncoding: { format: "openssh", type: "public" }
    } as any);
    return { publicKey: publicKey as any, privateKey: privateKey as any };
  }

  /**
   * Programmatically provisions and spins up an isolated workspace container
   */
  public static async createWorkspace(config: WorkspaceConfig): Promise<ConnectionDetails> {
    const { projectName, cpuLimit = 2, memoryLimit = "2g" } = config;

    // 1. Sanitize project name for Docker safety
    const containerName = `sycord-${projectName.replace(/[^a-zA-Z0-9]/g, "-")}`.toLowerCase();
    const keyDir = path.join(this.KEY_BASE_DIR, containerName);
    const workspaceDir = path.join(this.WORKSPACE_BASE_DIR, containerName);

    // 2. Ensure directories exist on the host VPS
    await fs.mkdir(keyDir, { recursive: true });
    await fs.mkdir(workspaceDir, { recursive: true });
    await fs.mkdir(this.DEPLOYMENTS_DIR, { recursive: true });

    // 3. Generate SSH Keypair
    const { publicKey, privateKey } = this.generateSSHKeypair();
    await fs.writeFile(path.join(keyDir, "id_ed25519"), privateKey, { mode: 0o600 });
    await fs.writeFile(path.join(keyDir, "id_ed25519.pub"), publicKey, { mode: 0o644 });

    try {
      // 4. Clean up existing container if it exists
      await execAsync(`docker rm -f ${containerName} 2>/dev/null || true`);

      // 5. Programmatically run the Docker container
      // Port '0:22' tells Docker to dynamically assign a free host port to map to container port 22
      const dockerRunCmd = `
        docker run -d \
          --name "${containerName}" \
          --network sycord-net \
          --memory="${memoryLimit}" \
          --cpus="${cpuLimit}" \
          -e "SSH_PUBLIC_KEY=${publicKey}" \
          -e "WORKSPACE_ID=${containerName}" \
          -v "${workspaceDir}:/workspace" \
          -v "${this.DEPLOYMENTS_DIR}:/deployments" \
          -p "0:22" \
          sycord/workspace-base:latest
      `.trim();

      await execAsync(dockerRunCmd);

      // 6. Programmatically query Docker to find the dynamically assigned SSH port on the host
      const { stdout: portOutput } = await execAsync(`docker port ${containerName} 22`);
      const sshPort = parseInt(portOutput.split(":")[1].trim(), 10);

      // 7. Get host VPS IP address
      const { stdout: ipOutput } = await execAsync("hostname -I | awk '{print $1}'");
      const sshHost = ipOutput.trim();

      return {
        status: "success",
        containerName,
        sshHost,
        sshPort,
        sshUser: "sycord",
        privateKey
      };

    } catch (error: any) {
      console.error(`❌ Failed to programmatically provision container ${containerName}:`, error);
      throw new Error(`Docker provisioning failed: ${error.message}`);
    }
  }

  /**
   * Programmatically stops and removes a workspace container
   */
  public static async destroyWorkspace(projectName: string): Promise<void> {
    const containerName = `sycord-${projectName.replace(/[^a-zA-Z0-9]/g, "-")}`.toLowerCase();
    try {
      await execAsync(`docker rm -f ${containerName}`);
      console.log(`✅ Programmatically destroyed container: ${containerName}`);
    } catch (error: any) {
      console.error(`❌ Failed to destroy container ${containerName}:`, error);
    }
  }
}
