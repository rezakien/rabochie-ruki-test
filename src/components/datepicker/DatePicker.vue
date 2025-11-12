<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useDatePickerStore } from '@/stores/datepicker'
import { useFloating, offset } from '@floating-ui/vue'
import Controls from './Controls.vue'
import Picker from './Picker.vue'
import { storeToRefs } from 'pinia'
import { getFormattedDate } from '@/utils/date'

const datePickerStore = useDatePickerStore()

const pickerIsShown = ref<boolean>(false)
const reference = ref(null)
const floatingPicker = ref(null)
const middleware = ref([offset(10)])

const { floatingStyles } = useFloating(reference, floatingPicker, { middleware })
const { date } = storeToRefs(datePickerStore)

onMounted(() => {
  datePickerStore.generate((new Date()).toDateString())
})

onUnmounted(() => {
  datePickerStore.unload()
})
</script>

<template>
  <div>
    <Controls
      ref="reference"
      :model-value="getFormattedDate(date ?? new Date())"
      :picker-is-shown="pickerIsShown"
      @click-show-button="() => pickerIsShown = true"
    />
    <Picker
      v-if="pickerIsShown"
      ref="floatingPicker"
      v-click-outside="() => pickerIsShown = false"
      :style="floatingStyles"
      @pick-date="pickerIsShown = false"
    />
  </div>
</template>
