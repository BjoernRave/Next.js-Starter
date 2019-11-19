import "isomorphic-unfetch";
import { isServer } from "lib/utils";
import {
  cacheExchange,
  createClient,
  dedupExchange,
  fetchExchange,
  ssrExchange
} from "urql";
import { SSRData } from "urql/dist/types/exchanges/ssr";

let urqlClient = null;
let ssrCache = null;

export default function initUrqlClient(initialState?: SSRData) {
  // Create a new client for every server-side rendered request to reset its state
  // for each rendered page
  // Reuse the client on the client-side however
  if (isServer || !urqlClient) {
    ssrCache = ssrExchange({ initialState });

    urqlClient = createClient({
      url: `${process.env.BACKEND_URL}/graphql`,
      // Active suspense mode on the server-side
      suspense: isServer,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange]
    });
  }

  // Return both the cache and the client
  return [urqlClient, ssrCache];
}
