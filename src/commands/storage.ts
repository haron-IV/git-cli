import { existsSync, readFileSync, writeFileSync } from 'fs'

const storageFilePath = `${process.cwd()}/storage/storage.json`
const storageTemplateFilePath = `${process.cwd()}/storage/storage.template.json`

export const initStorage = () => {
  if (existsSync(storageFilePath)) return
  writeFileSync(storageFilePath, readFileSync(storageTemplateFilePath))
}

export const getStorage = () => readFileSync(storageFilePath, 'utf8')
export const saveStorage = (storage: string) =>
  writeFileSync(storageFilePath, storage)
