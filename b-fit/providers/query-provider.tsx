"use client";

import React from "react";
import { QueryClient } from "@tanstack/react-query";
import {
  PersistQueryClientProvider,
  PersistedClient,
} from "@tanstack/react-query-persist-client";
import {
  createIDBPersister,
  createLocalStoragePersister,
} from "@/lib/persister/persister";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
export default function QueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 60 * 24,
            gcTime: 1000 * 60 * 60 * 24,
          },
        },
      })
  );

  const persister = React.useMemo(() => {
    const idb = createIDBPersister("reactQueryCache");
    const ls = createLocalStoragePersister(); // null on server

    return {
      persistClient: async (client: PersistedClient) => {
        try {
          await idb.persistClient(client);
        } catch {
          await ls?.persistClient(client);
        }
      },
      restoreClient: async () => {
        try {
          return await idb.restoreClient();
        } catch {
          return await ls?.restoreClient();
        }
      },
      removeClient: async () => {
        try {
          await idb.removeClient();
        } catch {
          await ls?.removeClient();
        }
      },
    };
  }, []);

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </PersistQueryClientProvider>
  );
}
