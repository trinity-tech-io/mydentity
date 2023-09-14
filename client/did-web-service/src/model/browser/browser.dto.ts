export type BrowserDTO = {
  id: string; // Database ID, unique for each (key/userId)
  key: string; // Identifier shared by multiple users using the app in the same browser (one per local storage)
  createdAt: string; // ISO date
  lastUsedAt: string; // ISO date
  userAgent: string;
  name: string;
}