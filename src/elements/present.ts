import { css, html, LitElement, type PropertyValues } from 'lit'
import { property, state } from 'lit/decorators.js'
import type Slide from './slide'
import defaultShortcuts from '../defaultShortcuts'

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

  @state()
  protected selectedSlotName?: string

  constructor() {
    super()

    this.useShortcuts()
  }

  protected useShortcuts() {
    defaultShortcuts(this)
  }

  protected willUpdate(changedProperties: PropertyValues): void {
    super.willUpdate(changedProperties)

    if (changedProperties.get('selectedIndex') !== this.selectedIndex) {
      this.selectedSlotName = this.slotNames[this.selectedIndex]
    }
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

