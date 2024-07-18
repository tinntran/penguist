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

  @property({ type: Number, reflect: true })
  delay?: number

  @property({ type: Number, reflect: true })
  iterations?: number

  @property({ reflect: true })
  direction?: PlaybackDirection

  protected keyframes: Keyframe[] | PropertyIndexedKeyframes | null 
  protected options?: KeyframeAnimationOptions

  constructor(keyframes: Keyframe[] | PropertyIndexedKeyframes | null, options?: KeyframeAnimationOptions) {
    super()

    this.keyframes = keyframes
    this.options = options

    this.duration = this.options?.duration
    this.delay = this.options?.delay
    this.iterations = this.options?.iterations
    this.direction = this.options?.direction
  }

  play(): Animation {
    const anim = this.animate(this.keyframes, {
      ...this.options,
      duration: this.duration,
      delay: this.delay,
      iterations: this.iterations,
      direction: this.direction,
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

