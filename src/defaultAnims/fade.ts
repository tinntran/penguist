import { anim } from '../fun'

export const fadeCreator = anim('fade')
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
    duration: 1000
  })

export default fadeCreator.define()

