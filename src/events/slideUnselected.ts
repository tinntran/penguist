export const SLIDE_UNSELECTED_EVENT = 'penguist:unselected'

export class SlideUnselectedEvent extends CustomEvent<string> {
  constructor(eventInitDict: CustomEventInit<string>) {
    super(SLIDE_UNSELECTED_EVENT, eventInitDict)
  }
}

