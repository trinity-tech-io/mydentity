# Introduction

This repo contains the front end web app and the related API backend for the **Mydentity**.

This web app aims at helping users easily get a W3C DID and manage it. The app allows custodial DID creation, credentials imports and delivery, discovery of DID related services and more.

# Contents

- The Mydentity web front end (client/ folder)
- The Mydentity api / back end (server/ folder)
- The external test app to test web interactions (tests/ folder)
- The Elastos connectivity SDK connector (connector/ folder)
- The Mydentity SDK (sdk/ folder)
# Tech stack

- Front-end
  - typescript
  - nextjs / react
  - rxjs subjects hooks to connect model with UI (no redux)
  - graphql
- Back-end
  - typescript
  - nestjs
  - prisma
  - postgresql
  - graphql
  - Elastos DID JS SDK

# Setup (main app)

- Setup the [React web app](/client/did-web-service/README.md)
- Setup the [API server](/server/api/README.md)

# HTTPS Setup

In case the app needs to run in local dev environment, for example to test from local mobile devices on a local network:

- Change frontend's .env:
  - NEXT_PUBLIC_FRONTEND_URL=https://YOUR_192_xxx_IP:4000
  - NEXT_PUBLIC_BACKEND_URL=https://YOUR_192_xxx_IP:3000
- Change backend's .env:
  - SERVER_URL=https://YOUR_192_xxx_IP:3000
- From the mobile browser, manually first browse https://YOUR_192_xxx_IP:3000 and accept to access the untrusted domain (otherwise, api calls will fail)
- From the mobile browser, open https://YOUR_192_xxx_IP:4000 and access the untrusted domain

# Webauthn issues

Webauthn can work EITHER from "http://localhost" (not a local ip address) OR from a real https domain with a valid SSL certificate (not self signed)

Problem:

- In order to test passkey from mobile browsers, with a local app running on a computer of the same network, we need to go through the computer IP address.
- But then we would need to use HTTPS for front end and backend, so we need a SSL certificate.
- But passkey doesn't work with IP address or with self signed certificates, so it's impossible to solve this issue.

Potential solution:

- Serve the local app behind a xxxx.pc2.net carrier proxy.
- TODO

# VSCode plugins to use:

- For Tailwind CSS rules: bradlc.vscode-tailwindcss
- ESLint for better code quality: dbaeumer.vscode-eslint
- Prisma: Prisma.prisma
- GraphQL (syntax highlighting): GraphQL.vscode-graphql-syntax
- Preview SVG pictures: SimonSiefke.svg-preview
- Traling spaces (to remove useless spaces when saving): shardulm94.trailing-spaces
- Markdown (for README preview): yzhang.markdown-all-in-one

# VSCode settings.json recommendation

Add the following .vscode/settings.json in order to:

- Not open the node_modules/ folder all the time when viewing library prototypes.
- Auto-add missing imports when saving
- Auto-cleanup useless imports when saving

```
{
  "explorer.autoRevealExclude": {
    "**/node_modules": true
  },
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.addMissingImports": true
  }
}
```
