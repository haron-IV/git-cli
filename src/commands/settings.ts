import cliSelect from 'cli-select'
import { SETTINGS_OPTIONS } from '../config'
import { getCliSelectConfig } from '../utils'
import { getStorage, saveStorage } from './storage'

const printSettings = () => console.log(getStorage())

export const settings = async () => {
  console.log('Your settings: ')
  printSettings()
  const { value: settingOption } = await cliSelect(
    getCliSelectConfig(SETTINGS_OPTIONS)
  )
  if (settingOption === 'reset branch counter') {
    const storage = JSON.parse(getStorage())
    storage.branchCounter = 0
    saveStorage(JSON.stringify(storage))
    printSettings()
  }
}
