
export type IntentRequestPayload<T> = T & {
  caller: string; // Informative DID of the calling app
}
