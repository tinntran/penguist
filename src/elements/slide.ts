import { html, LitElement } from 'lit'
import { v4 } from 'uuid'
import { SLIDE_SELECTED, SLIDE_UNSELECTED } from '../events'
import type Anim from './anim'
import { property } from 'lit/decorators.js'

export default class Slide extends LitElement {
  @property({ attribute: false })
  finishedAnims = 0

  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
  }

  getAnims() {
    return Array.from(this.querySelectorAll<Anim>('[anim-id]'))
  }

  getAnimGroups(anims?: Anim[]) {
    const result: Anim[][] = []
    let group: Anim[] = []

    const arr = anims ? anims : this.getAnims()

    arr.map((anim, i, anims) => {
      if (anim.start === 'after-prev' || anim.start === 'on-click') {
        if (group.length > 0) result.push(group)

        group = [anim]
      } else if (anim.start === 'with-prev') {
        group.push(anim)
      }

      if (i === anims.length - 1) {
        result.push(group)
      }
    })

    return result
  }

  protected async playAnims() {
    const animEls = this.getAnims()
    const groupedAnimEls = this.getAnimGroups(animEls)

    animEls.map(anim => anim.beforePlaying())

    for (const anims of groupedAnimEls) {
      const finishedPromises = anims.map(async anim => {
        const playingAnim = anim.play()

        if (anim.start !== 'on-click' && anim.iterations === Number.POSITIVE_INFINITY) this.finishedAnims++
        else playingAnim.finished.then(() => this.finishedAnims++)

        if (anim.start === 'on-click') anim.pause()

        return playingAnim.finished
      })

      await Promise.all(finishedPromises)
    }
  }

  protected async slideSelected() {
    await this.playAnims()
  }

  protected slideUnselected() {
    this.finishedAnims = 0

    this.getAnims().map(anim => anim.finish())
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

