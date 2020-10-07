module.exports = {
  siteMetadata: {
    title: `Saglietti`,
    titleTemplate: "%s • Branding — Digital",
    description: `Saglietti è uno studio di comunicazione specializzato in identità visiva, adv, editoria ed exhibit design. La nostra missione: creare valore.`,
    author: `@Francesco_Sansa`,
    url: "https://www.saglietti.it", // No trailing slash allowed!
    siteUrl: `https://www.saglietti.it`,
    image: "/images/Saglietti_1200X623.png", // Path to your image you placed in the 'static' folder
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-178906465-1",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        // anonymize: true,
        // Setting this parameter is also optional
        // respectDNT: true,
        // Avoids sending pageview hits from custom paths
        // exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        // pageTransitionDelay: 0,
        // Enables Google Optimize using your container Id
        // optimizeId: "YOUR_GOOGLE_OPTIMIZE_TRACKING_ID",
        // // Enables Google Optimize Experiment ID
        // experimentId: "YOUR_GOOGLE_EXPERIMENT_ID",
        // // Set Variation ID. 0 for original 1,2,3....
        // variationId: "YOUR_GOOGLE_OPTIMIZE_VARIATION_ID",
        // // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        // sampleRate: 5,
        // siteSpeedSampleRate: 10,
        // cookieDomain: "https://www.saglietti.it/",
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'UA-178906465-1', // leave empty if you want to disable the tracker
          cookieName: 'gatsby-gdpr-google-analytics', // default
          anonymize: true // default
        },
        // googleTagManager: {
        //   trackingId: 'YOUR_GOOGLE_TAG_MANAGER_TRACKING_ID', // leave empty if you want to disable the tracker
        //   cookieName: 'gatsby-gdpr-google-tagmanager', // default
        //   dataLayerName: 'dataLayer', // default
        // },
        // facebookPixel: {
        //   pixelId: 'YOUR_FACEBOOK_PIXEL_ID', // leave empty if you want to disable the tracker
        //   cookieName: 'gatsby-gdpr-facebook-pixel', // default
        // },
        // defines the environments where the tracking should be available  - default is ["production"]
        environments: ['production', 'development']
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        output: `/sitemap.xml`,
        // Exclude specific pages or groups of pages using glob parameters
        // See: https://github.com/isaacs/minimatch
        // The example below will exclude the single `path/to/page` and all routes beginning with `category`
        // exclude: [`/404/*`],
        // query: `
        //   {
        //     wp {
        //       generalSettings {
        //         siteUrl
        //       }
        //     }
  
        //     allSitePage {
        //       nodes {
        //         path
        //       }
        //     }
        // }`,
        // resolveSiteUrl: ({site, allSitePage}) => {
        //   //Alternatively, you may also pass in an environment variable (or any location) at the beginning of your `gatsby-config.js`.
        //   return site.wp.generalSettings.siteUrl
        // },
        // serialize: ({ site, allSitePage }) =>
        //   allSitePage.nodes.map(node => {
        //     return {
        //       url: `${site.wp.generalSettings.siteUrl}${node.path}`,
        //       changefreq: `daily`,
        //       priority: 0.7,
        //     }
        //   })
      }
    },
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Saglietti Studio`,
        short_name: `Saglietti`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#000000`,
        icon: `src/images/favicon.svg`, // This path is relative to the root of the site.
        // crossOrigin: `use-credentials`,
      },
    },
    // // this (optional) plugin enables Progressive Web App + Offline functionality
    // // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline'
  ],
}
