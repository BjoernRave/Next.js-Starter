import { AppContext } from 'next/app'
import React from 'react'
import ssrPrepass from 'react-ssr-prepass'
import { Client, Provider } from 'urql'
import initUrqlClient from './init-urql-client'
import { isServer } from './utils'

const withUrqlClient = Page => {
  const withUrql = props => {
    const urqlClient = React.useMemo(
      () =>
        props.urqlClient ||
        (props.pageProps && props.pageProps.urqlClient) ||
        initUrqlClient(props.urqlState)[0],
      [props.urqlClient, props.pageProps, props.urqlState]
    ) as Client

    return (
      <Provider value={urqlClient}>
        <Page {...props} urqlClient={urqlClient} />
      </Provider>
    )
  }

  withUrql.getInitialProps = async (ctx: AppContext) => {
    const { AppTree } = ctx

    const [urqlClient, ssrCache] = initUrqlClient(null)

    ctx.ctx.urqlClient = urqlClient

    // Run the wrapped component's getInitialProps function
    let pageProps = {}
    if (Page.getInitialProps) pageProps = await Page.getInitialProps(ctx)

    if (!isServer) return { ...pageProps }

    // Run suspense and hence all urql queries
    await ssrPrepass(
      <AppTree
        pageProps={{
          ...pageProps,
          urqlClient
        }}
      />
    )

    // Extract query data from the urql store
    // Extract the SSR query data from urql's SSR cache
    const urqlState = ssrCache.extractData()

    return {
      ...pageProps,
      urqlState
    }
  }

  return withUrql
}

export default withUrqlClient
