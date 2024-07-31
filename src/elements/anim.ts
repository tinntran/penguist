import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { v4 } from 'uuid'

export type AnimStart = 'on-click' | 'with-prev' | 'after-prev'

export default class Anim extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `

  @property({ reflect: true })
  start: AnimStart = 'on-click'

  @property({ attribute: 'anim-id', reflect: true })
  animId = v4()

  @property({ reflect: true })
  duration?: string | number | CSSNumericValue

  @property({ type: Number, reflect: true })
  delay?: number

  @property({ type: Number, reflect: true })
  iterations?: number

  @property({ reflect: true })
  direction?: PlaybackDirection

  finished: Promise<Animation | undefined> = Promise.resolve(undefined)

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

  beforePlaying() {}

  whenPlaying(_anim: Animation) {}

  play(): Animation {
    const anim = this.animate(this.keyframes, {
      ...this.options,
      id: this.animId,
      duration: !Number.isNaN(this.duration) ? Number(this.duration) : this.duration,
      delay: this.delay,
      iterations: this.iterations,
      direction: this.direction,
    })

    anim.finished.then(() => this.finish())

    this.finished = anim.finished
    this.whenPlaying(anim)

    return anim
  }

  finish() {
    if (this.iterations === Number.POSITIVE_INFINITY) return

    this.getAnimations().map(anim => anim.finish())
  }

  pause() {
    this.getAnimations().map(anim => anim.pause())
  }

  cancel() {
    this.getAnimations().map(anim => anim.cancel())
  }

  protected render() {
    return html`<slot></slot>`
  }
}

