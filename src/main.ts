import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'
import App from './App.vue'
import { APP_FALLBACK_LOCALE, AVAILABLE_APP_LOCALES } from './logic/types/locale'
import { createI18n } from 'vue-i18n'
import messages from './lang'

import './style.css'
import '/node_modules/flag-icons/css/flag-icons.min.css'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { clickOutside } from './logic/directives/click-outside'

const i18n = createI18n({
  locale: APP_FALLBACK_LOCALE,
  fallbackLocale: APP_FALLBACK_LOCALE,
  messages,
  legacy: false,
  availableLocales: AVAILABLE_APP_LOCALES,
})

const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(pinia)
app.use(Quasar)
app.directive('click-outside', clickOutside)
app.mount('#app')
