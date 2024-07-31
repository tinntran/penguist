import { Template } from '../elements'
import Creator from './creator'

export class TemplateCreator extends Creator {
  private template = ''
  private styles?: string
  
  html(template: string | HTMLElement | (() => string)) {
    if (typeof template === 'string') this.template = template
    else if (template instanceof HTMLElement) this.template = template.innerHTML
    else this.template = template()

    return this
  }

  css(styles: string) {
    this.styles = styles

    return this
  }

  configureTargetElement(): CustomElementConstructor | undefined {
    const { styles, template } = this

    return class extends Template {
      constructor() {
        super()

        this.template = `${styles && `<style>${styles}</style>`} ${template}`
      }
    }
  }

  define(prefix = 'ptemp'): CustomElementConstructor {
    return super.define(prefix)
  }
}

export default function template(name: string) {
  return new TemplateCreator(name)
}

