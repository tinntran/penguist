import penguist_ from './penguist'

declare global {
  function penguist(): void
}

globalThis.penguist = penguist_

