import { BranchNameTemplateParams } from 'types'
import config from '../env'
import { removeLastChar } from './utils'

export const BRANCH_TYPES = {
  type: 'branch_types',
  values: ['feature', 'fix', 'refactor', 'chore', 'test'],
}

//TODO: move to envs
export const PROJECTS = {
  type: 'projects',
  values: config.projects.map(({ name, alias }) => `${name} [${alias}]`),
}
export const BRANCH_TEMPLATES = {
  /** type/issue-branchName => feat/AG-121-chat */
  default: ({ type, projectAlias, issueID, branchName }: BranchNameTemplateParams) =>
    `${type.trim()}/${projectAlias}${issueID}${branchName ? '-' : ''}${removeLastChar(
      '-',
      branchName?.split(' ').join('-')
    )}`,
  /** type/lastName/issue-branchName => feat/kowalski/AG-121-chat */
  ccaLms: ({ type, projectAlias, issueID, branchName, lastName }: BranchNameTemplateParams) =>
    `${type.trim()}/${lastName}/${projectAlias}${issueID}${branchName ? '-' : ''}${removeLastChar(
      '-',
      branchName?.split(' ').join('-')
    )}`,
}

export const BRANCH_NAME_TEMPLATES = {
  type: 'branch_name_templates',
  values: Object.keys(BRANCH_TEMPLATES),
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
