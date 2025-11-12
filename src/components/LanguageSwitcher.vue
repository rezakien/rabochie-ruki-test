<script lang="ts" setup>
import { QSelect, QItemSection, QItem, QItemLabel } from 'quasar'
import { useI18nStore } from '@/stores/i18n'
import { storeToRefs } from 'pinia'

const i18nStore = useI18nStore()
const { locale, localeOptions } = storeToRefs(i18nStore)
</script>

<template>
  <div>
    <QSelect
      class="tw-bg-[#0030780a] tw-rounded-[12px] tw-shadow-[0px_4px_50px_0px_rgba(0,0,0,0.3)] tw-px-[20px]"
      v-model="locale"
      :options="localeOptions"
      popup-content-class="tw-bg-[#000] !tw-rounded-[14px]"
      behavior="menu"
      borderless
      dense
      hide-bottom-space
      hide-dropdown-icon
      :menu-offset="[2, 4]"
      @update:model-value="i18nStore.setLocale"
    >
      <template #selected>
        <div v-if="locale" class="tw-flex tw-space-x-[12px] tw-mx-auto">
          <span :class="`fi fi-${locale.iso3166}`" />
          <span>{{ locale.title }}</span>
        </div>
      </template>
      <template #option="{ itemProps, opt }">
        <QItem v-bind="itemProps">
          <QItemSection>
            <QItemLabel>
              <span :class="`fi fi-${opt.iso3166}`" />
              <span class="tw-pl-[8px]">{{ opt.title }}</span>
            </QItemLabel>
          </QItemSection>
        </QItem>
      </template>
    </QSelect>
  </div>
</template>
