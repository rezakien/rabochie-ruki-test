<script lang="ts" setup>
import { QInput, QBtn, QIcon } from 'quasar'
import { useDatePickerStore } from '@/stores/datepicker'

interface Emits {
  (e: 'click-show-button'): void
}

interface Props {
  modelValue?: string | null
  pickerIsShown: boolean
}

const emit = defineEmits<Emits>()
defineProps<Props>()

const datePickerStore = useDatePickerStore()

const onChangeInput = (value: string | number | null) => {
  datePickerStore.generate(value as string)
}

const onClickPickerShow = () => {
  emit('click-show-button')
}
</script>

<template>
  <div class="tw-flex tw-gap-x-[10px]">
    <QInput
      class="tw-bg-[#0030780a] tw-px-[10px] !tw-rounded-[8px]"
      ref="reference"
      input-class="!tw-rounded-[8px]"
      :model-value="modelValue"
      :debounce="200"
      mask="##/##/####"
      dense
      borderless
      placeholder="mm/dd/yyyy"
      :disabled="pickerIsShown"
      @update:model-value="onChangeInput"
    />
    <QBtn
      class="!tw-bg-[#0030780a] !tw-rounded-[8px]"
      padding="8px 10px"
      unelevated
      flat
      dense
      @click="onClickPickerShow"
    >
      <QIcon class="tw-text-[#0c0c0c]" name="event" size="20px" />
    </QBtn>
  </div>
</template>
