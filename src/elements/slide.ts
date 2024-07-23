import { html, LitElement } from 'lit'
import { v4 } from 'uuid'
import { SLIDE_SELECTED, SLIDE_UNSELECTED } from '../events'
import type Anim from './anim'
import { property } from 'lit/decorators.js'

export default class Slide extends LitElement {
  @property({ attribute: false })
  remainingAnims = 0

  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
  }

  getAnims() {
    return this.querySelectorAll<Anim>('[anim-id]')
  }

  private playAnim(anim: Anim, next?: Anim) {
    function slideUnselected(reject: (reason?: unknown) => void) {
      reject("The animation has been stopped")
    }

    return new Promise<void>((resolve, reject) => {
      this.addEventListener(SLIDE_UNSELECTED, () => slideUnselected(reject))

      const playingAnim = anim.play()

      if (next?.start === 'after-prev') {
        playingAnim.finished.then(() => resolve())
      } else if (next?.start === 'with-prev' || !next) {
        resolve()
      }

      playingAnim.finished
        .then(() => this.remainingAnims--)
        .then(() => anim.removeEventListener(SLIDE_UNSELECTED, () => slideUnselected(reject)))
    })
  }

  protected async slideSelected() {
    const animEls = Array.from(this.getAnims())

    this.remainingAnims = animEls.length

    animEls.map(anim => anim.beforePlaying())

    for (const [i, anim] of animEls.entries()) {
      const next = animEls[i + 1]

      await this.playAnim(anim, next)
    }
  }

  protected slideUnselected() {}

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

