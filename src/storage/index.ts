import { readFileSync, writeFileSync } from 'fs'
import env from '../../env'

export const getStorage = () => {
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
