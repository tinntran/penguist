import { Registry } from './registry'

class AnimRegistry extends Registry<string> {
  getQueryString() {
    return Object.keys(this.getAll()).toString()
  }
}

export const ANIM_REGISTRY_KIND = 'anim-tags'

export default new AnimRegistry(ANIM_REGISTRY_KIND)

