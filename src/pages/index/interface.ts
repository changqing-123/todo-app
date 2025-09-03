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