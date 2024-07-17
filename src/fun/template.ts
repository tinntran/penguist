import { Template } from '../elements'
import Creator from './creator'

export class TemplateCreator extends Creator {
  private template: string = ''
  private styles?: string
  
  html(template: string) {
    this.template = template

    return this
  }

  css(styles: string) {
    this.styles = styles

    return this
  }

  protected willDefine() {
    super.willDefine()

    const template = this.template
    const styles = this.styles

    this.targetElement = class extends Template {
      constructor() {
        super()

        this.template = `${styles && `<style>${styles}</style>`} ${template}`
      }
    }
  }

  define(prefix: string = 'ptemp') {
    super.define(prefix)
  }
}

export default function template(name: string) {
  return new TemplateCreator(name)
}

