import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useI18n } from 'vue-i18n'

export function useTranslation(key: MaybeRefOrGetter<string | undefined>) {
  const { t } = useI18n()

  return computed(() => {
    const k = toValue(key)?.trim()
    return k ? t(k) : ''
  })
}