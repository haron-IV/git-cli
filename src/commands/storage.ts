import { existsSync, readFileSync, writeFileSync } from 'fs'
import config from '../../env'

const storageFilePath = `${process.cwd()}/storage/storage.json`
const storageTemplateFilePath = `${process.cwd()}/storage/storage.template.json`

export const initStorage = () => {
  if (existsSync(storageFilePath)) return
  writeFileSync(storageFilePath, readFileSync(storageTemplateFilePath))
  const storage = config.projects.reduce(
    (acc, next) => ({ ...acc, [next.name]: { branchCounter: 0 } }),
    {}
  )
  writeFileSync(storageFilePath, JSON.stringify(storage))
}

export const getStorage = () => readFileSync(storageFilePath, 'utf8')
export const saveStorage = (storage: string) => writeFileSync(storageFilePath, storage)
