import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'

export default class Anim extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ reflect: true })
  duration?: string | number | CSSNumericValue

  protected keyframes: Keyframe[] | PropertyIndexedKeyframes | null 
  protected options?: number | KeyframeAnimationOptions

  constructor(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: number | KeyframeAnimationOptions) {
    super()

    this.keyframes = keyframes
    this.options = options

    if (typeof this.options !== 'number') this.duration = this.options?.duration
  }

  play(): Animation {
    const anim = this.animate(this.keyframes, typeof this.options === 'number' ? this.options : {
      ...this.options,
      duration: this.duration,
    })

    return anim
  }

  finish() {
    this.getAnimations().map(anim => anim.finish())
  }

  protected render() {
    return html`<slot></slot>`
  }
}

