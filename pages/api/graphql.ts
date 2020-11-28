import { ApolloServer } from 'apollo-server-micro'
import { applyMiddleware } from 'graphql-middleware'
import cors from 'micro-cors'
import { NextApiRequest, NextApiResponse } from 'next'
import { createContext } from '../../prisma/context'
import { permissions } from '../../prisma/permissions'
import { schema } from '../../prisma/schema'

require('dotenv').config()

const apolloServer = new ApolloServer({
  schema: applyMiddleware(schema, permissions),
  context: createContext,
})

export const config = {
  api: {
    bodyParser: false,
  },
}

export default cors()(async (req: NextApiRequest, res: NextApiResponse) => {
  return apolloServer.createHandler({ path: '/api/graphql' })(req, res)
})
