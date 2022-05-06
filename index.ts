import { createBranch, initStorage } from './src/commands'

const git = () => {
  //TODO:
  // add to .zshrc if doesn't exit
  initStorage()
  createBranch()
}

git()
