import config from '../.env'

export const BRANCH_TYPES = {
  type: 'branch_types',
  values: ['fix', 'feature', 'settings'],
}

export const PROJECTS = {
  type: 'projects',
  values: config.projects.map(({ name, alias }) => `${name} [${alias}]`),
}

export const SETTINGS_OPTIONS = {
  type: 'settings_options',
  values: ['reset branch counter'],
}
