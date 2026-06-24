# Sycord Hosting - Dokploy Integration

This project uses Dokploy for container deployment and management.

## Environment Variables
- `DOKPLOY_URL` - Dokploy API base URL (default: `http://localhost:3000`)
- `DOKPLOY_API_KEY` - Dokploy API key for authentication (generate at `/settings/profile` in Dokploy UI)

## Deployment Pipeline
1. Project is created in Dokploy
2. Environment is created under the project
3. Application is created and linked to the environment
4. GitHub provider is configured with repo, owner, and branch
5. Build type is set (nixpacks by default)
6. Custom domain with Let's Encrypt SSL is optionally added
7. Initial deployment is triggered

## Available / Commands
- `/debug` - Check Dokploy API health
- `/deploy` - Full deployment pipeline
- `/project` - Manage projects
- `/docker` - Manage Docker containers

## API Endpoints
- `GET /api/debug` - Health check
- `POST /api/deploy` - Deployment operations
