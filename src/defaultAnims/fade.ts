import { anim } from '../fun'

export const fadeCreator = anim('fade')
  .frames([
    {
      opacity: '0'
    },
    {
      opacity: '1'
    }
  ])
  .opts(1000)

export default fadeCreator.define()

