import { SUPPORTED_FLAG_ACTIONS, SupportedFlag } from './src/utils'

const flags = process.argv.slice(2) as SupportedFlag[]

const gitCLI = () => {
  flags.forEach((flag) => {
    SUPPORTED_FLAG_ACTIONS[flag]()
  })
}

gitCLI()
