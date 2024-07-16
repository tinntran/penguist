import { LitElement } from 'lit'
import { Template } from './elements'

export default function createTemplate(name: string, template: string): typeof LitElement {
  class MyTemplate extends Template {
    constructor() {
      super()
      this.template = template
    }
  }

  customElements.define(`ptemp-${name}`, MyTemplate)

  return MyTemplate
}

