export type ActivityDto = {
    id: string;
    type: string;
    userEmailProvider?: string;
    identityStr?: string;
    credentialsCount?: number;
    appDid?: string;
    browserName?: string;
    createdAt: string;
}