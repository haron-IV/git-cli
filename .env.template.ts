import path from 'path'
import { cwd } from 'process'

export default {
  projects: [{ name: 'test-project', alias: 'tp' }],
  storageTemplatePath: path.resolve(cwd(), 'storage.template.json'),
  storagePath: path.resolve(cwd(), 'storage.json'),
}
