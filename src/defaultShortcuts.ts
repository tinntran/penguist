import type { Present } from './elements'

export default function defaultShortcuts(present: Present) {
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === 'ArrowRight') && present.selectedIndex < present.slotNames.length - 1) {
      present.selectedIndex++
    } else if (e.key === 'ArrowLeft' && present.selectedIndex > 0) {
      present.selectedIndex--
    }
  })

  document.addEventListener('mousedown', e => {
    if (e.button === 0 && present.selectedIndex < present.slotNames.length - 1) {
      present.selectedIndex++
    }
  })
}

