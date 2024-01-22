/**
 * This file contains custom helper methods for the @tanstack/react-query library.
 * @author Alex Van Leyen <alex.vanleyen@gmail.com>
 */

import { MutationOptions, QueryClient } from "@tanstack/react-query";


/**
 * react-query@v3 exposed an undocumented wrapper method on the query client: executeMutation.
 * This method was used by this application's router actions, which required a non-hook solution
 * for executing mutations. As of @tanstack/react-query@v4 and above, this wrapper method was
 * removed. This helper method is meant to maintain the v3 executeMutation method.
 * @see {@link https://tanstack.com/query/v4/docs/react/guides/migrating-to-react-query-4#removed-undocumented-methods-from-the-queryclient-query-and-mutation | react-query docs}
 */
export function executeMutation<TData = unknown>(client: QueryClient, options: MutationOptions<TData>): Promise<TData> {
    return client.getMutationCache().build(client, options).execute()
}
