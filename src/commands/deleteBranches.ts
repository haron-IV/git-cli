import { Colors } from '../types'
import { Storage, getStorage, setStorage } from '../storage'
import { getCliSelectConfig, getCurrentBranch, log } from '../utils'
import { promisify } from 'util'
import cliSelect from 'cli-select'
const prompt = require('prompt-sync')({ sigint: true })

const exec = promisify(require('child_process').exec)

const WHITE_SPACE_REGEXP = /(\r\n|\n|\r)/gm

const getFilteredBranches = async (
  branchesWhitelist: Storage['deletingBranches']['whitelist'],
  currentBranchName: string
): Promise<string[]> => {
  const git_branch = await exec('git branch')
  const mappedBranchNames = git_branch.stdout.replace('*', '').split(' ').filter(Boolean)

  return mappedBranchNames
    .filter(
      (branchName: string) =>
        !branchesWhitelist.includes(branchName.replace(WHITE_SPACE_REGEXP, ''))
    )
    .map((branchName: string) => branchName.replace(WHITE_SPACE_REGEXP, ''))
    .filter((it: string) => it && it !== currentBranchName)
}

const removeBranches = async (filteredBranches: string[], currentBranchName: string) => {
  console.log()
  log(Colors.FgYellow, `Number of branches that will be deleted (${filteredBranches.length}):`)
  console.log(filteredBranches)
  console.log()

  const deletedBranches = []

  for (const branchName of filteredBranches) {
    if (branchName === currentBranchName) return
    const git_b_d = await exec(`git b -D ${branchName}`)
    if (git_b_d.stdout.includes('Deleted')) deletedBranches.push(branchName)
  }

  console.log()
  console.log(`${deletedBranches.length} deleted branches:`)
  console.log(deletedBranches)

  if (deletedBranches.length > 0) {
    const s = getStorage()
    s.deletingBranches.deletedBranchesCount += deletedBranches.length
    s.deletingBranches.deletedBranchesArchive.push(...deletedBranches)
    setStorage(s)
  }
}

const addToWhitelist = () => {
  const s = getStorage()
  const branches = prompt('add branches separated by comma: ')
  const arrayOfBranches = branches?.split(',') || []
  s.deletingBranches.whitelist = [...arrayOfBranches, ...s.deletingBranches.whitelist]
  setStorage(s)
}

const addCurrentBranchToWhitelist = async () => {
  const s = getStorage()
  s.deletingBranches.whitelist = [await getCurrentBranch(), ...s.deletingBranches.whitelist]
  setStorage(s)
}

const clearWhitelist = async () => {
  log(Colors.FgRed, 'Are you sure you want to remove all branches from whitelist?')
  const { value } = await cliSelect(getCliSelectConfig({ values: ['yes', 'no - exit'] }))
  if (value === 'no') return
  const s = getStorage()
  s.deletingBranches.whitelist = []
  setStorage(s)
}

const showStats = () => {
  const s = getStorage()
  log(Colors.FgWhite, 'STATISTICS', true)
  log(Colors.FgYellow, `Deleted branches: ${s.deletingBranches.deletedBranchesCount}`)
}

export const deleteBranches = async () => {
  const { deletingBranches } = getStorage()
  const currentBranch = await getCurrentBranch()
  const filteredBranches = await getFilteredBranches(deletingBranches.whitelist, currentBranch)

  log(Colors.FgGreen, 'Select action you want to perform')
  const { value } = await cliSelect(
    getCliSelectConfig({
      valueRenderer: (v) => v.replace(/-/g, ' '),
      values: [
        'delete-branches',
        'add-current-branch-to-whitelist',
        'add-to-whitelist',
        'clear-whitelist',
        'show-stats',
      ],
    })
  )

  switch (value) {
    case 'delete-branches': {
      await removeBranches(filteredBranches, currentBranch)
      break
    }
    case 'add-to-whitelist': {
      addToWhitelist()
      break
    }
    case 'clear-whitelist': {
      clearWhitelist()
      break
    }
    case 'show-stats': {
      showStats()
      break
    }
    case 'add-current-branch-to-whitelist': {
      await addCurrentBranchToWhitelist()
      break
    }
  }
}
