import { Present, Slide } from './elements'

export default function penguist() {
  customElements.define('p-present', Present)
  customElements.define('p-slide', Slide)
}

