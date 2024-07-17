import { Anim } from '../elements'
import Creator from './creator'

export class AnimCreator extends Creator {
  private keyframes: Keyframe[] | PropertyIndexedKeyframes | null = null
  private options?: number | KeyframeAnimationOptions
  private onplayFunc?: (anim: Animation) => void

  frames(keyframes: Keyframe[] | PropertyIndexedKeyframes | null) {
    this.keyframes = keyframes

    return this
  }

  opts(options: number | KeyframeAnimationOptions) {
    this.options = options

    return this
  }

  onplay(onplayFunc: (anim: Animation) => void) {
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

        if (onplayFunc) onplayFunc(anim)

        return anim
      }
    }
  }

  define(prefix: string = 'panim'): CustomElementConstructor | undefined {
    return super.define(prefix)
  }
}

export default function anim(name: string) {
  return new AnimCreator(name)
}

