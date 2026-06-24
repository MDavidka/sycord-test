# Dokploy Deploy

Deploy a project to Dokploy using the full pipeline: create project → create environment → create application → configure GitHub → set build type → deploy.

## Prerequisites
- Dokploy URL configured via `DOKPLOY_URL` env var (default: `http://localhost:3000`)
- Dokploy API key configured via `DOKPLOY_API_KEY` env var

## Usage
```
/deploy <project-name> [--repo <github-repo>] [--owner <github-owner>] [--branch <branch>] [--domain <domain>]
```

## What it does
1. Creates a project in Dokploy
2. Creates a "production" environment under that project
3. Creates an application linked to the environment
4. Configures GitHub provider (repo, owner, branch)
5. Sets build type to nixpacks
6. Optionally adds a custom domain with Let's Encrypt SSL
7. Triggers the initial deployment

## Endpoint
POST `/api/deploy`
