# Dokploy Project

Manage Dokploy projects.

## Actions

### list
```
/project list
```
Fetches all projects from Dokploy.

### create
```
/project create <name> [--description <desc>]
```
Creates a new project in Dokploy.

### get
```
/project get <projectId>
```
Fetches a single project by ID.

### remove
```
/project remove <projectId>
```
Deletes a project and all its resources.

## Endpoint
POST `/api/deploy`
