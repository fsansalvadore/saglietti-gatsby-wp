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
const mediaTextBlocks = `
  ... on WORDPRESS_CoreMediaTextBlock {
    ${coreBlocksFields}
  }
`
const headingBlocks = `
... on WORDPRESS_CoreHeadingBlock {
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
            ${imageBlocks}
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
        index: data.wordpress.projects.nodes.indexOf(project),
        blocks: project.blocks,
        id: project.id,
        title: project.title
      },
    })
  })
}