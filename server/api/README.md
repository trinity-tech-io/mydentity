# Setup

- `cd server/api`
- `npm i -g @nestjs/cli`
- `npm i -D`
- Clone `.env.sample` to `.env`
- `npx prisma generate`
- `npx prisma migrate deploy`

# Start the server for development

- Start docker dependencies (see Docker section below):
  - `docker compose up`
- Start the API:
  - `npm run start:dev`

# Prisma

## To create a migration (that others will deploy) after changing the prisma schema

- `npx prisma migrate dev`

## To execute others migrations after pulling code from git

- `npx prisma migrate deploy`

## To update typescript type definitions

- `npx prisma generate`

## To view and edit the database

- `npx prisma studio`
- Open http://localhost:5555/
# Other useful commands

## Add a new graphql api

- `nest g resource xxx`

## Test graphql queries

- Open http://localhost:3000/graphql