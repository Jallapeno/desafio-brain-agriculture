import { GraphQLError } from 'graphql'

export const errorHandler = (message: string, code: string, status: number): void => {
  throw new GraphQLError(message, {
    extensions: {
      code,
      http: {
        status
      }
    }
  })
}
