import { defineAppSetup } from '@slidev/types'
import { createSlidevI18n } from '../shared/i18n'

export default defineAppSetup(({ app }) => {
  const i18n = createSlidevI18n()

  // The i18n instance must be installed on the Vue app before components call useI18n().
  app.use(i18n as any)
})