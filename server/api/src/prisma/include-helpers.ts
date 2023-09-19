/**
 * Helper types to easily make sure we include the right prisma nested objects in prisma queries.
 */



type Includer<T> = {
  include: T;
}
/* export const prismaUserIncludes = true;

export const prismaProjectIncludes: Includer<Prisma.ProjectInclude> = {
  include: {
    owner: prismaUserIncludes
  }
}
 */

/* export const prismaCredentialIncludes: Includer<PrismaMain.CredentialInclude> = {
  include: {
    ver: true
  }
} */