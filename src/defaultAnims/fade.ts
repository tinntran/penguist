import { anim } from '../fun'

export const fade = anim('fade')
  .frames([
    {
      opacity: '0'
    },
    {
      opacity: '1'
    }
  ])
  .beforePlaying(fade => {
    if (fade.direction === 'normal' || fade.direction === 'alternate' || !fade.direction) {
      fade.style.opacity = '0'
    } else {
      fade.style.opacity = ''
    }
  })
  .whenPlaying((anim, fade) => {
    anim.finished.then(() => {
      if (fade.direction === 'reverse' || fade.direction === 'alternate-reverse') {
        fade.style.opacity = '0'
      } else {
        fade.style.opacity = ''
      }
    })
  })
  .opts({
    duration: 500
  })

export default fade.configureTargetElement()

