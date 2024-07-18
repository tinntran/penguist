import type { Slide } from '../elements'

export const SLIDE_UNSELECTED = 'penguist:unselected'

export class SlideUnselectedEvent extends CustomEvent<Slide> {
  constructor(eventInitDict: CustomEventInit<Slide>) {
    super(SLIDE_UNSELECTED, eventInitDict)
  }
}

