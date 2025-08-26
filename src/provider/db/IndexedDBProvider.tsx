"use client";

import { createContext, useContext, ReactNode } from "react";
import Dexie from "dexie";
import { IndexedDBContextType } from "./interface";
import { StoreNames } from "@/common/constants/db";

class FitsCoreDB extends Dexie {
  constructor() {
    super("FitsCoreDB");
    this.version(1).stores({
      auth: "key,value",
      cache: "key,value",
      settings: "key,value",
    });
  }
}

const db = new FitsCoreDB();

const IndexedDBContext = createContext<IndexedDBContextType | undefined>(
  undefined
);

export const IndexedDBProvider = ({ children }: { children: ReactNode }) => {
  const getValue = async (store: StoreNames, key: string): Promise<any> => {
    const result = await db.table(store).get(key);
    return result?.value ?? null;
  };

  const setValue = async (
    store: StoreNames,
    key: string,
    value: any
  ): Promise<void> => {
    await db.table(store).put({ key, value });
  };

  const deleteValue = async (store: StoreNames, key: string): Promise<void> => {
    await db.table(store).delete(key);
  };

  const getAllValues = async (store: StoreNames): Promise<any[]> => {
    const results = await db.table(store).toArray();
    return results.map((r) => r.value);
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
