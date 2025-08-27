"use client";

import { createContext, useContext, ReactNode } from "react";
import { IndexedDBContextType } from "./interface";
import { DB_NAME, DB_VERSION, StoreNames } from "@/common/constants/db";


const IndexedDBContext = createContext<IndexedDBContextType | undefined>(
  undefined
);

const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = request.result;
      if (!db.objectStoreNames.contains("auth")) {
        db.createObjectStore("auth", { keyPath: "key" });
      }
      if (!db.objectStoreNames.contains("fitscore")) {
        db.createObjectStore("fitscore", { keyPath: "key" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const IndexedDBProvider = ({ children }: { children: ReactNode }) => {
  const getValue = async (store: StoreNames, key: string): Promise<any> => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, "readonly");
      const objectStore = tx.objectStore(store);
      const req = objectStore.get(key);
      req.onsuccess = () => resolve(req.result?.value ?? null);
      req.onerror = () => reject(req.error);
    });
  };

  const setValue = async (store: StoreNames, key: string, value: any) => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, "readwrite");
      const objectStore = tx.objectStore(store);
      const req = objectStore.put({ key, value });
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  };

  const deleteValue = async (store: StoreNames, key: string) => {
    const db = await openDB();
    return new Promise<void>((resolve, reject) => {
      const tx = db.transaction(store, "readwrite");
      const objectStore = tx.objectStore(store);
      const req = objectStore.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  };

  const getAllValues = async (store: StoreNames): Promise<any[]> => {
    const db = await openDB();
    return new Promise<any[]>((resolve, reject) => {
      const tx = db.transaction(store, "readonly");
      const objectStore = tx.objectStore(store);
      const req = objectStore.getAll();
      req.onsuccess = () => resolve(req.result.map((r: any) => r.value));
      req.onerror = () => reject(req.error);
    });
  };

  return (
    <IndexedDBContext.Provider
      value={{ getValue, setValue, deleteValue, getAllValues }}
    >
      {children}
    </IndexedDBContext.Provider>
  );
};

export const useIndexedDB = () => {
  const context = useContext(IndexedDBContext);
  if (!context)
    throw new Error("useIndexedDB must be used within IndexedDBProvider");
  return context;
};
