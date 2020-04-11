import { GlobalStyles } from 'lib/styles'
import { theme } from 'lib/theme'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'

const MyApp = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Normalize />
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
