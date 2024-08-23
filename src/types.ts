export enum Colors {
  FgBlack = '\x1b[30m',
  FgRed = '\x1b[31m',
  FgGreen = '\x1b[32m',
  FgYellow = '\x1b[33m',
  FgBlue = '\x1b[34m',
  FgMagenta = '\x1b[35m',
  FgCyan = '\x1b[36m',
  FgWhite = '\x1b[37m',
}

export interface BranchNameTemplateParams {
  type: string
  projectAlias: string
  issueID: string
  /** additional branch name applied after issueID */
  branchName?: string
  lastName?: string
}
