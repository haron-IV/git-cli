import { initStorage } from './src/storage'
import { SUPPORTED_FLAG_ACTIONS, SupportedFlag } from './src/utils'

const flags = process.argv.slice(2) as SupportedFlag[]

const gitCLI = () => {
  initStorage()

  if (!flags.length)
    console.log(`
    HELP
    you have to run this CLI with specific flag:
    -b Create new branch
    -r Delete multiple branches
  `)

  flags.forEach((flag) => {
    SUPPORTED_FLAG_ACTIONS[flag]()
  })
}

gitCLI()
