// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `${process.cwd()}/.env`,
})

import { createBranch } from './src/commands'

const git = () => {
  //TODO:
  // add to .zshrc if doesn't exit
  createBranch()
}

git()
