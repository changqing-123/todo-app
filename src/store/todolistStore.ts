import { ITodoListStore } from '@/interface'
import { create } from 'zustand'

export default create(
  (set): ITodoListStore => ({
    list: [],
    setList: list => set(() => ({ list })),
    statistics: {
      completed: 0,
      total: 0,
      uncompleted: 0
    },
    setStatistics: statistics => set(() => ({ statistics }))
  })
)
