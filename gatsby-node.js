const path = require(`path`)

const mediaFields = `
  id
  altText
  title(format: RENDERED)
  link
  uri
`

const projectCustomDetails = `
  custom_post_type_Project {
    ambiti
    anno
    credits
    titolo
    visitabile
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
        id
        url
        title
        caption
        className
        align
        alt
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
  query {
    wordpress {
      projects(first: 100, where: { status: PUBLISH }) {
        nodes {
          categories {
            nodes {
              name
              slug
              termTaxonomyId
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
          ${projectCustomDetails}
        }
      }
    }
  }
`

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    ${query}
  `)

  data.wordpress.projects.nodes.forEach(project => {
    actions.createPage({
      path: `/progetti/${project.slug}`,
      component: path.resolve(`./src/components/particles/templates/project.jsx`),
      context: {
        ...project,
        index: data.wordpress.projects.nodes
                                      .filter(p => p.custom_post_type_Project.visitabile === true)
                                      .sort((a, b) => (a.date < b.date) ? 1 : (a.date === b.date) ? ((a.title > b.title) ? 1 : -1) : -1 ).indexOf(project),
        blocks: project.blocks,
        id: project.id,
        title: project.title,
        seo: project.seo
      },
    })
  })
}