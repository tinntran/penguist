import type { Present } from '../elements'

export default function defaultShortcuts(present: Present) {
  document.addEventListener('keydown', e => {
    const selectedSlide = present.getCurrentSlide()

    if ((e.key === 'Enter' || e.key === 'ArrowRight') && present.selectedIndex < present.slotNames.length - 1) {
      const shouldNavigate = selectedSlide?.playNextAnim()

      if (shouldNavigate) present.selectedIndex++
    } else if (e.key === 'ArrowLeft' && present.selectedIndex > 0) {
      present.selectedIndex--
    }
  })

  document.addEventListener('mousedown', e => {
    const selectedSlide = present.getCurrentSlide()

    if (e.button === 0 && present.selectedIndex < present.slotNames.length - 1) {
      const shouldNavigate = selectedSlide?.playNextAnim()

      if (shouldNavigate) present.selectedIndex++
    }
  })
}

