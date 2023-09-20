import { BrowserDTO } from "@model/browser/browser.dto";

export type ActivityDto = {
    id: string;
    type: string;
    userEmailProvider?: string;
    identityStr?: string;
    credentialsCount?: number;
    appDid?: string;
    browser?: BrowserDTO;
    browserName?: string;
    createdAt: string;
}