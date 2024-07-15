import { html, LitElement } from 'lit'
import { v4 } from 'uuid'

export default class Slide extends LitElement {
  constructor() {
    super()
    this.slot = this.slot ? this.slot : v4()
  }

  protected render() {
    return html`<slot></slot>`
  }
}

