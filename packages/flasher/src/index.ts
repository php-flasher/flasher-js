import '../styles/index.scss'

import Flasher from './flasher'
import { theme } from './theme'

const flasher = new Flasher()
flasher.addTheme('flasher', theme)

export * from './types'
export * from './mixin'

export default flasher
