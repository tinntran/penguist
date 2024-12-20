import { fade, rush } from './default/anims'
import { Present, Slide } from './elements'

export default function init() {
  const eyes = ['\'\'', '"', '++', '**', '==', '..', '~~', '@@']

  console.log(`Your penguin is ready to go!\n%c(${eyes[Math.floor(Math.random() * eyes.length)]})>`, 'font-size: 42px;')

  document.body.style.overflow = 'clip'

  customElements.define('p-present', Present)
  customElements.define('p-slide', Slide)

  fade.define()
  rush.define()
}

