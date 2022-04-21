import { getProjects } from './utils'

export const BRANCH_TYPES = {
  type: 'branch_types',
  values: ['fix', 'feature'],
}

export const PROJECTS = {
  type: 'projects',
  values: getProjects(),
}
