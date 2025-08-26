export const STORES = {
  AUTH: "auth",
} as const;

export type StoreNames = (typeof STORES)[keyof typeof STORES];

export const DB_NAME = "FitsCoreDB";
export const DB_VERSION = 1;