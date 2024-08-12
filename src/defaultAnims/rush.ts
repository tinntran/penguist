import { anim } from '../fun'

export const rush = anim('rush')
  .beforePlaying(rush => {
    rush.keyframes = [
      {
        translate: `0 ${window.innerHeight - rush.getBoundingClientRect().y}px` 
      },
      {
        translate: '0'
      },
    ]

    if (rush.direction === 'normal' || rush.direction === 'alternate' || !rush.direction) {
      rush.style.translate = `0 ${window.innerHeight - rush.getBoundingClientRect().y}px` 
    } else {
      rush.style.translate = ''
    }
  })
  .whenPlaying((anim, rush) => {
    anim.finished.then(() => {
      if (rush.direction === 'reverse' || rush.direction === 'alternate-reverse') {
        rush.style.translate = `0 ${window.innerHeight - rush.getBoundingClientRect().y}px` 
      } else {
        rush.style.translate = ''
      }
    })
  })
  .opts({
    duration: 500,
    easing: 'ease'
  })

export default rush.configureTargetElement()

