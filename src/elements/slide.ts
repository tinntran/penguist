import { html, LitElement } from 'lit'
import { v4 } from 'uuid'
import { SLIDE_SELECTED, SLIDE_UNSELECTED } from '../events'
import Anim from './anim'

export default class Slide extends LitElement {
  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
  }

  protected slideSelected() {
    Array.from(this.querySelectorAll<Anim>('[anim-id]'), anim => anim.play())
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

