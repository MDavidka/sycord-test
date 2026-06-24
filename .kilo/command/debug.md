# Dokploy Debug

Check if the Dokploy API is reachable and ready to accept requests.

## Usage
```
/debug
```

## What it does
1. Sends a GET to `/api/project.all` on the Dokploy instance
2. Returns whether the API is reachable and if authentication is configured

## Endpoint
GET `/api/debug`
