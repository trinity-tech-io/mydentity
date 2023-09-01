export const config = {
  IsProductEnv: process.env.NEXT_PUBLIC_HIVE_ENV === 'production',
  DIDResolverUrl: process.env.NEXT_PUBLIC_HIVE_ENV === 'production' ? 'mainnet' : 'testnet',
  ApplicationDID: 'did:elastos:ik3ngW1tRxzTtwRstgkCWuv4SmUQ6nGcML'
};
