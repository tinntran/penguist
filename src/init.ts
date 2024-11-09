import { fade, rush } from './default/anims'
import { Present, Slide } from './elements'

export default function init() {
  document.body.style.overflow = 'clip'

  customElements.define('p-present', Present)
  customElements.define('p-slide', Slide)

  fade.define()
  rush.define()
}

