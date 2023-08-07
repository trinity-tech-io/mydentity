# Requirements

- node >= 16
- npm >= 8
- docker >= 21

# Initial setup

- `cd server/api`
- `npm i -g @nestjs/cli`
- `npm i -D`
- Clone `.env.sample` to `.env`
- Start docker dependencies (see Docker section below):
  - `docker compose up`
- `npx prisma generate`
- `npx prisma migrate deploy`
- Start the API:
  - `npm run start:dev`

# Setup when getting the latest git code

- `git pull --rebase`
- Compare .env.sample files with your .env file to check if something new was added.
- `npm i -D`
- `npx prisma generate`
- `npx prisma migrate deploy`
- Start the API:
  - `npm run start:dev`

# Prisma

## To create a migration (that others will deploy) after changing the prisma schema

Every time you modify the prisma schema file, you must create a migration locally. This migration will be deployed by others to update the database:

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