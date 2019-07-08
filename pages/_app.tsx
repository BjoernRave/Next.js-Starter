import React from "react";
import App, { Container } from "next/app";
import Meta from "../components/Meta";
import { createGlobalStyle, ThemeProvider } from "styled-components";

export const theme = {
  colors: {
    hoscoBlue: "#1898c2"
  }
};

const GlobalStyles = createGlobalStyle`
* {
    font-family: 'Open Sans', 'Helvetica Neue', Helvetica, Arial,
                    sans-serif;
                  transition: all linear 0.1s;
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
`;

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider theme={theme}>
        <Container>
          <GlobalStyles />
          <Meta />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    );
  }
}
