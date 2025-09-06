import { getTodoList } from '@/apis/todoServices'
import todolistStore from '@/store/todolistStore'
import { Toast } from '@taroify/core'
import { useRequest } from 'ahooks'

export default function useGetTodoList() {
  const list = todolistStore(state => state.list)
  const setList = todolistStore(state => state.setList)
  const statistics = todolistStore(state => state.statistics)
  const setStatistics = todolistStore(state => state.setStatistics)

  const { loading, run } = useRequest(getTodoList, {
    manual: true,
    onSuccess: res => {
      console.log('todolist', res)
      setList(res.data.data)
      setStatistics(res.data.statistics)
    },
    onError: error => {
      console.log('err', error)
      Toast.fail(error.errMsg)
      setList([])
      setStatistics({ total: 0, completed: 0, uncompleted: 0 })
    }
  })

  return { loading, run, todoList: list, statistics }
}
