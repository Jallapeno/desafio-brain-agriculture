import { readFileSync } from 'fs'
import { join } from 'path'

import { resolvers } from './graphql/producerResolvers'

import { startApolloServer } from './app'

const loadGraphQLFile = (filename): any => readFileSync(join('./src', filename), 'utf-8')

const typeDefs = loadGraphQLFile('./graphql/Schema.graphql')

async function runServer (): Promise<void> {
  await startApolloServer({ typeDefs, resolvers })
}

runServer().catch((error) => {
  console.error('Error starting the server:', error)
  process.exit(1)
})
