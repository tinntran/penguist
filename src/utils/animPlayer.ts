import type { Anim } from '../elements'

export default interface AnimPlayer {
  animGroups: Generator<Anim[], void> | null,
  prevAnimGroup: Anim[] | null,
  getAnims(): void,
  getAnimGroups(anim?: Anim[]): Generator<Anim[], void>,
  playNextAnim(): boolean
}

