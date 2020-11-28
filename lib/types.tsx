import 'next'
import { Client } from 'urql'

declare module 'next' {
  export interface NextPageContext {
    urqlClient: Client
  }
}
