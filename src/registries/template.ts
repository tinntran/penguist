import { Registry } from './registry'

class TemplateRegistry extends Registry<string> {
  getQueryString() {
    return Object.keys(this.getAll()).toString()
  }
}

export const TEMPLATE_REGISTRY_KIND = 'temp-tags'

export default new TemplateRegistry(TEMPLATE_REGISTRY_KIND)

