import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path, { join, dirname } from 'path';
// import path from 'path';
import { makeExecutableSchema } from '@graphql-tools/schema'

import { resolvers } from './graphql/resolvers';

import { startApolloServer } from './app';

// const __filename = fileURLToPath(import.meta.url);
// console.log(__filename);

// const teste = dirname(fileName);

const loadGraphQLFile = (filename: any) => readFileSync(join('./src', filename), 'utf-8');

const typeDefs = [ loadGraphQLFile('./graphql/Schema.graphql') ].join('\n')
const schema = makeExecutableSchema({ typeDefs });

startApolloServer(schema, resolvers)