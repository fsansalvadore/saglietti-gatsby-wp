const path = require(`path`)

const mediaFields = `
  altText
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
const headingBlocks = `
... on WORDPRESS_CoreHeadingBlock {
    ${coreBlocksFields}
  }
` 
const imageBlocks = `
  ... on WORDPRESS_CoreImageBlock {
    ${coreBlocksFields}
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
      pages {
        nodes {
          content
          featuredImage {
            node {
              ${mediaFields}
            }
          }
          ${seoFields}
          status
          uri
          title
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
        blocks: project.blocks,
        id: project.id,
        title: project.title
      },
    })
  })
}
