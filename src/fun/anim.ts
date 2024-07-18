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

  protected willDefine() {
    super.willDefine()

    const keyframes = this.keyframes
    const whenPlayingFunc = this.whenPlayingFunc
    const beforePlayingFunc = this.beforePlayingFunc
    const options = this.options

    this.targetElement = class extends Anim {
      constructor() {
        super(keyframes, options)
      }

      play(): Animation {
        if (beforePlayingFunc) beforePlayingFunc(this)

        const anim = super.play()

        if (whenPlayingFunc) whenPlayingFunc(anim, this)

        return anim
      }
    }
  }

  define(prefix = 'panim'): CustomElementConstructor | undefined {
    return super.define(prefix)
  }
}

export default function anim(name: string) {
  return new AnimCreator(name)
}

