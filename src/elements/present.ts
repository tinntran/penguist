import { css, html, LitElement, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import type Slide from './slide'
import defaultShortcuts from '../default/shortcuts'
import { SlideSelectedEvent, SlideUnselectedEvent } from '../events'

export default class Present extends LitElement {
  static styles = css`
    :host {
      user-select: none;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
    }
  `

  @property({ attribute: 'selected-index', reflect: true })
  selectedIndex = 0

  @property({ attribute: false })
  slotNames: string[] = []

  @property({ attribute: false })
  selectedSlotName?: string

  constructor() {
    super()

    this.useShortcuts()
  }

  getCurrentSlide() {
    return this.querySelector<Slide>(`p-slide[slot="${this.selectedSlotName}"]`)
  }

  protected useShortcuts() {
    defaultShortcuts(this)
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties)

    if (changedProperties.get('selectedIndex') !== this.selectedIndex) {
      this.selectedSlotName = this.slotNames[this.selectedIndex]
    }

    const selectedSlide = this.getCurrentSlide()
    const unselectedSlide = this.querySelector<Slide>(`p-slide[slot="${changedProperties.get('selectedSlotName')}"]`)

    selectedSlide?.dispatchEvent(new SlideSelectedEvent({
      bubbles: true,
      composed: true,
      detail: selectedSlide
    }))

    unselectedSlide?.dispatchEvent(new SlideUnselectedEvent({
      bubbles: true,
      composed: true,
      detail: unselectedSlide
    }))
  }

  protected firstUpdated(changedProperties: PropertyValues): void {
    super.firstUpdated(changedProperties)
    
    Array.from(document.querySelectorAll<Slide>('p-present > p-slide'), slide => {
      this.slotNames.push(slide.slot)
    })

    this.selectedSlotName = this.slotNames[this.selectedIndex]
  }

  protected render() {
    return html`<slot name=${this.selectedSlotName}></slot>`
  }
}

