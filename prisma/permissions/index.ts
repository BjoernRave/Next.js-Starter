import { deny, shield } from 'graphql-shield'

export const permissions = shield(
  {
    Query: {},
    Mutation: {},
  },
  {
    fallbackRule: deny,
    allowExternalErrors: true,
    debug: process.env.NODE_ENV === 'development',
  }
)
