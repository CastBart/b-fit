// lib/persisters.ts
import { get, set, del } from "idb-keyval";
import { PersistedClient, Persister } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

// IndexedDB Persister (safe: does nothing until called on the client)
export function createIDBPersister(key: IDBValidKey = "reactQuery"): Persister {
  return {
    persistClient: async (client: PersistedClient) => {
      await set(key, client);
    },
    restoreClient: async (): Promise<PersistedClient | undefined> => {
      const client = await get<PersistedClient>(key);
      return client ?? undefined;
    },
    removeClient: async () => {
      await del(key);
    },
  } satisfies Persister;
}

// LocalStorage Persister factory (returns null on server)
export function createLocalStoragePersister(): Persister | null {
  if (typeof window === "undefined") return null;
  return createSyncStoragePersister({ storage: window.localStorage });
}
