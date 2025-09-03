import { create } from 'zustand'

interface IStatistics {
  completed: number
  total: number
  uncompleted: number
  [key: string]: number
}
interface ITodoListStore {
  list: any[]
  setList: (list: any[]) => void
  statistics: IStatistics
  setStatistics: (statistics: IStatistics) => void
}
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
