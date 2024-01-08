import express from 'express'
import http from 'http'
import { ApolloServer, type ApolloServerExpressConfig } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault
} from 'apollo-server-core'
import { type DocumentNode } from 'graphql'

type StartApolloServerProps = {
  typeDefs: DocumentNode | DocumentNode[]
  resolvers: ApolloServerExpressConfig['resolvers']
}

export async function startApolloServer ({ typeDefs, resolvers }: StartApolloServerProps): Promise<ApolloServer> {
  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true })
    ]
  })

  await server.start()
  server.applyMiddleware({ app })

  app.use((err, req, res, next) => {
    console.error('Erro HTTP:', err)
    res.status(500).send('Intern Server Error')
  })

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve))

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)

  return server
}
