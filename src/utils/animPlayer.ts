import type { Anim } from '../elements'

export default interface AnimPlayer {
  finishedAnims: number,
  getAnims(): void,
  getAnimGroups(anim?: Anim[]): Anim[][],
  playAnims(): Promise<void>
}

