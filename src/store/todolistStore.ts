import { create } from 'zustand'
interface ITodoListStore {
  list: any[]
  setList: (list: any[]) => void
}
export default create(
  (set): ITodoListStore => ({
    list: [],
    setList: list => set(() => ({ list }))
  })
)
