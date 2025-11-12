export enum Locale {
  RU = 'ruRu',
  EN = 'enEn',
}

export enum CountryIso3166 {
  RU = 'ru',
  EN = 'gb',
}

export const APP_FALLBACK_LOCALE = Locale.RU

export const AVAILABLE_APP_LOCALES = [Locale.RU, Locale.EN]

export const LOCALE_COUNTRY_ISO: Record<Locale, CountryIso3166> = {
  [Locale.EN]: CountryIso3166.EN,
  [Locale.RU]: CountryIso3166.RU,
}
