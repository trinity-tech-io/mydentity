export type ProfileEntryDto = {
  id?: string;
  userId: string;
  type?: string;
  title?: string;
  value?: string;
  visible?: boolean;
  isPrimary?: boolean;
}