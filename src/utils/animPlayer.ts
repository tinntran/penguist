import { LitElement } from 'lit'
import type { Anim } from '../elements'
import { animRegistry } from '../registries'
import { property } from 'lit/decorators.js'

export default interface AnimPlayer {
  finishedAnims: number,
  getAnims(): void,
  getAnimGroups(anim?: Anim[]): Anim[][],
  playAnims(): Promise<void>
}

export abstract class AnimPlayableLitElement extends LitElement {
  @property({ attribute: false })
  finishedAnims = 0

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
}

