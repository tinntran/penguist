import type { Present } from '../elements'

export default function defaultShortcuts(present: Present) {
  document.addEventListener('keydown', e => {
    const selectedSlide = present.getCurrentSlide()

    if (e.key === 'Enter' || e.key === 'ArrowRight') {
      const shouldNavigate = selectedSlide?.playNextAnim()

      if (shouldNavigate && present.selectedIndex < present.slotNames.length - 1) present.selectedIndex++
    } else if (e.key === 'ArrowLeft' && present.selectedIndex > 0) {
      present.selectedIndex--
    }
  })

  document.addEventListener('mousedown', e => {
    const selectedSlide = present.getCurrentSlide()

    if (e.button === 0) {
      const shouldNavigate = selectedSlide?.playNextAnim() && !present.isInteractiveClicked

      if (shouldNavigate && present.selectedIndex < present.slotNames.length - 1) present.selectedIndex++
    }

    present.isInteractiveClicked = false
  })
}

