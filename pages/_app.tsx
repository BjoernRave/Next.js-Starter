import { NotificationProvider, NotificationType } from 'components/Notification'
import { useState } from 'react'
import '../styles.css'

const MyApp = ({ Component, pageProps }) => {
  const [notification, setNotification] = useState<NotificationType>(null)

  return (
    <NotificationProvider value={{ notification, setNotification }}>
      <Component {...pageProps} />
    </NotificationProvider>
  )
}

export default MyApp
