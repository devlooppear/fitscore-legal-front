import { StoreNames } from "@/common/constants/db";

export interface IndexedDBContextType {
  getValue: (store: StoreNames, key: string) => Promise<any>;
  setValue: (store: StoreNames, key: string, value: any) => Promise<void>;
  deleteValue: (store: StoreNames, key: string) => Promise<void>;
  getAllValues: (store: StoreNames) => Promise<any[]>;
}
