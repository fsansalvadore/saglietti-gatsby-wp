const ENG_SUFFIX = "-eng"

/**
 * English progetti in WordPress use a `-eng` slug suffix; public Gatsby URLs omit it
 * so IT and EN pages can share the same path segment (e.g. /progetti/artissima and /en/projects/artissima).
 *
 * @param {string | undefined | null} slug
 * @param {string | undefined | null} languageSlug - e.g. "it" | "en"
 * @returns {string | undefined | null}
 */
function publicProjectSlugForUrl(slug, languageSlug) {
  if (slug == null || slug === "") return slug
  const lang = String(languageSlug || "")
    .toLowerCase()
    .trim()
  if (lang === "en" && slug.endsWith(ENG_SUFFIX)) {
    return slug.slice(0, -ENG_SUFFIX.length)
  }
  return slug
}

module.exports = { publicProjectSlugForUrl, ENG_SUFFIX }
