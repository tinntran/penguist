import { html, LitElement } from 'lit'
import { v4 } from 'uuid'
import { SLIDE_SELECTED, SLIDE_UNSELECTED } from '../events'
import type Anim from './anim'
import { property } from 'lit/decorators.js'

export default class Slide extends LitElement {
  @property({ attribute: false })
  remainingAnimation = 0

  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
  }

  private playAnim(anim: Anim) {
    anim.play().finished.then(() => this.remainingAnimation--)
  }

  protected slideSelected() {
    const animEls = this.querySelectorAll<Anim>('[anim-id]')

    this.remainingAnimation = animEls.length

    Array.from(animEls, (anim, i) => {
      const prev = animEls[i - 1]

      anim.beforePlaying()

      if (anim.start === 'on-click') {
        console.warn('TODO: NOT IMPLEMENTED')

      } else if (anim.start === 'after-prev') {
        if (prev && !Number.isNaN(Number(prev.duration))) setTimeout(() => this.playAnim(anim), Number(prev.duration))
        else this.playAnim(anim)

      } else {
        this.playAnim(anim)
      }
    })
  }

  protected slideUnselected() {
    Array.from(this.querySelectorAll<Anim>('[anim-id]'), anim => anim.finish())
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener(SLIDE_SELECTED, this.slideSelected)
    this.addEventListener(SLIDE_UNSELECTED, this.slideUnselected)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener(SLIDE_SELECTED, this.slideSelected)
    this.removeEventListener(SLIDE_UNSELECTED, this.slideUnselected)
  }

  protected render() {
    return html`<slot></slot>`
  }
}

