import config from '../.env'

export const BRANCH_TYPES = {
  type: 'branch_types',
  values: ['fix', 'feature'],
}

export const PROJECTS = {
  type: 'projects',
  values: config.projects.map(({ name, alias }) => `${name} [${alias}]`),
}
