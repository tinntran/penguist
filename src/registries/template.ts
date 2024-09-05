import { Registry } from './registry'

class TemplateRegistry extends Registry<string> {
  getQueryString() {
    return Object.keys(this.getAll()).toString()
  }
}

export default new TemplateRegistry()

