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
  .onplay((anim, fade) => {
    if (fade.direction === 'reverse' || fade.direction === 'alternate-reverse') {
      anim.finished.then(() => fade.style.opacity = '0')
    }
  })
  .opts({
    duration: 1000
  })

export default fadeCreator.define()

