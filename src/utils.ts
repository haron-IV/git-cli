type Values = {
  type: string
  values: string[]
}

export const getCliSelectConfig = ({ values }: Values) => ({
  values: values,
  defaultValue: 0,
  selected: '(x)',
  unselected: '( )',
  valueRendered: (value: any) => value,
  outputStream: process.stdout,
  cleanup: true,
  indention: 2,
})

export const getProjectName = (project: string) => project.split(' ')[0].trim()
