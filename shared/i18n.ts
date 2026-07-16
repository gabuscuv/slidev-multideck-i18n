import modules from '#slidev/monaco-run-deps'
import { createI18n } from 'vue-i18n'

interface LocaleModule {
  default?: Record<string, any>
  [key: string]: any
}

function loadLocaleMessages() {
  const localeModules = import.meta.glob(
  '/locales/*.yml',
  { eager: true }
  ) as Record<string, LocaleModule>

  console.log(Object.keys(localeModules))

  const messages: Record<string, any> = {}

  for (const [file, mod] of Object.entries(localeModules)) {
    const normalizedPath = file.replace(/\\/g, '/')
    const locale = normalizedPath.split('/').pop()?.replace(/\.yml$/, '')
    if (!locale) continue

    const moduleValue = ((mod as LocaleModule).default ?? mod) as Record<string, any>
    const localeKey = Object.keys(moduleValue).find(key => key === locale || key === 'es' || key === 'en')

    if (!localeKey) continue

    const localeMessages = moduleValue[localeKey]
    if (localeMessages && typeof localeMessages === 'object') {
      messages[locale] = localeMessages
    } else if (moduleValue && typeof moduleValue === 'object') {
      messages[locale] = moduleValue
    }
  }

  return messages
}

export function createSlidevI18n() {
  return createI18n({
    locale: 'es',
    fallbackLocale: 'es',
    messages: loadLocaleMessages(),
  })
}