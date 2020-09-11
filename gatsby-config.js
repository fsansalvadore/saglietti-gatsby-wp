module.exports = {
  siteMetadata: {
    title: `Saglietti`,
    description: `Saglietti gatsby.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    // Simple config, passing URL
    {
      resolve: "gatsby-source-graphql",
      options: {
        // Arbitrary name for the remote schema Query type
        typeName: "WORDPRESS",
        // Field under which the remote schema will be accessible. You'll use this in your Gatsby query
        fieldName: "wordpress",
        // Url to query from
        url: "https://wp.saglietti.it/graphql",
        refetchInterval: 60,
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-spotify`,
      options: {
        clientId: `e482cad415d14b3fbda0dfa8277bd351`,
        clientSecret: `3898c47ed0b44ae6b29dac09aab26662`,
        refreshToken: `AQCj9QLoFKfwQaPyIBVqVP4ytFSZweKP2LSkWTCcTln5yFyxBboLZOrj5U8zXh8pinfkth9ZfQvueahWnyR1dr0mQO_G1z5SBQ72LShVKtre5BcPBk6hbczFb0zz4i8qcNQ`,
       
        fetchPlaylists: true, // optional. Set to false to disable fetching of your playlists
        fetchRecent: true, // optional. Set to false to disable fetching of your recently played tracks
        timeRanges: ['short_term', 'medium_term', 'long_term'], // optional. Set time ranges to be fetched
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
