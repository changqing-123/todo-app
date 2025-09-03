import { getTodoList } from '@/apis/todoServices'
import todolistStore from '@/store/todolistStore'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'

export default function useGetTodoList() {
  const {
    loading,
    run,
    data: result
  } = useRequest(getTodoList, {
    manual: true
  })
  const list = todolistStore(state => state.list)
  const setList = todolistStore(state => state.setList)

  useEffect(() => {
    if (result && result.statusCode === 200) {
      setList(result.data.data)
    }
  }, [result])

  return { loading, run, todoList: list }
}
