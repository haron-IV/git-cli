import cliSelect from 'cli-select'
import { Colors } from '../../types'
import { getStorage } from '../../storage'
import { getCliSelectConfig, getCurrentBranch, log } from '../../utils'
import { functionalities, getFilteredBranches } from './deleteBranches.utils'
import { DeleteBranchesOptions } from '../../config'

const prompt = require('prompt-sync')({ sigint: true })

export const deleteBranches = async () => {
  const { deletingBranches } = getStorage()
  const currentBranch = await getCurrentBranch()
  const filteredBranches = await getFilteredBranches(deletingBranches.whitelist, currentBranch)

  log(Colors.FgGreen, 'Select action you want to perform')
  const { value } = await cliSelect(
    getCliSelectConfig({
      valueRenderer: (v) => v.replace(/-/g, ' '),
      values: Object.values(DeleteBranchesOptions),
    })
  )

  //take care of the order of arguments
  functionalities[value as DeleteBranchesOptions](filteredBranches, currentBranch)
}
