import { DB_NAME, DB_VERSION } from "../constants/db";

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("auth")) {
        db.createObjectStore("auth", { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getTokenFromDB = async (): Promise<string | null> => {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("auth", "readonly");
    const store = tx.objectStore("auth");
    const req = store.get("token");
    req.onsuccess = () => resolve(req.result?.value ?? null);
    req.onerror = () => reject(req.error);
  });
};
