# Dokploy Docker

Manage Docker containers via Dokploy.

## Actions

### list
```
/docker list [--serverId <id>]
```
Lists all containers on a server.

### restart
```
/docker restart <containerId> [--serverId <id>]
```
Restarts a container.

### start
```
/docker start <containerId> [--serverId <id>]
```
Starts a stopped container.

### stop
```
/docker stop <containerId> [--serverId <id>]
```
Stops a running container.

### remove
```
/docker remove <containerId> [--serverId <id>]
```
Removes a container.

### upload
```
/docker upload <containerId> <filePath> <destinationPath> [--serverId <id>]
```
Uploads a file into a running container.

### config
```
/docker config <containerId> [--serverId <id>]
```
Gets the configuration of a container.

## Endpoint
Uses `lib/dokploy/docker.ts` functions directly.
