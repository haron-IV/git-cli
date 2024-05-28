import config from '../env'

export const BRANCH_TYPES = {
  type: 'branch_types',
  values: ['feature', 'fix', 'refactor', 'chore', 'test'],
}

export const PROJECTS = {
  type: 'projects',
  values: config.projects.map(({ name, alias }) => `${name} [${alias}]`),
}
