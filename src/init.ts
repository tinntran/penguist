import { fade, rush } from './defaultAnims'
import { Present, Slide } from './elements'

export default function init() {
  document.body.style.overflow = 'hidden'

  customElements.define('p-present', Present)
  customElements.define('p-slide', Slide)

  fade.define()
  rush.define()
}

