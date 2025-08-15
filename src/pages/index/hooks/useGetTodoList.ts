import React, { useState } from 'react';
import {useRequest} from 'ahooks';
import { getTodoList } from '@/apis/todoServices';

export default function useGetTodoList() {
  const [todoList, setTodoList] = useState([]);
  const {loading, run} = useRequest(getTodoList, {
    // manual: true,
    onSuccess: (res) => {
      console.log('todolist',res);
      setTodoList(res.data);
    }
  });

  return {loading, run, todoList}
}
