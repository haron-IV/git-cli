import path from 'path'

export default {
  projects: [
    { name: 'avire-hub', alias: 'av' },
    { name: 'layout-designer', alias: 'ld' },
  ],
  storageTemplatePath: path.resolve(__dirname.replace('/dist', ''), './storage.template.json'),
  storagePath: path.resolve(__dirname.replace('/dist', ''), './storage.json'),
}
