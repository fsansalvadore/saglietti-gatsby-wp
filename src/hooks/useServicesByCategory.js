import { useMemo } from "react"

/**
 * Groups services by category, filtered by language.
 * Categories are sorted A–Z; services within each category by date ascending.
 *
 * @param {Array} nodes - Raw services nodes from WordPress (e.g. data.wordpress.services.nodes)
 * @param {string} language - Language code to filter by (e.g. "IT", "EN", "it", "en")
 * @returns {Array<{ name: string, services: Array }>}
 */
export function useServicesByCategory(nodes, language) {
  return useMemo(() => {
    if (!nodes?.length) return []

    const lang = language?.toUpperCase?.() ?? ""

    const byCategory = nodes
      .filter(service => service.language?.code?.toUpperCase() === lang)
      .reduce((acc, service) => {
        const categoryName = service.categories?.nodes?.[0]?.name ?? "Altro"
        if (!acc[categoryName]) acc[categoryName] = []
        acc[categoryName].push(service)
        return acc
      }, {})

    Object.keys(byCategory).forEach(cat => {
      byCategory[cat].sort((a, b) => new Date(a.date) - new Date(b.date))
    })

    return Object.entries(byCategory)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([name, services]) => ({ name, services }))
  }, [nodes, language])
}
