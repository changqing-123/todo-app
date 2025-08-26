import { View } from '@tarojs/components'
import styles from './index.module.scss'
import { useState } from 'react'
import AddToDoDialog from './components/addToDoDialog'
import ToDOItem from './components/toDoItem'
import { completeTodo, deleteTodo } from '@/apis/todoServices'
import useGetTodoList from './hooks/useGetTodoList'
import userInfoStore from '@/store/userInfoStore'
export default function Index () {
  const [open, setOpen] = useState(false);
  const {todoList, run} = useGetTodoList();
  const userInfo = userInfoStore((state)=>state.userInfo)
  const onCloseDialog = () => {
    setOpen(false);
    run();
  }

  const onOpenDialog = () => {
    console.log('userInfo',userInfo);
    setOpen(true)
  }

  const finishItem=async(id:number,completed:boolean)=>{
    try{
      const result = await completeTodo({id, completed});
      if(result.statusCode === 200){
        run();
        return;
      }
      console.error('操作失败', result);
    }catch(error){
      console.error('操作失败', error);
    }
  }

  const onDeleteItem=async(id:number)=>{
    try{
      const result = await deleteTodo(id);
      console.log('删除成功:',result);
      run();
    }catch(err){
      console.error('删除失败',err);
      
    }
  }
console.log('userInfo',userInfo);

  return (
    <View className={styles.index}>
      <View className={styles.container}>
        {todoList.map((item)=><ToDOItem
        key={item.id}
        title={item.title}
        completed={item.completed} 
        periods={item.created_at}
        onChange={(v)=>finishItem(item.id, !item.completed)} 
        onDelete={()=>onDeleteItem(item.id)}
        />)}
      </View>
      <View
      className={styles.buttonArea}
      onClick={onOpenDialog}
      >
        +
      </View>
      
      <AddToDoDialog open={open} onClose={onCloseDialog}/>
    </View>
  )
}
