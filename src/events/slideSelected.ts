import type { Slide } from '../elements'

export const SLIDE_SELECTED = 'penguist:selected'

export class SlideSelectedEvent extends CustomEvent<Slide> {
  constructor(eventInitDict: CustomEventInit<Slide>) {
    super(SLIDE_SELECTED, eventInitDict)
  }
}

