import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './src/context/ApolloContext';

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>{element}</ApolloProvider>
)

// export const onClientEntry = () => {
//   // IntersectionObserver polyfill for gatsby-background-image (Safari, IE)
//   if (!(`IntersectionObserver` in window)) {
//     import(`intersection-observer`)
//     console.log(`# IntersectionObserver is polyfilled!`)
//   }
// }