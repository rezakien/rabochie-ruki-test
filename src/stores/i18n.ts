import { AVAILABLE_APP_LOCALES, LOCALE_COUNTRY_ISO, Locale } from '@/logic/types/locale'
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { useI18n as vueI18n } from 'vue-i18n'

const LOCAL_STORAGE_LOCALE_KEY = 'rabochie_ruki_locale'

interface LocaleOption {
  title: string
  locale: Locale
  iso3166: string
}

interface I18nStore {
  locale: Ref<LocaleOption | null>
  localeOptions: ComputedRef<LocaleOption[]>
  initLocale: () => void
  setLocale: (localeTo: LocaleOption) => void
}

export const useI18nStore = defineStore('i18n', (): I18nStore => {
  const { t, locale: i18nLocale } = vueI18n()

  const locale = ref<LocaleOption | null>(null)

  const localeOptions = computed(() => {
    return AVAILABLE_APP_LOCALES.map((availableLocale) => {
      const iso3166 = getIso3166Locale(availableLocale)
      return {
        title: t(`locales.${iso3166}`),
        locale: availableLocale,
        iso3166: LOCALE_COUNTRY_ISO[availableLocale],
      }
    })
  })

  function getIso3166Locale(locale: Locale) {
    return locale.substring(0, 2)
  }

  const setLocale = ({ locale }: LocaleOption) => {
    localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, locale)
    i18nLocale.value = locale
  }

  const initLocale = () => {
    const localStorageLocale = localStorage.getItem(LOCAL_STORAGE_LOCALE_KEY)

    if (localStorageLocale) {
      i18nLocale.value = localStorageLocale
    }

    const selectedLocale =
      AVAILABLE_APP_LOCALES.find((availableLocale) => availableLocale === i18nLocale.value) ||
      Locale.RU
    const iso3166 = getIso3166Locale(selectedLocale)
    locale.value = {
      title: t(`locales.${iso3166}`),
      locale: selectedLocale,
      iso3166: LOCALE_COUNTRY_ISO[selectedLocale],
    }
  }

  return {
    locale,
    localeOptions,
    initLocale,
    setLocale,
  }
})
