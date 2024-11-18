import type { Present } from '../elements'
import { SLIDE_SELECTED, SlideSelectedEvent } from '../events'

export default function defaultShortcuts(present: Present) {
  //function shouldNavigate() {
  //  const selectedSlide = document.querySelector<Slide>(`p-slide[slot="${present.selectedSlotName}"]`)
  //
  //  if (selectedSlide) {
  //    const anims = selectedSlide.getAnims()
  //    const animGroups = selectedSlide.getAnimGroups(anims)
  //
  //    if (selectedSlide.finishedAnims === anims.length - anims.filter(anim => anim.iterations === Number.POSITIVE_INFINITY).length) return true
  //
  //    const currentGroup = animGroups.at(selectedSlide.finishedAnims)
  //
  //    currentGroup?.map(anim => {
  //      const animations = anim.getAnimations()
  //
  //      if (animations.some(anim => anim.playState === 'running')) {
  //        anim.finish()
  //      } else if (anim.start === 'on-click') {
  //        anim.getAnimations().map(anim => anim.play())
  //      }
  //    })
  //  }
  //
  //  return false
  //}

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

