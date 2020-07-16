const path = require(`path`)

const mediaFields = `
  altText
  uri
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
      posts(first: 100, where: { status: PUBLISH }) {
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
  // console.log(data);
  // if (!data.wordpress) return null

  data.wordpress.posts.nodes.forEach(post => {
    actions.createPage({
      path: `/progetti${post.uri}`,
      component: path.resolve(`./src/components/templates/project.jsx`),
      context: {
        ...post,
        id: post.id,
        slug: post.uri,
        title: post.title
      },
    })
  })
}
