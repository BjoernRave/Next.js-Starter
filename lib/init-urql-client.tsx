import { cacheExchange } from "@urql/exchange-graphcache";
import "isomorphic-fetch";
import { createClient, dedupExchange, fetchExchange, ssrExchange } from "urql";
import { isServer } from "./utils";

let urqlClient: any;
let ssrCache: any;

export default function initUrqlClient(initialState: any, token: string) {
  // Create a new client for every server-side rendered request to reset its state
  // for each rendered page
  // Reuse the client on the client-side however

  if (isServer || !urqlClient || !token) {
    ssrCache = ssrExchange({ initialState });

    urqlClient = createClient({
      url: `http://localhost:3000/api/graphql`,
      // Active suspense mode on the server-side
      ...(token && {
        fetchOptions: {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      }),
      suspense: isServer,
      exchanges: [
        dedupExchange,
        cacheExchange(),
        // Put the exchange returned by calling ssrExchange after your cacheExchange,
        // but before any asynchronous exchanges like the fetchExchange:
        ssrCache,
        fetchExchange
      ]
    });
  }

  // Return both the cache and the client
  return [urqlClient, ssrCache];
}
