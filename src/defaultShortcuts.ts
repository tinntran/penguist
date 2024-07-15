import type { Present } from './elements'

export default function defaultShortcuts(present: Present) {
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === 'ArrowRight') && present.selectedIndex < present.slotNames.length -1) {
      present.selectedIndex++
    }
  })
}

