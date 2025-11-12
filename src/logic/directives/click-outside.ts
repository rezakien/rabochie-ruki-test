import type { Directive } from 'vue'

export const clickOutside: Directive = {
  beforeMount: (el, binding) => {
    console.log(el)
    el.clickOutsideEvent = (event: Event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value()
      }
    }
    setTimeout(() => document.addEventListener('click', el.clickOutsideEvent), 0)
  },
  unmounted: (el) => {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
