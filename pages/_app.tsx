import { GlobalStyles } from "lib/styles";
import { theme } from "lib/theme";
import withUrqlClient from "lib/with-urql-client";
import App, { Container } from "next/app";
import React from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { Client as UrqlClient, Provider as UrqlProvider } from "urql";
import Meta, { DefaultMeta } from "../components/Meta";

class MyApp extends App<{ urqlClient: UrqlClient }> {
  render() {
    const { Component, pageProps, urqlClient } = this.props;

    return (
      <UrqlProvider value={urqlClient}>
        <ThemeProvider theme={theme}>
          <Container>
            <GlobalStyles />
            <Normalize />
            <DefaultMeta />
            <Meta />
            <Component {...pageProps} />
          </Container>
        </ThemeProvider>
      </UrqlProvider>
    );
  }
}

export default withUrqlClient(MyApp);
