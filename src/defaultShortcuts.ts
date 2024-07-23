import type { Present, Slide, Anim } from './elements'

function groupAnims(anims: Anim[]) {
  const result: Anim[][] = [] 
  let currentGroup: Anim[] = []

  anims.map(anim => {
    if (anim.start === 'after-prev') {
      if (currentGroup.length > 0) {
        result.push(currentGroup);
        currentGroup = [];
      }

      result.push([anim])
    } else if (anim.start === 'with-prev') {
      currentGroup.push(anim)
    }
  })

  if (currentGroup.length > 0) {
    result.push(currentGroup)
  }

  return result 
}

export default function defaultShortcuts(present: Present) {
  let i = 0

  function shouldNavigate() {
    const selectedSlide = document.querySelector<Slide>(`p-slide[slot="${present.selectedSlotName}"]`) 

    if (selectedSlide && selectedSlide.remainingAnims > 0) {
      const anims = groupAnims(Array.from(selectedSlide.getAnims()))

      anims[i].map(anim => anim.finish())

      i++

      return false
    }

    i = 0

    return true
  }

  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === 'ArrowRight') && present.selectedIndex < present.slotNames.length - 1 && shouldNavigate()) {
      present.selectedIndex++
    } else if (e.key === 'ArrowLeft' && present.selectedIndex > 0) {
      present.selectedIndex--
    }
  })

  document.addEventListener('mousedown', e => {
    if (e.button === 0) {
      if (present.selectedIndex < present.slotNames.length - 1 && shouldNavigate()) {
        present.selectedIndex++
      }
    }
  })
}

