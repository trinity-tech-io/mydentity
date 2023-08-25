export type PublishDTO = {
  publicationId: string;
}

export enum PublicationStatus {
  PENDING = "Pending",
  PROCESSING = "Processing",
  COMPLETED = "Completed",
  QUARANTINED = "Quarantined",
  ERROR = "Error"
}