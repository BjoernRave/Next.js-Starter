import { declarativeWrappingPlugin, makeSchema } from '@nexus/schema'
import { nexusSchemaPrisma } from 'nexus-plugin-prisma/schema'
import * as types from './resolvers'

export const schema = makeSchema({
  types,
  plugins: [
    nexusSchemaPrisma({ experimentalCRUD: true }),
    declarativeWrappingPlugin(),
  ],
  outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
    contextType: 'Context.Context',
  },
})
