import { css, html, LitElement } from 'lit'
import { property } from 'lit/decorators.js'
import { v4 } from 'uuid'

export type AnimStart = 'on-click' | 'with-prev'

export default class Anim extends LitElement {
  @property({ reflect: true })
  start: AnimStart = 'on-click'

  @property({ attribute: 'anim-id' })
  animId = v4()

  @property({ reflect: true })
  duration?: string | number | CSSNumericValue

  @property({ type: Number, reflect: true })
  delay?: number

  @property({ type: Number, reflect: true })
  iterations?: number

  @property({ reflect: true })
  direction?: PlaybackDirection

  @property({ reflect: true })
  easing?: string

  finished: Promise<Animation | undefined> = Promise.resolve(undefined)

  constructor(public keyframes: Keyframe[] | PropertyIndexedKeyframes | null, protected options?: KeyframeAnimationOptions) {
    super()

    this.duration = this.options?.duration
    this.delay = this.options?.delay
    this.iterations = this.options?.iterations
    this.direction = this.options?.direction
    this.easing = this.options?.easing
  }

  beforePlaying() {}

  whenPlaying(_anim: Animation) {}

  play() {
    const anim = this.animate(this.keyframes, {
      ...this.options,
      id: this.animId,
      duration: Number.isNaN(this.duration) ? this.duration : Number(this.duration),
      delay: this.delay,
      iterations: this.iterations,
      direction: this.direction,
      easing: this.easing
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

