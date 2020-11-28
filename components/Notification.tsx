import { motion } from 'framer-motion'
import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
} from 'react'

export interface NotificationType {
  message: string
  state: 'success' | 'error'
  duration?: number
}

const initialState: {
  notification: NotificationType
  setNotification: Dispatch<SetStateAction<NotificationType>>
} = {
  notification: null,
  setNotification: null,
}

export const NotificationContext = createContext(initialState)

export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = NotificationContext.Provider

export const Notification: FC<Props> = ({ notification, setNotification }) => {
  useEffect(() => {
    let timeout
    if (Boolean(notification?.message) && notification?.duration !== -1) {
      timeout = setTimeout(
        () => setNotification(null),
        notification?.duration ?? 3000
      )
    }
    return () => clearTimeout(timeout)
  }, [Boolean(notification?.message)])
  if (!notification) return null

  return (
    <motion.div
      style={{ top: 30 }}
      className='fixed left-0 right-0 z-50 flex justify-center mx-auto text-white'
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}>
      <span
        className='px-6 py-2 text-lg border-4 border-white shadow-lg rounded-lg'
        style={{
          backgroundColor:
            notification?.state === 'success' ? '#4caf50' : '#f44336',
        }}>
        {notification?.message}
      </span>
    </motion.div>
  )
}

interface Props {
  notification: NotificationType
  setNotification: Dispatch<SetStateAction<NotificationType>>
}
