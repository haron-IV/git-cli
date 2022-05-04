// eslint-disable-next-line @typescript-eslint/no-var-requires
const ps = require('prompt-sync')()
import cliSelect from 'cli-select'
import { exec } from 'child_process'
import { BRANCH_TYPES, PROJECTS } from '../config'
import { Colors } from '../types'
import { getCliSelectConfig } from '../utils'
import { settings } from './settings'
import config from '../../.env'
import { getStorage, saveStorage } from './storage'

export const createBranch = async () => {
  console.log(Colors.FgBlue, `Configure your branch name.`)
  console.log()

  console.log(Colors.FgGreen, `Select branch type, or go to settings:`)
  const { value: branchType } = await cliSelect(
    getCliSelectConfig(BRANCH_TYPES)
  )

  if (branchType === 'settings') settings()
  else {
    console.log()
    console.log(Colors.FgGreen, `Select your project alias`)
    const { value: project } = await cliSelect(getCliSelectConfig(PROJECTS))
    console.log()
    let taskNumber
    if (config.autoCountBranches) {
      taskNumber = String(
        JSON.parse(getStorage())[project.split(' ')[0]].branchCounter
      )
      console.log(`${Colors.FgGreen} task number (auto counter): ${taskNumber}`)
    } else {
      taskNumber = ps(`${Colors.FgGreen} task number (cab be skipped): `)
      console.log()
    }

    const branchName = ps(`${Colors.FgGreen} branch name: `)
    console.log()

    const branchPrefix = `${branchType.trim()}/${project
      .split(' ')[1]
      .trim()
      .replace('[', '')
      .replace(']', '')}`
    const startingDash = `${taskNumber ? '-' : ''}`
    const extendedBranchName = `${startingDash}${taskNumber?.trim()}-${branchName
      .split(' ')
      .join('-')}`
    const mappedBranchName = `${branchPrefix}${extendedBranchName}`

    console.log(
      `${Colors.FgBlue} Branch with name "${mappedBranchName}" will be created. Do you agree?`
    )
    const { value: agreed } = await await cliSelect(
      getCliSelectConfig({ type: 'agree', values: ['yes', 'no'] })
    )

    if (agreed === 'yes') {
      exec(`git checkout -b ${mappedBranchName}`)
      const storage = JSON.parse(getStorage())
      storage[project.split(' ')[0]].branchCounter++
      saveStorage(JSON.stringify(storage))
    } else {
      console.log()
      console.log(`Branch wasn't created.`)
    }
  }
}
