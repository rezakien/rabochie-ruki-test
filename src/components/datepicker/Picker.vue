<script lang="ts" setup>
import { QBtn, QIcon} from 'quasar'
import { storeToRefs } from 'pinia'
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useDatePickerStore, type Cell } from '@/stores/datepicker'
import { getFormattedDate } from '@/utils/date'

interface Emits {
  (e: 'pick-date'): void
}
const emit = defineEmits<Emits>()

const { locale } = useI18n()
const datePickerStore = useDatePickerStore()
const { cells, date, weekRow } = storeToRefs(datePickerStore)

const monthLabel = computed(() => {
  if (!date.value) {
    return ''
  }

  return new Intl.DateTimeFormat(locale.value.substring(0, 2) || undefined, {
    month: 'long',
    year: 'numeric'
  }).format(date.value)
})

const todayLabel = computed(() => {
  return new Intl.DateTimeFormat(locale.value.substring(0, 2) || undefined, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date())
})

const goToday = () => {
  datePickerStore.generate(new Date().toDateString())
}

const onPick = (cell: any) => {
  if (!cell?.opts?.date) {
    return
  }
  emit('pick-date')
  datePickerStore.generate(cell.opts.date.toDateString())
}

const cellClasses = (cell: Cell) => {
  if (cell.type === 'week') {
    return [
      'tw-text-[12px]',
      'tw-font-[350]',
      'tw-text-[#0c0c0c]',
      'tw-text-center',
      'tw-uppercase',
      'tw-select-none',
      'tw-h-[28px]',
      'tw-flex',
      'tw-items-center',
      'tw-justify-center'
    ]
  }

  const isSelected = !!cell?.opts?.selected
  const isToday = !!cell?.opts?.currentDay

  const base = [
    'tw-h-[36px]',
    'tw-rounded-[8px]',
    'tw-text-[14px]',
    'tw-flex',
    'tw-items-center',
    'tw-justify-center',
    'tw-cursor-pointer', 'tw-select-none'
  ]

  const state: string[] = []

  if (!cell.title) {
    state.push('tw-pointer-events-none', 'tw-opacity-30')
  } else if (isSelected) {
    state.push('tw-bg-[#0c0c0c]', 'tw-text-[#fff]')
  } else if (isToday) {
    state.push('tw-border', 'tw-border-[#0c0c0c]', 'tw-text-[#0c0c0c]')
  } else {
    state.push('hover:tw-bg-[#F2F6FF]', 'tw-text-[#2B2B2B]')
  }

  return [...base, ...state]
}

onMounted(() => {
  if (!date.value) {
    goToday()
  }
})
</script>

<template>
  <div
    :class="[
      'tw-rounded-[12px]',
      'tw-p-[16px]',
      'tw-bg-[#fff]',
      'tw-shadow-[0px_4px_50px_0px_rgba(0,0,0,0.3)]',
      'tw-z-10',
      'tw-w-[320px]'
    ]"
  >
    <div class="tw-flex tw-flex-col tw-items-center tw-justify-between tw-mb-[12px] tw-gap-[10px]">
      <QBtn
        class="!tw-text-[#0c0c0c] tw-text-[12px] tw-h-8 tw-rounded-[6px] tw-border tw-border-[#E3E7EF] hover:tw-bg-[#F2F6FF]"
        :label="todayLabel"
        dense
        no-caps
        flat
        unelevated
        @click="goToday"
      />

      <div class="tw-flex tw-items-center tw-gap-[10px]">
        <QBtn
          round
          dense
          flat
          unelevated
          @click="datePickerStore.move(-1)"
        >
          <QIcon class="tw-text-[#0c0c0c]" name="chevron_left" size="20px" />
        </QBtn>

        <div class="tw-text-[#0c0c0c] tw-font-[600] tw-select-none tw-capitalize">
          {{ monthLabel }}
        </div>

        <QBtn
          round
          dense
          flat
          unelevated
          @click="datePickerStore.move(1)"
        >
          <QIcon class="tw-text-[#0c0c0c]" name="chevron_right" size="20px" />
        </QBtn>
      </div>
    </div>

    <div class="tw-grid tw-grid-cols-7 tw-gap-[6px]">
      <div v-for="(cell, i) in weekRow" :key="`w-${i}`" :class="cellClasses(cell)">
        {{ cell.title }}
      </div>
      <template v-for="(row, rowIndex) in cells" :key="`row-${rowIndex}`">
        <div
          v-for="(cell, cellIndex) in row"
          :key="`cell-${rowIndex}-${cellIndex}`"
          :class="cellClasses(cell)"
          @click="cell.type === 'day' && onPick(cell)"
        >
          {{ cell.title }}
        </div>
      </template>
    </div>
  </div>
</template>
