const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@images": path.resolve(__dirname, "src/images"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@styles": path.resolve(__dirname, "src/styles"),
      },
    },
  })
}

const mediaFields = `
  sourceUrl
  altText
  title
  link
`

const projectCustomDetails = `
  custom_post_type_Project {
    ambiti
    anno
    credits
    descrizione
    titolo
    visitabile
    posizioneCarosello
  }
`

const coreBlocksFields = `
  name
  originalContent
`
const paragraphBlocks = `
  ... on WORDPRESS_CoreParagraphBlock {
    ${coreBlocksFields}
  }
`
// const mediaTextBlocks = `
//   ... on WORDPRESS_CoreMediaTextBlock {
//     ${coreBlocksFields}
//   }
// `
const headingBlocks = `
... on WORDPRESS_CoreHeadingBlock {
    ${coreBlocksFields}
  }
`
const freeformBlocks = `
... on WORDPRESS_CoreFreeformBlock {
    ${coreBlocksFields}
  }
`
const spacerBlocks = `
... on WORDPRESS_CoreSpacerBlock {
    ${coreBlocksFields}
  }
`
const imageBlocks = `
  ... on WORDPRESS_CoreImageBlock {
    ${coreBlocksFields}
    attributes {
      ... on WORDPRESS_CoreImageBlockAttributes {
        alt
        caption
        className
        url
      }
    }
  }
`

const videoBlocks = `
  ... on WORDPRESS_CoreVideoBlock {
    ${coreBlocksFields}
    attributes {
      id
      src
      caption
      align
      poster
      playsInline
      muted
      loop
      controls
      className
      autoplay
    }
  }
`

const galleryBlocks = `
  ... on WORDPRESS_CoreGalleryBlock {
    ${coreBlocksFields}
  }
`
const carouselBlocks = `
... on WORDPRESS_EedeeBlockGutensliderBlock {
    name
    dynamicContent
    saveContent
    innerBlocks {
      ... on WORDPRESS_EedeeBlockGutenslideBlock {
        dynamicContent
        originalContent
        name
        attributes {
          ... on WORDPRESS_EedeeBlockGutenslideBlockAttributes {
            mediaId
            mediaUrl
            linkUrl
            mediaAlt
            background
            dimRatio
            className
            initialized
            isEditable
            mediaType
            overlayColor
            rgbaBackground
            verticalAlign
          }
        }
      }
    }
  }
`

const seoFields = `
  seo {
    title
    focuskw
    metaDesc
    metaKeywords
    opengraphDescription
    opengraphImage {
      link
    }
    opengraphTitle
    twitterDescription
    twitterImage {
      link
    }
    twitterTitle
  }
`

const query = `
  query PublishedProjects {
    wordpress {
      projects(first: 100, where: { status: PUBLISH }) {
        nodes {
          categories {
            nodes {
              name
              slug
            }
          }
          content
          date
          featuredImage {
            node {
              ${mediaFields}
            }
          }
          ${seoFields}
          blocks {
            ${paragraphBlocks}
            ${headingBlocks}
            ${freeformBlocks}
            ${spacerBlocks}
            ${imageBlocks}
            ${videoBlocks}
            ${galleryBlocks}
            ${carouselBlocks}
          }
          status
          slug
          uri
          id
          title
          tags {
            nodes {
              name
            }
          }
          ${projectCustomDetails}
        }
      }
    }
  }
`

exports.createResolvers = async ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter,
}) => {
  const { createNode } = actions

  await createResolvers({
    WORDPRESS_MediaItem: {
      imageFile: {
        type: "File",
        async resolve(source) {
          let sourceUrl = source.sourceUrl

          if (source.mediaItemUrl !== undefined) {
            sourceUrl = source.mediaItemUrl
          }

          return await createRemoteFileNode({
            url: encodeURI(sourceUrl),
            store,
            cache,
            createNode,
            createNodeId,
            reporter,
          })
        },
      },
    },
  })
}

exports.createPages = async ({ actions, graphql, reporter }) => {
  const result = await graphql(`
    ${query}
  `)

  // Handle errors
  if (result.errors) {
    reporter.error("There was an error fetching posts", result.errors)
  }

  const wordpress = result?.data?.wordpress

  wordpress?.projects?.nodes?.forEach(project => {
    actions.createPage({
      path: `/progetti/${project.slug}`,
      component: path.resolve(`./src/components/common/templates/project.jsx`),
      context: {
        ...project,
        index: wordpress?.projects?.nodes
          ?.filter(p => p.custom_post_type_Project.visitabile === true)
          .sort((a, b) =>
            a.date < b.date
              ? 1
              : a.date === b.date
                ? a.title > b.title
                  ? 1
                  : -1
                : -1,
          )
          .indexOf(project),
        blocks: project.blocks,
        id: project.id,
        title: project.title,
        seo: project.seo,
      },
    })
  })
}
