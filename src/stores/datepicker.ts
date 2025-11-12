import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { isValidDate, getDaysInMonth } from '@/utils/date'
import { useI18n } from 'vue-i18n'

type CellType = 'week' | 'day'

interface WeekDay {
  titleShort: string
  titleFull: string
}

interface CellOpts {
  selected: boolean
  currentDay: boolean
  date: Date
}

export interface Cell {
  type: CellType
  title: string
  opts: CellOpts | null
}

interface DatePickerStore {
  date: Ref<Date | null>
  cells: Ref<Cell[][]>
  validatyError: Ref<boolean>
  weekRow: ComputedRef<Cell[]>
  generate: (dateStr: string) => void
  move: (delta: number) => void
  unload: () => void
}

export const useDatePickerStore = defineStore('date-picker', (): DatePickerStore => {
  const { t } = useI18n()
  const date = ref<Date | null>(null)
  const cells = ref<Cell[][]>([])
  const validatyError = ref<boolean>(false)

  const weekDays = computed((): WeekDay[] => [
    { titleShort: t('days.monday.short'), titleFull: t('days.monday.full') },
    { titleShort: t('days.tuesday.short'), titleFull: t('days.tuesday.full') },
    { titleShort: t('days.wednesday.short'), titleFull: t('days.wednesday.full') },
    { titleShort: t('days.thursday.short'), titleFull: t('days.thursday.full') },
    { titleShort: t('days.friday.short'), titleFull: t('days.friday.full') },
    { titleShort: t('days.saturday.short'), titleFull: t('days.saturday.full') },
    { titleShort: t('days.sunday.short'), titleFull: t('days.sunday.full') },
  ])


  const weekRow = computed<Cell[]>(() =>
    weekDays.value.map((w) => ({ type: 'week', title: w.titleShort, opts: null }))
  )

  const sameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()

  const mondayIndex = (day: number) => (day + 6) % 7

  const generate = (dateStr: string): void => {
    if (!isValidDate(dateStr)) {
      validatyError.value = true
      return
    }

    validatyError.value = false

    date.value = new Date(dateStr)

    const year = date.value.getFullYear()
    const month = date.value.getMonth()
    const daysInMonth = getDaysInMonth(date.value)

    const firstOfMonth = new Date(year, month, 1)
    const offset = mondayIndex(firstOfMonth.getDay())
    const today = new Date()

    const weeks: Cell[][] = []
    let row: Cell[] = []

    for (let i = 0; i < offset; i++) {
      row.push({ type: 'day', title: '', opts: null })
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const cellDate = new Date(year, month, day)

      row.push({
        type: 'day',
        title: String(day),
        opts: {
          selected: sameDay(cellDate, date.value),
          currentDay: sameDay(cellDate, today),
          date: cellDate,
        },
      })

      if (row.length === 7) {
        weeks.push(row)
        row = []
      }
    }

    if (row.length) {
      while (row.length < 7) {
        row.push({ type: 'day', title: '', opts: null })
      }
      weeks.push(row)
    }

    cells.value = weeks
  }

  const move = (delta: number): void => {
    const selectedDate = date.value ?? new Date()
    const next = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + delta, selectedDate.getDate())

    generate(next.toDateString())
  }

  const unload = () => {
    date.value = null
    cells.value = []
    validatyError.value = false
  }

  return {
    date,
    cells,
    validatyError,
    weekRow,
    generate,
    move,
    unload,
  }
})
