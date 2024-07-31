import { Anim } from '../elements'
import Creator from './creator'

export class AnimCreator extends Creator {
  private keyframes: Keyframe[] | PropertyIndexedKeyframes | null = null
  private options?: KeyframeAnimationOptions
  private whenPlayingFunc?: (anim: Animation, element: Anim) => void
  private beforePlayingFunc?: (element: Anim) => void

  frames(keyframes: Keyframe[] | PropertyIndexedKeyframes | null) {
    this.keyframes = keyframes

    return this
  }

  opts(options: KeyframeAnimationOptions) {
    this.options = options

    return this
  }

  beforePlaying(beforePlayingFunc: (element: Anim) => void) {
    this.beforePlayingFunc = beforePlayingFunc

    return this
  }

  whenPlaying(whenPlayingFunc: (anim: Animation, element: Anim) => void) {
    this.whenPlayingFunc = whenPlayingFunc

    return this
  }

  configureTargetElement(): CustomElementConstructor | undefined {
    const { keyframes, options, beforePlayingFunc, whenPlayingFunc } = this

    return class extends Anim {
      constructor() {
        super(keyframes, options)
      }

      beforePlaying() {
        if (beforePlayingFunc) beforePlayingFunc(this)
      }

      whenPlaying(anim: Animation) {
        if (whenPlayingFunc) whenPlayingFunc(anim, this)
      }

      play(): Animation {
        return super.play()
      }
    }
  }

  define(prefix = 'panim'): CustomElementConstructor {
    return super.define(prefix)
  }
}

export default function anim(name: string) {
  return new AnimCreator(name)
}

