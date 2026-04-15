const path = require(`path`)
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const { publicProjectSlugForUrl } = require(`./src/utils/publicProjectSlug`)

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

function normalizeLang(lang) {
  return String(lang || "")
    .toLowerCase()
    .trim()
}

/**
 * Full Gatsby paths for IT / EN versions of a Polylang-linked project.
 * @param {object} project - GraphQL project node (slug, language, translations)
 */
function buildProjectTranslationPaths(project) {
  const current =
    normalizeLang(project.language?.slug || project.language?.code) || "it"
  const list = project.translations || []

  const slugFor = lang => {
    const l = normalizeLang(lang)
    if (current === l) return project.slug
    const match = list.find(t => {
      const tl = normalizeLang(t.language?.slug || t.language?.code)
      return tl === l
    })
    return match?.slug ?? null
  }

  const itSlug = slugFor("it")
  const enSlug = slugFor("en")

  const itPathSlug = itSlug ? publicProjectSlugForUrl(itSlug, "it") : null
  const enPathSlug = enSlug ? publicProjectSlugForUrl(enSlug, "en") : null

  return {
    translationPathIt: itPathSlug ? `/progetti/${itPathSlug}` : null,
    translationPathEn: enPathSlug ? `/en/projects/${enPathSlug}` : null,
  }
}

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

// const carouselBlocks = `
// ... on WORDPRESS_EedeeBlockGutensliderBlock {
//     name
//     dynamicContent
//     saveContent
//     innerBlocks {
//       ... on WORDPRESS_EedeeBlockGutenslideBlock {
//         dynamicContent
//         originalContent
//         name
//         attributes {
//           ... on WORDPRESS_EedeeBlockGutenslideBlockAttributes {
//             mediaId
//             mediaUrl
//             linkUrl
//             mediaAlt
//             background
//             dimRatio
//             className
//             initialized
//             isEditable
//             mediaType
//             overlayColor
//             rgbaBackground
//             verticalAlign
//           }
//         }
//       }
//     }
//   }
// `

// const imageBlocks = `
//   ... on WORDPRESS_CoreImageBlock {
//     ${coreBlocksFields}
//     attributes {
//       ... on WORDPRESS_CoreImageBlockAttributes {
//         alt
//         caption
//         className
//         url
//       }
//     }
//   }
// `

// const videoBlocks = `
//   ... on WORDPRESS_CoreVideoBlock {
//     ${coreBlocksFields}
//     attributes {
//       __typename
//       ... on WORDPRESS_CoreVideoBlockAttributes {
//         id
//         src
//         caption
//         align
//         poster
//         playsInline
//         muted
//         loop
//         controls
//         className
//         autoplay
//       }
//       ... on WORDPRESS_CoreVideoBlockDeprecatedV1Attributes {
//         id
//         src
//         caption
//         align
//         poster
//         playsInline
//         muted
//         loop
//         controls
//         className
//         autoplay
//       }
//     }
//   }
// `

// const galleryBlocks = `
//   ... on WORDPRESS_CoreGalleryBlock {
//     ${coreBlocksFields}
//   }
// `
// const seoFields = `
//   seo {
//     title
//     focuskw
//     metaDesc
//     metaKeywords
//     opengraphDescription
//     opengraphImage {
//       link
//     }
//     opengraphTitle
//     twitterDescription
//     twitterImage {
//       link
//     }
//     twitterTitle
//   }
// `

const query = `
  query PublishedProjects {
    wordpress {
      projects(first: 200, where: { status: PUBLISH }) {
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
          status
          slug
          id
          title
          language {
            slug
            code
          }
          translations {
            slug
            language {
              slug
              code
            }
          }
          tags {
            nodes {
              name
            }
          }
          ${projectCustomDetails}
          blocks {
          ... on WORDPRESS_CoreImageBlock {
              name
              originalContent
              attributes {
                ... on WORDPRESS_CoreImageBlockAttributes {
                  alt
                  caption
                  className
                  url
                }
              }
            }
            ... on WORDPRESS_CoreVideoBlock {
              name
              originalContent
              attributes {
                __typename
                ... on WORDPRESS_CoreVideoBlockAttributes {
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
                ... on WORDPRESS_CoreVideoBlockDeprecatedV1Attributes {
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
            }
          }
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
  const result = await graphql(query)

  // Handle errors
  if (result.errors) {
    reporter.error(
      "There was an error fetching posts",
      result.errors,
      JSON.stringify(result),
    )
  }

  const wordpress = result?.data?.wordpress

  wordpress?.projects?.nodes?.forEach(project => {
    const projectLanguage = project.language?.slug || "it"
    const urlSlug = publicProjectSlugForUrl(project.slug, projectLanguage)
    // Italian: /progetti/{slug}
    // English: /en/projects/{slug} (WP slug may be `{base}-eng`; URL uses `base`)
    const projectPath =
      projectLanguage === "en"
        ? `/en/projects/${urlSlug}`
        : `/progetti/${urlSlug}`

    const { translationPathIt, translationPathEn } =
      buildProjectTranslationPaths(project)
    const projectContext = { ...project, slug: urlSlug }
    delete projectContext.translations

    // Get projects in the same language for navigation
    const projectsInLanguage = wordpress?.projects?.nodes?.filter(
      p =>
        (p.language?.slug || "it") === projectLanguage &&
        p.custom_post_type_Project.visitabile === true,
    )

    actions.createPage({
      path: projectPath,
      component: path.resolve(
        `./src/components/common/templates/project.layout.jsx`,
      ),
      context: {
        ...projectContext,
        translationPathIt,
        translationPathEn,
        projectLanguage: projectLanguage,
        index: projectsInLanguage
          ?.sort((a, b) =>
            a.date < b.date
              ? 1
              : a.date === b.date
                ? a.title > b.title
                  ? 1
                  : -1
                : -1,
          )
          .indexOf(project),
      },
    })
  })
}
