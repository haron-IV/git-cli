// eslint-disable-next-line @typescript-eslint/no-var-requires
const ps = require('prompt-sync')()
import cliSelect from 'cli-select'
import { exec } from 'child_process'
import { BRANCH_NAME_TEMPLATES, BRANCH_TEMPLATES, BRANCH_TYPES, PROJECTS } from '../config'
import { Colors } from '../types'
import { getCliSelectConfig, log } from '../utils'

export const createBranch = async () => {
  log(Colors.FgGreen, 'Select branch name template:')
  const { value: template } = await cliSelect(getCliSelectConfig(BRANCH_NAME_TEMPLATES))
  console.log()

  log(Colors.FgBlue, 'Configure your branch name.', true)
  log(Colors.FgGreen, 'Select branch type:')

  const { value: branchType } = await cliSelect(getCliSelectConfig(BRANCH_TYPES))

  let lastName
  if (template === 'ccaLms') lastName = ps(`${Colors.FgGreen} last name: `)

  log(Colors.FgGreen, 'Select your project alias')

  const { value: project } = await cliSelect(getCliSelectConfig(PROJECTS))
  console.log()
  const taskNumber = ps(`${Colors.FgGreen} task number (can be skipped): `)
  console.log()
  const branchName = ps(`${Colors.FgGreen} branch name: `)
  console.log()

  const projectAlias = `${project.split(' ')[1].trim().replace('[', '').replace(']', '')}`
  const startingDash = `${taskNumber ? '-' : ''}`
  const issueID = `${startingDash}${taskNumber.trim()}`

  const branch = BRANCH_TEMPLATES[template as keyof typeof BRANCH_TEMPLATES]?.({
    type: branchType,
    projectAlias: projectAlias,
    issueID,
    branchName,
    lastName,
  })

  log(Colors.FgBlue, `Branch with name "${branch}" will be created. Do you agree?`)
  const { value: agreed } = await cliSelect(
    getCliSelectConfig({ type: 'agree', values: ['yes', 'no'] })
  )

  if (agreed === 'yes') exec(`git checkout -b ${branch}`)
}
