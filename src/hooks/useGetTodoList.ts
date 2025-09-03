import { getTodoList } from '@/apis/todoServices'
import todolistStore from '@/store/todolistStore'
import { useRequest } from 'ahooks'

export default function useGetTodoList() {
  const list = todolistStore(state => state.list)
  const setList = todolistStore(state => state.setList)
  const statistics = todolistStore(state => state.statistics)
  const setStatistics = todolistStore(state => state.setStatistics)

  const {
    loading,
    run,
    data: result
  } = useRequest(getTodoList, {
    manual: true,
    onSuccess: res => {
      console.log('todolist', res)
      setList(res.data.data)
      setStatistics(res.data.statistics)
    }
  })

  return { loading, run, todoList: list, statistics }
}
