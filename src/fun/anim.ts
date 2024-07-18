import { Anim } from '../elements'
import Creator from './creator'

export class AnimCreator extends Creator {
  private keyframes: Keyframe[] | PropertyIndexedKeyframes | null = null
  private options?: KeyframeAnimationOptions
  private onplayFunc?: (anim: Animation, element: Anim) => void

  frames(keyframes: Keyframe[] | PropertyIndexedKeyframes | null) {
    this.keyframes = keyframes

    return this
  }

  opts(options: KeyframeAnimationOptions) {
    this.options = options

    return this
  }

  onplay(onplayFunc: (anim: Animation, element: Anim) => void) {
    this.onplayFunc = onplayFunc

    return this
  }

  protected willDefine() {
    super.willDefine()

    const keyframes = this.keyframes
    const onplayFunc = this.onplayFunc
    const options = this.options

    this.targetElement = class extends Anim {
      constructor() {
        super(keyframes, options)
      }

      play(): Animation {
        const anim = super.play()

        if (onplayFunc) onplayFunc(anim, this)

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

