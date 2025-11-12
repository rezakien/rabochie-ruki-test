<script setup lang="ts">
import { onMounted } from 'vue'
import DatePicker from './components/datepicker/DatePicker.vue'
import LanguageSwitcher from './components/LanguageSwitcher.vue'
import { useI18nStore } from './stores/i18n'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const i18nStore = useI18nStore()

onMounted(() => {
  i18nStore.initLocale()
})
</script>

<template>
  <div class="tw-max-w-[800px] tw-flex tw-flex-col tw-gap-y-[60px] tw-items-center tw-justify-center">
    <div>
      <span class="tw-text-[24px] tw-font-[600] tw-text-[#0c0c0c]">
        {{ t('title') }}
      </span>
    </div>
    <div class="tw-flex tw-flex-col tw-gap-y-[12px] xl:tw-gap-y-[20px]">
      <DatePicker />
      <LanguageSwitcher />
    </div>
  </div>
</template>
