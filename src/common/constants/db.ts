export const STORES = {
  AUTH: "auth",
  CACHE: "cache",
  SETTINGS: "settings",
} as const;

export type StoreNames = (typeof STORES)[keyof typeof STORES];
