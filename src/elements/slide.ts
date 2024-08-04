import { html } from 'lit'
import { v4 } from 'uuid'
import { SLIDE_SELECTED, SLIDE_UNSELECTED } from '../events'
import { AnimPlayableLitElement } from '../utils'
import { templateRegistry } from '../registries'
import type Template from './template'

export default class Slide extends AnimPlayableLitElement {
  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
  }

  protected async slideSelected() {
    const tempQuery = templateRegistry.getQueryString()
    const templates = tempQuery !== '' ? Array.from(document.querySelectorAll<Template>(tempQuery), temp => temp.playAnims()) : []

    await Promise.all([this.playAnims(), ...templates])
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

