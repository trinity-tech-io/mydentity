# Requirements

- node >= 16
- npm >= 8
- docker >= 21

# Initial setup

- `cd server/api`
- `npm i -g @nestjs/cli --legacy-peer-deps`
- `npm i -D --legacy-peer-deps`
- Clone `.env.sample` to `.env`
- Start docker dependencies (see Docker section below):
  - `docker compose up`
- `npm run prisma:generate`
- `npm run prisma:deploy`
- Start the API:
  - `npm run dev`

# Setup when getting the latest git code

- `git pull --rebase`
- Compare .env.sample files with your .env file to check if something new was added.
- `npm run update` (will deploy prisma migrations, generate prisma schema, install npm dependencies)
- Start the API:
  - `npm run dev`

# Prisma

## To create a migration (that others will deploy) after changing the prisma schema

Every time you modify the prisma schema file, you must create a migration locally. This migration will be deployed by others to update the database:

- `npm run prisma:migrate:dev`

## To execute others migrations after pulling code from git

- `npm run prisma:deploy`

## To update typescript type definitions

- `npm run prisma:generate`

## To view and edit the database

- `npm run prisma:studio:main` or `npm run prisma:studio:did`
# Other useful commands

## Add a new graphql api

- `nest g resource xxx`

## Test graphql queries

- Open http://localhost:3000/graphql