export const STORES = {
  AUTH: "auth",
} as const;

export type StoreNames = (typeof STORES)[keyof typeof STORES];
