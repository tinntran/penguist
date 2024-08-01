import type { PropertyValues } from 'lit'
import { state } from 'lit/decorators.js'
import Mustache from 'mustache'
import { AnimPlayableLitElement } from '../utils'
import type Anim from './anim'
import { animRegistry } from '../registries'

export default class Template extends AnimPlayableLitElement {
  @state()
  protected viewAttributes: object = {}

  @state()
  protected template = ''

  private snakeToCamel(str: string): string {
    return str.replace(/([-][a-z])/g, group =>
      group
        .toUpperCase()
        .replace('-', '')
    )
  }

  getAnims() {
    if (this.shadowRoot) {
      return Array.from(this.shadowRoot.querySelectorAll<Anim>(animRegistry.getQueryString()))
    }

    return []
  }

  connectedCallback() {
    super.connectedCallback()

    for (let i = 0; i < this.attributes.length; i++) {
      this.viewAttributes = {
        ...this.viewAttributes,
        [this.snakeToCamel(this.attributes[i].name.replace(/^view-/, ''))]: this.attributes[i].value
      }
    }
  }

  protected willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties)

    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = Mustache.render(this.template, this.viewAttributes)
    }
  }
}


