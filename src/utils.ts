import { createBranch, deleteBranches } from './commands'
import { Colors } from './types'

type Values = {
  type: string
  values: string[]
}

export const getCliSelectConfig = ({ values }: Values) => ({
  values: values,
  defaultValue: 0,
  selected: '(x)',
  unselected: '( )',
  valueRendered: (value: any) => value,
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
  DeleteBranches = '-r',
}

export const SUPPORTED_FLAG_ACTIONS: Record<SupportedFlag, () => {}> = {
  [SupportedFlag.CreateBranch]: createBranch,
  [SupportedFlag.DeleteBranches]: deleteBranches,
}
