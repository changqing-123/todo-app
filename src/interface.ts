export interface IStatistics {
  completed: number
  total: number
  uncompleted: number
  [key: string]: number
}
export interface ITodoListStore {
  list: any[]
  setList: (list: any[]) => void
  statistics: IStatistics
  setStatistics: (statistics: IStatistics) => void
}

export interface ITodoItem {
  id: number
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  created_at: string
  duration?: number
  timer_type?: 'forward' | 'backward' | 'none'
  todo_desc?: string // 添加todo_desc字段
}

export interface IFormatTime {
  hours: number
  minutes: number
  seconds: number
  timer: string
}
