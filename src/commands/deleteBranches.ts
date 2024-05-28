import cliSelect from 'cli-select'
import { BRANCH_TYPES } from 'config'
import { getStorage, initStorage } from '../storage'
import { Colors } from 'types'
import { getCliSelectConfig, log } from 'utils'

export const deleteBranches = async () => {
  // log(Colors.FgBlue, 'Configure your branch name.', true)
  // log(Colors.FgGreen, 'Select branch type:')

  // const { value: branchType } = await cliSelect(
  //   getCliSelectConfig(BRANCH_TYPES)
  // )

  // log(Colors.FgGreen, 'Select your project alias')

  // const { value: project } = await cliSelect(getCliSelectConfig(PROJECTS))
  console.log()
  // const taskNumber = ps(`${Colors.FgGreen} task number (can be skipped): `)
  console.log()
  // const branchName = ps(`${Colors.FgGreen} branch name: `)
  console.log()

  // const branchPrefix = `${branchType.trim()}/${project
  //   .split(' ')[1]
  //   .trim()
  //   .replace('[', '')
  //   .replace(']', '')}`
  // const startingDash = `${taskNumber ? '-' : ''}`
  // const extendedBranchName = `${startingDash}${taskNumber.trim()}-${branchName
  //   .split(' ')
  //   .join('-')}`
  // const extendedBranchNameLastDashProtected =
  //   extendedBranchName.slice(-1) === '-'
  //     ? extendedBranchName.slice(0, -1)
  //     : extendedBranchName
  // const mappedBranchName = `${branchPrefix}${extendedBranchNameLastDashProtected}`

  // log(
  //   Colors.FgBlue,
  //   `Branch with name "${mappedBranchName}" will be created. Do you agree?`
  // )
  // const { value: agreed } = await await cliSelect(
  //   getCliSelectConfig({ type: 'agree', values: ['yes', 'no'] })
  // )

  initStorage()

  // if (agreed === 'yes') exec(`git checkout -b ${mappedBranchName}`)
  // else {
  //   console.log()
  //   console.log(`Branch wasn't created.`)
  // }
}
