import path from 'path'
import { cwd } from 'process'

export default {
  projects: [
    { name: 'avire-hub', alias: 'av' },
    { name: 'layout-designer', alias: 'ld' },
  ],
  storageTemplatePath: path.resolve(cwd(), 'storage.template.json'),
  storagePath: path.resolve(cwd(), 'storage.json'),
}
