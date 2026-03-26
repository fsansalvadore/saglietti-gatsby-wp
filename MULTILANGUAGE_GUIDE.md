# Multi-Language Implementation Guide

This guide explains how the Italian/English language switching works in the Saglietti Gatsby site.

## Overview

The site now supports Italian (default) and English with:
- React Context for global language state
- localStorage persistence across sessions
- WordPress Polylang integration for dynamic content
- JSON files for static text translations
- Language toggle in navigation

## Architecture

### Language Context (`src/contexts/LanguageContext.jsx`)

Provides global language state management:
- Current language ("it" or "en")
- Toggle function for switching languages
- localStorage sync for persistence

```jsx
import { useLanguage } from "../contexts/LanguageContext"

const MyComponent = () => {
  const { language, toggleLanguage } = useLanguage()
  // language is "it" or "en"
  // toggleLanguage() switches between languages
}
```

### Translation Hook (`src/hooks/useTranslation.js`)

Access translations for static text:

```jsx
import { useTranslation } from "../hooks/useTranslation"

const MyComponent = () => {
  const { t } = useTranslation()
  return <h1>{t("nav.about")}</h1> // Returns "chi siamo" or "about us"
}
```

### Translation Files

- `src/i18n/it.json` - Italian translations
- `src/i18n/en.json` - English translations

Structure:
```json
{
  "nav": {
    "about": "chi siamo",
    "projects": "progetti"
  }
}
```

## WordPress Integration

### Polylang Setup

WordPress should have:
1. Polylang plugin installed
2. WP GraphQL Polylang plugin installed
3. Content created in both Italian and English
4. Pages/posts linked between languages

### GraphQL Queries

All queries now fetch content in both languages:

```graphql
query {
  wordpress {
    pages(where: { id: 1701 }) {
      nodes {
        language {
          slug  # "it" or "en"
          name  # "Italian" or "English"
        }
        title
        content
      }
    }
  }
}
```

### Component Filtering

Pages filter data by current language:

```jsx
const MyPage = ({ data }) => {
  const { language } = useLanguage()
  
  const pageData = data.wordpress.pages.nodes.find(
    page => page.language?.slug === language
  )
  
  return <div>{pageData?.content}</div>
}
```

## Adding New Translations

### 1. Static Text

Add to both `src/i18n/it.json` and `src/i18n/en.json`:

```json
{
  "mySection": {
    "newText": "Italian text"
  }
}
```

Then use in components:
```jsx
const { t } = useTranslation()
<p>{t("mySection.newText")}</p>
```

### 2. WordPress Content

1. Create content in WordPress in Italian
2. Use Polylang to add English translation
3. Link the translations in Polylang
4. Gatsby will automatically fetch both versions

## Files Modified

### Created Files
- `src/contexts/LanguageContext.jsx` - Language context provider
- `src/hooks/useTranslation.js` - Translation hook
- `src/i18n/it.json` - Italian translations
- `src/i18n/en.json` - English translations

### Modified Files
- `src/components/layout.jsx` - Wrapped with LanguageProvider
- `src/components/ui-patterns/nav/nav.component.jsx` - Connected to language context
- `src/components/ui-patterns/menu-items/menu-items.component.jsx` - Uses translations
- `src/components/seo.js` - Language-aware meta tags
- `src/pages/index.js` - Filters by language
- `src/pages/chi-siamo.jsx` - Filters by language
- `src/pages/progetti.jsx` - Filters by language
- `src/pages/studio.jsx` - Filters by language
- `src/pages/privacy.jsx` - Filters by language
- `gatsby-node.js` - Handles language in project pages
- `src/components/common/templates/project.layout.jsx` - Language-aware locale

## Testing

1. **Language Toggle**: Click the EN/IT button in navigation
2. **Persistence**: Refresh the page - language should remain
3. **Content Switching**: All page content should change to selected language
4. **Projects**: Project pages should show in correct language
5. **SEO**: Check HTML lang attribute and og:locale tags

## WordPress Polylang Verification

Before building, verify in WordPress GraphQL IDE:

```graphql
{
  pages {
    nodes {
      title
      language {
        slug
      }
    }
  }
}
```

Should return pages with language.slug = "it" and "en"

## Building & Deploying

1. Ensure WordPress has content in both languages
2. Run `gatsby clean` to clear cache
3. Run `gatsby build` to build with all language data
4. Check build output for any GraphQL errors

## Troubleshooting

### Language not switching
- Check browser console for errors
- Verify localStorage contains "saglietti-language"
- Check that useLanguage hook is imported correctly

### Content not showing
- Verify WordPress has content in that language
- Check GraphQL query returns language field
- Ensure component filters by language.slug

### Translations missing
- Check translation key exists in JSON files
- Verify translation hook is imported
- Check browser console for "Translation missing" warnings

## Future Enhancements

Consider adding:
- URL-based language routing (/en/about)
- Language switcher with flags/icons
- More granular translation management
- RTL language support if needed
- Automatic language detection from browser
