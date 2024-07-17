export default class Creator {
  name: string
  targetElement?: CustomElementConstructor

  constructor(name: string) {
    this.name = name
  }

  protected willDefine() {}

  define(prefix: string) {
    this.willDefine()

    if (this.targetElement) customElements.define(`${prefix}-${this.name}`, this.targetElement)
    else console.error(`Could not define custom element: ${prefix}-${this.name} owing to the undefined targetElement member`)

    return this.targetElement
  }
}

