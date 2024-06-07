import config from '../env'

export const BRANCH_TYPES = {
  type: 'branch_types',
  values: ['feature', 'fix', 'refactor', 'chore', 'test'],
}

//TODO: move to envs
export const PROJECTS = {
  type: 'projects',
  values: config.projects.map(({ name, alias }) => `${name} [${alias}]`),
}

export enum DeleteBranchesOptions {
  DeleteBranches = 'delete-branches',
  AddCurrentBranchToWhitelist = 'add-current-branch-to-whitelist',
  AddToWhitelist = 'add-to-whitelist',
  ClearWhitelist = 'clear-whitelist',
  ShowStatistics = 'show-statistics',
}

export const SETTINGS_OPTIONS = {
  type: 'settings_options',
  values: ['reset branch counter'],
}
