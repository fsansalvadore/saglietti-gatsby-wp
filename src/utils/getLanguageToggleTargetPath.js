/**
 * Resolve Gatsby path when switching between Italian and English site sections.
 *
 * @param {object} opts
 * @param {string} opts.currentPath - Pathname without trailing slash (except "/")
 * @param {"it"|"en"} opts.newLanguage
 * @param {{ it?: string|null, en?: string|null }|null|undefined} [opts.projectTranslationPaths] - From Polylang-linked project pages only
 * @returns {string}
 */
export function getLanguageToggleTargetPath({
  currentPath,
  newLanguage,
  projectTranslationPaths,
}) {
  const alt = projectTranslationPaths?.[newLanguage]
  const onItProject =
    currentPath.startsWith("/progetti/") && currentPath !== "/progetti"
  const onEnProject =
    currentPath.startsWith("/en/projects/") && currentPath !== "/en/projects"

  if ((onItProject || onEnProject) && alt) {
    return alt
  }

  if (newLanguage === "en") {
    if (currentPath === "/" || currentPath === "") return "/en"
    if (currentPath === "/chi-siamo") return "/en/about"
    if (onItProject) {
      const slug = currentPath.replace("/progetti/", "")
      return `/en/projects/${slug}`
    }
    if (currentPath === "/progetti") return "/en/projects"
    if (currentPath === "/privacy") return "/en/privacy"
    return "/en"
  }

  if (currentPath === "/en" || currentPath === "") return "/"
  if (currentPath === "/en/about") return "/chi-siamo"
  if (onEnProject) {
    const slug = currentPath.replace("/en/projects/", "")
    return `/progetti/${slug}`
  }
  if (currentPath === "/en/projects") return "/progetti"
  if (currentPath === "/en/privacy") return "/privacy"
  return "/"
}
