import { cacheExchange } from '@urql/exchange-graphcache'
import fetch from 'isomorphic-unfetch'
import { createClient, dedupExchange, fetchExchange, ssrExchange } from 'urql'
import { isServer } from './utils'

let urqlClient: any
let ssrCache: any

export default function initUrqlClient(initialState: any) {
  // Create a new client for every server-side rendered request to reset its state
  // for each rendered page
  // Reuse the client on the client-side however

  if (isServer || !urqlClient) {
    ssrCache = ssrExchange({ initialState })

    urqlClient = createClient({
      url: ``,

      suspense: isServer,
      fetch: fetch,
      exchanges: [
        dedupExchange,
        cacheExchange(),
        // Put the exchange returned by calling ssrExchange after your cacheExchange,
        // but before any asynchronous exchanges like the fetchExchange:
        ssrCache,
        fetchExchange
      ]
    })
  }

  // Return both the cache and the client
  return [urqlClient, ssrCache]
}
