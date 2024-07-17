import { Anim } from './elements'

export default function createAnim(name: string, keyframes?: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions): typeof Anim {
  class MyAnim extends Anim {
    constructor() {
      super(keyframes ? keyframes : [], options)
    }
  }

  if (keyframes) customElements.define(`panim-${name}`, MyAnim)

  return MyAnim
}

