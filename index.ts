import { initStorage } from './src/storage'
import { SUPPORTED_FLAG_ACTIONS, SupportedFlag } from './src/utils'

const flags = process.argv.slice(2) as SupportedFlag[]

const gitCLI = () => {
  initStorage()

  const unsupportedFlag = !Object.values(SupportedFlag).includes(flags[0])
  if (!flags.length || unsupportedFlag) {
    console.log(`
    HELP
    you have to run this CLI with specific flag:
    -b Create new branch
    -d Delete multiple branches
  `)
    return
  }

  flags.forEach((flag) => {
    SUPPORTED_FLAG_ACTIONS[flag]()
  })
}

gitCLI()
