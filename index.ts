import 'dotenv/config'
import { createBranch } from './src/commands'

const git = () => {
  createBranch()
}

git()
