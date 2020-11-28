import Meta from 'components/Meta'
import { NotificationProvider, NotificationType } from 'components/Notification'
import { Provider } from 'next-auth/client'
import { useState } from 'react'
import '../styles.css'

const MyApp = ({ Component, pageProps }) => {
  const [notification, setNotification] = useState<NotificationType>(null)

  return (
    <Provider session={pageProps?.session}>
      <NotificationProvider value={{ notification, setNotification }}>
        <Meta />
        <Component {...pageProps} />
      </NotificationProvider>
    </Provider>
  )
}

export default MyApp
