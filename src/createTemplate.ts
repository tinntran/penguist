import { LitElement, type PropertyValues } from 'lit'
import { property } from 'lit/decorators.js'
import Mustache from 'mustache'

export default function createTemplate(name: string, template: string): typeof LitElement {
  class Template extends LitElement {
    @property({ attribute: false })
    viewAttributes: object = {}

    protected willUpdate(changedProperties: PropertyValues) {
      super.willUpdate(changedProperties)

      for (let i = 0; i < this.attributes.length; i++) {
        this.viewAttributes = {
          ...this.viewAttributes,
          [this.attributes[i].name
            .replace(/^view-/, '')
            .replace(/([-][a-z])/g, group =>
              group
                .toUpperCase()
                .replace('-', '')
            )
          ]: this.attributes[i].value
        }
      }
    }

    protected update(changedProperties: PropertyValues) {
      super.update(changedProperties)

      if (this.shadowRoot && changedProperties.get('viewAttributes') !== this.viewAttributes) this.shadowRoot.innerHTML = Mustache.render(template, this.viewAttributes)
    }
  }

  customElements.define(`ptemp-${name}`, Template)

  return Template
}

