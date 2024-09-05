import { Registry } from './registry'

class AnimRegistry extends Registry<string> {
  getQueryString() {
    return Object.keys(this.getAll()).toString()
  }
}

export default new AnimRegistry()

