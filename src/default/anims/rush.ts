import type { Anim } from '../../elements'
import { anim } from '../../fun'

function getTranslation(rush: Anim) {
  let angle: string

  if (!rush.getAttribute('data-angle')) rush.setAttribute('data-angle', 'up')

  angle = rush.getAttribute('data-angle') as string

  const translate = (x: number, y: number) => `${x}px ${y}px`

  switch (angle) {
    case 'up':
      return translate(0, window.innerHeight)

    case 'down':
      return translate(0, -window.innerHeight)

    case 'left':
      return translate(-window.innerWidth, 0)

    case 'right':
      return translate(window.innerWidth, 0)

    default:
      return translate(0, 0)
  }
}

const opts: KeyframeAnimationOptions = {
  duration: 500,
  easing: 'ease'
}

function beforePlaying(rush: Anim) {
  const translate = getTranslation(rush)

  rush.keyframes = [
    {
      translate
    },
    {
      translate: '0'
    },
  ]

  if (rush.direction === 'normal' || rush.direction === 'alternate' || !rush.direction) {
    rush.style.translate = translate
  } else {
    rush.style.translate = ''
  }
}

function whenPlaying(anim: Animation, rush: Anim) {
  anim.finished.then(() => {
    const translate = getTranslation(rush)

    if (rush.direction === 'reverse' || rush.direction === 'alternate-reverse') {
      rush.style.translate = translate
    } else {
      rush.style.translate = ''
    }
  })
}

export const rush = anim('rush')
  .opts(opts)
  .beforePlaying(beforePlaying)
  .whenPlaying(whenPlaying)

export default rush.configureTargetElement()

