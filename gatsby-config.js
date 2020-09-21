module.exports = {
  siteMetadata: {
    title: `Saglietti`,
    titleTemplate: "%s • Branding — Digital",
    description: `Saglietti è uno studio di comunicazione specializzato in identità visiva, adv, editoria ed exhibit design. La nostra missione: creare valore.`,
    author: `@Francesco_Sansa`,
    url: "https://www.saglietti.it/", // No trailing slash allowed!
    image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@Francesco_Sansa",
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
        clientId: `c5a17a2977924848aeff445a33b26e78`,
        clientSecret: `4a4170f189d945e791e93681f9eb27d5`,
        refreshToken: `AQAvqQ81Gd-nys10lNMXL_i-MsKG5fAyej8BXtZ_QMSR0Fdg2DhK58scfC-mVEhFpFi3rmwimjG70GQ1X6_-HwiPpU_x00fRiqHH4fU0mbnMk2BVorzp0HlPpBwoa9WfwDM`,
       
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
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `Saglietti-it`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#ffffff`,
    //     theme_color: `#000000`,
    //     icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
    //     // crossOrigin: `use-credentials`,
    //   },
    // },
    // // this (optional) plugin enables Progressive Web App + Offline functionality
    // // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline'
  ],
}
