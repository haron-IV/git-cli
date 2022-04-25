export const BRANCH_TYPES = {
  type: 'branch_types',
  values: ['fix', 'feature'],
}

export const PROJECTS = {
  type: 'projects',
  values: process.env.PROJECTS?.split(',') || [],
}
