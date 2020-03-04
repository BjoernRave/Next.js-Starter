import { GlobalStyles } from 'lib/styles'
import { theme } from 'lib/theme'
import withUrqlClient from 'lib/with-urql-client'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import Meta, { DefaultMeta } from '../components/Meta'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Normalize />
      <DefaultMeta />
      <Meta />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default withUrqlClient(MyApp)
