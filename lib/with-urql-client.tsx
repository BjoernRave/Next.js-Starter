import "isomorphic-fetch";
import { AppContext } from "next/app";
import { parseCookies } from "nookies";
import React from "react";
import ssrPrepass from "react-ssr-prepass";
import initUrqlClient from "./init-urql-client";
import { isServer } from "./utils";

const withUrqlClient = App => {
  return class WithUrql extends React.Component {
    urqlClient: any;
    cookies: any;

    static async getInitialProps(ctx: AppContext) {
      const { AppTree } = ctx;
      const cookies = parseCookies(ctx.ctx);
      const [urqlClient, ssrCache] = initUrqlClient(
        null,
        cookies.Authorization
      );
      ctx.ctx.urqlClient = urqlClient;

      // Run the wrapped component's getInitialProps function
      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      // getInitialProps is universal, but we only want
      // to run server-side rendered suspense on the server
      if (!isServer) {
        return appProps;
      }

      // Run suspense and hence all urql queries
      await ssrPrepass(
        //@ts-ignore
        <AppTree {...appProps} urqlClient={urqlClient} />
      );

      // Extract query data from the Apollo store
      // Extract the SSR query data from urql's SSR cache
      const urqlState = ssrCache.extractData();

      return {
        ...appProps,
        urqlState,
        cookies
      };
    }

    constructor(props) {
      super(props);

      if (props.urqlClient) {
        this.urqlClient = props.urqlClient;
      } else {
        // Create the urql client and rehydrate the prefetched data
        const [urqlClient] = initUrqlClient(
          props.urqlState,
          props.cookies.Authorization
        );
        this.urqlClient = urqlClient;
      }
    }

    render() {
      return <App {...this.props} urqlClient={this.urqlClient} />;
    }
  };
};

export default withUrqlClient;
