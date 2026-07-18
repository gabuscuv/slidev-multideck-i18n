import { computed, type MaybeRefOrGetter, toValue } from 'vue'
import { useI18n } from 'vue-i18n'

export function useTranslation(key: MaybeRefOrGetter<string | undefined>) {
  const { t,tm } = useI18n()

  return computed(() => {
    const k = toValue(key)?.trim()
    let message: string = k ? t(k) : '';
    if (message == k)
    {
      return tm(k);
    }

    return [message]
  })
}