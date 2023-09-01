/**
 * Helper class to deal with credential types that can be short ("NameCredential") or long
 * (https://ns.elastos.org/credentials/profile/name/v1#NameCredential)
 */
export class CredentialType {
  private context: string;
  private shortType: string;
  private longType: string;

  constructor(public type: string) {
    this.setup(type);
  }

  private setup(type: string) {
    // Make sure the given type is really a long type or throw an error
    if (type.indexOf("#") <= 0) {
      // short type
      this.shortType = type;
      this.context = null;
      this.longType = null;
    }
    else {
      // long type
      const parts = type.split("#");
      this.context = parts[0];
      this.shortType = parts[1];
      this.longType = type;
    }
  }

  public getContext(): string {
    return this.context;
  }

  public getShortType(): string {
    return this.shortType;
  }

  public getLongType(): string {
    return this.longType;
  }

  public isLongType(): boolean {
    return !!this.longType;
  }

  public containedIn(shortOrLongTypes: string[]): boolean {
    return shortOrLongTypes.includes(this.getLongType()) || shortOrLongTypes.includes(this.getShortType());
  }
}