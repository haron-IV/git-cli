import { readFileSync, writeFileSync } from 'fs'
import env from '../../env'

export interface Storage {
  deletingBranches: {
    whitelist: string[]
    deletedBranchesCount: number
    deletedBranchesArchive: string[]
  }
}

export const getStorage = (): Storage => {
  const storageString = readFileSync(env.storagePath).toString('utf-8')
  return JSON.parse(storageString)
}

export const initStorage = () => {
  try {
    getStorage()
  } catch {
    writeFileSync(env.storagePath, readFileSync(env.storageTemplatePath))
  }
}

export const setStorage = (storage: Storage) =>
  writeFileSync(env.storagePath, JSON.stringify(storage))
