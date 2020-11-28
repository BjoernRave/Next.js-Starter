import { cacheExchange } from '@urql/exchange-graphcache'
import { withUrqlClient } from 'next-urql'
import { dedupExchange, fetchExchange } from 'urql'

const withUrql = (Component: any) => {
  return withUrqlClient((ssrExchange, ctx) => ({
    url: `${process.env.APPLICATION_URL}/api/graphql`,
    // ...(isServer && {
    //   fetchOptions: {
    //     headers: {
    //       cookie: ctx?.req.headers.cookie,
    //       host: ctx?.req.headers.host,
    //     },
    //   },
    // }),

    exchanges: [dedupExchange, cacheExchange(), ssrExchange, fetchExchange],
  }))(Component)
}

export default withUrql
