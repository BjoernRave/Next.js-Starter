import { declarativeWrappingPlugin, makeSchema } from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import * as path from 'path'
import * as types from './resolvers'

export const schema = makeSchema({
  types,
  plugins: [
    nexusPrisma({ experimentalCRUD: true, paginationStrategy: 'prisma' }),
    declarativeWrappingPlugin(),
  ],
  outputs: {
    typegen: path.join(
      process.cwd(),
      'prisma',
      'generated',
      'nexus-typegen.ts'
    ),
    schema: path.join(process.cwd(), 'prisma', 'generated', 'schema.graphql'),
  },

  contextType: {
    module: path.join(process.cwd(), 'prisma', 'context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
