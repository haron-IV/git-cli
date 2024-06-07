import { createBranch, deleteBranches } from './commands'
import { Colors } from './types'
import { promisify } from 'util'

const exec = promisify(require('child_process').exec)

type Values = {
  type?: string
  values: string[]
  valueRenderer?: (value: string) => string
}

export const getCliSelectConfig = ({ values, valueRenderer }: Values) => ({
  values: values,
  defaultValue: 0,
  selected: '(x)',
  unselected: '( )',
  valueRenderer: (value: string) => valueRenderer?.(value) || value,
  outputStream: process.stdout,
  cleanup: true,
  indention: 2,
})

export const log = (color: Colors, msg: string, spacing?: boolean) => {
  console.log(`${color} ${msg}`)
  if (spacing) console.log('')
}

export enum SupportedFlag {
  CreateBranch = '-b',
  DeleteBranches = '-d',
}

export const SUPPORTED_FLAG_ACTIONS: Record<SupportedFlag, () => {}> = {
  [SupportedFlag.CreateBranch]: createBranch,
  [SupportedFlag.DeleteBranches]: deleteBranches,
}

export const getCurrentBranch = async (): Promise<string> => {
  const git_branch = await exec('git branch')
  if (git_branch.stderr) throw new Error(git_branch.stderr)

  return git_branch.stdout
    .split('\n')
    .find((it: String) => it.includes('*'))
    .replace('*', '')
    .trim()
}
