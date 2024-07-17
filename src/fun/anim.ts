import { Anim } from '../elements'
import Creator from './creator'

export class AnimCreator extends Creator {
  private keyframes: Keyframe[] | PropertyIndexedKeyframes | null = null
  private options?: number | KeyframeAnimationOptions

  frames(keyframes: Keyframe[] | PropertyIndexedKeyframes | null) {
    this.keyframes = keyframes

    return this
  }

  opts(options: number | KeyframeAnimationOptions) {
    this.options = options

    return this
  }
  
  protected willDefine() {
    super.willDefine()

    const keyframes = this.keyframes
    const options = this.options

    this.targetElement = class extends Anim {
      constructor() {
        super(keyframes, options)
      }
    }
  }

  define(prefix: string = 'panim') {
    super.define(prefix)
  }
}

export default function anim(name: string) {
  return new AnimCreator(name)
}

