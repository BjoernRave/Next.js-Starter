import { allow, deny, shield } from 'graphql-shield'

export const permissions = shield(
  {
    Query: {
      users: allow,
    },
    Mutation: {
      createOneUser: allow,
    },
    User: allow,
  },
  {
    fallbackRule: deny,
    allowExternalErrors: true,
    debug: process.env.NODE_ENV === 'development',
  }
)
