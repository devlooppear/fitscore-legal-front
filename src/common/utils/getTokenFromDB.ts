import { db } from "@/provider/db/IndexedDBProvider";

export const getTokenFromDB = async (): Promise<string | null> => {
  const record = await db.table("auth").get("token");
  return record?.value ?? null;
};
