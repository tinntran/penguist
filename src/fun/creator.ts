export default class Creator {
  name: string

  constructor(name: string) {
    this.name = name
  }

  configureTargetElement(): CustomElementConstructor | undefined {
    return undefined
  }

  define(prefix: string) {
    const target = this.configureTargetElement()

    if (target) customElements.define(`${prefix}-${this.name}`, target)
    else throw new Error(`Could not define custom element: ${prefix}-${this.name} owing to the undefined targetElement member`)

    return target
  }
}

