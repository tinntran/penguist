import type { Anim } from '../elements'
import { anim } from '../fun'

const frames: Keyframe[] = [
  {
    opacity: '0'
  },
  {
    opacity: '1'
  }
]

const opts: KeyframeAnimationOptions = {
  duration: 500
}

function beforePlaying(fade: Anim) {
  if (fade.direction === 'normal' || fade.direction === 'alternate' || !fade.direction) {
    fade.style.opacity = '0'
  } else {
    fade.style.opacity = ''
  }
}

function whenPlaying(anim: Animation, fade: Anim) {
  anim.finished.then(() => {
    if (fade.direction === 'reverse' || fade.direction === 'alternate-reverse') {
      fade.style.opacity = '0'
    } else {
      fade.style.opacity = ''
    }
  })
}

export const fade = anim('fade')
  .frames(frames)
  .opts(opts)
  .beforePlaying(beforePlaying)
  .whenPlaying(whenPlaying)

export default fade.configureTargetElement()

