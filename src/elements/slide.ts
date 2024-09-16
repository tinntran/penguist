import { html, LitElement } from 'lit'
import { v4 } from 'uuid'
import { SLIDE_SELECTED, SLIDE_UNSELECTED } from '../events'
import type { AnimPlayer } from '../utils'
import { property } from 'lit/decorators.js'
import { animRegistry } from '../registries'
import type Anim from './anim'

export default class Slide extends LitElement implements AnimPlayer {
  @property({ attribute: false })
  finishedAnims = 0

  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
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

  getAnims() {
    const animQuery = animRegistry.getQueryString()

    return animQuery !== '' ? Array.from(this.querySelectorAll<Anim>(animQuery)) : []
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

  async playAnims() {
    const animEls = this.getAnims()
    const groupedAnimEls = this.getAnimGroups(animEls)

    animEls.map(anim => anim.beforePlaying())

    for (const anims of groupedAnimEls) {
      const finishedPromises = anims.map(async anim => {
        const playingAnim = anim.play()

        if (anim.iterations === Number.POSITIVE_INFINITY) return

        playingAnim.finished.then(() => this.finishedAnims++)

        if (anim.start === 'on-click') anim.pause()

        return playingAnim.finished
      })

      await Promise.all(finishedPromises)
    }
  }


  protected render() {
    return html`<slot></slot>`
  }
}

