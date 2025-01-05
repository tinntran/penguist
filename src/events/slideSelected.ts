export const SLIDE_SELECTED_EVENT = 'penguist:selected'

export class SlideSelectedEvent extends CustomEvent<string> {
  constructor(eventInitDict: CustomEventInit<string>) {
    super(SLIDE_SELECTED_EVENT, eventInitDict)
  }
}

