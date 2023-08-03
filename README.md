# Introduction

This repo contains the front end web app and the related API backend for the **DID web service**.

This web app aims at helping users easily get a W3C DID and manage it. The app allows custodial DID creation, credentials imports and delivery, discovery of DID related services and more.

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

# Setup

- Setup the [React web app](/client/did-web-service/README.md)
- Setup the [API server](/server/api/README.md)

# VSCode plugins to use:

- For Tailwind CSS rules: bradlc.vscode-tailwindcss
- ESLint for better code quality: dbaeumer.vscode-eslint
- Prisma: Prisma.prisma
- GraphQL (syntax highlighting): GraphQL.vscode-graphql-syntax
- Preview SVG pictures: SimonSiefke.svg-preview
- Traling spaces (to remove useless spaces when saving): shardulm94.trailing-spaces
- Markdown (for README preview): yzhang.markdown-all-in-one