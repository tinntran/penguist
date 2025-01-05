import { LitElement, type PropertyValues } from 'lit'
import { v4 } from 'uuid'
import { SLIDE_SELECTED_EVENT, SLIDE_UNSELECTED_EVENT } from '../events'
import type { AnimPlayer } from '../utils'
import { property } from 'lit/decorators.js'
import { animRegistry } from '../registries'
import type Anim from './anim'

export default class Slide extends LitElement implements AnimPlayer {
  @property()
  template?: string

  animGroups: Generator<Anim[], void> | null = null
  prevAnimGroup: Anim[] | null = null

  private animGroupArray: Anim[][] = []

  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
  }

  protected slideSelected() {
    const anims = this.getAnims()

    anims.map(anim => anim.beforePlaying())

    this.animGroups = this.getAnimGroups(anims)

    this.animGroupArray = Array.from(this.getAnimGroups(anims))

    this.animGroupArray.map((animGroup) => {
      if (animGroup[0].start === 'with-prev') {
        this.playNextAnim()
      }
    })
  }

  protected slideUnselected() {
    this.getAnims().map(anim => anim.finish())
  }

  protected willUpdate(_changedProperties: PropertyValues) {
    super.willUpdate(_changedProperties)

    if (this.template) {
      const template = document.querySelector(`template[data-name="${this.template}"]`)

      if (this.shadowRoot && template) this.shadowRoot.innerHTML = template.innerHTML
    } else {
      if (this.shadowRoot) this.shadowRoot.innerHTML = '<slot></slot>'
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener(SLIDE_SELECTED_EVENT, this.slideSelected)
    this.addEventListener(SLIDE_UNSELECTED_EVENT, this.slideUnselected)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener(SLIDE_SELECTED_EVENT, this.slideSelected)
    this.removeEventListener(SLIDE_UNSELECTED_EVENT, this.slideUnselected)
  }

  getAnims() {
    const animQuery = animRegistry.getQueryString()

    if (animQuery === '') return []

    if (this.shadowRoot) return Array.from(this.shadowRoot.querySelectorAll<Anim | HTMLSlotElement>(`${animQuery}, slot:not([name])`)).flatMap(el => {
      if (el instanceof HTMLSlotElement) return Array.from(this.querySelectorAll<Anim>(animQuery))
      return el
    })

    return Array.from(this.querySelectorAll<Anim>(animQuery))
  }

  *getAnimGroups(anims?: Anim[]) {
    let group: Anim[] = []

    const arr = anims ? anims : this.getAnims()

    for (let i = 0; i < arr.length; i++) {
      const anim = arr[i]

      if (anim.start === 'on-click') {
        if (group.length > 0) yield group

        group = [anim]
      } else {
        group.push(anim)
      }

      if (i === arr.length - 1) {
        yield group
      }
    }
  }

  playNextAnim() {
    if (this.prevAnimGroup) for (const anim of this.prevAnimGroup) {
      if (anim.getAnimations().some(anim => anim.playState === 'running') && anim.iterations !== Number.POSITIVE_INFINITY) {
        anim.finish()

        return false
      }
    }

    const currentAnim = this.animGroups?.next()

    if (currentAnim?.value) {
      currentAnim.value.map(anim => anim.play())

      this.prevAnimGroup = currentAnim.value

      return currentAnim.done ? currentAnim.done : false
    }

    return true
  }
}

