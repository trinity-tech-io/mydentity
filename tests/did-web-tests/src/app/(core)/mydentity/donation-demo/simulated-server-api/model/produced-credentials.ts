export type ProducedCredentialsResponse = {
  // VC in their string form. Rebuild with VeriafiableCredential.parse().
  credentials: string[];
  // True if the credentials have been imported on the server side already. False if they have to be imported by the client side.
  imported: boolean;
}