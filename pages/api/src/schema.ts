import { applyMiddleware } from 'graphql-middleware'
import { makeSchema } from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'
import { permissions } from './permissions'
import * as types from './types'

export const schema = applyMiddleware(makeSchema({
  types,
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/photon',
        alias: 'photon',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
}),permissions)
