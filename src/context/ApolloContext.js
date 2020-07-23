import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

export const client = new ApolloClient({
  uri: 'http://localhost:8888/saglietti/graphql'
})