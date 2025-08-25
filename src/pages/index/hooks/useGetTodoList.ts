import { useEffect, useState } from 'react';
import {useRequest} from 'ahooks';
import { getTodoList, login } from '@/apis/todoServices';
import Taro from '@tarojs/taro';
import { ITodoItem } from '../interface';

export default function useGetTodoList() {
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);
  const {loading, run} = useRequest(getTodoList, {
    manual: true,
    onSuccess: (res) => {
      console.log('todolist',res);
      setTodoList(res.data);
    }
  });

  const getUserInfo = ()=>{
    Taro.getUserProfile({
      lang: 'zh_CN',
      desc:'获取你的昵称、头像、地区及性别',
      success:(res)=>{
        console.log('getUserInfo-res:',res);
      },
      fail:(err)=>{
        console.log('getUserInfo-err:',err);
      }
    })
    Taro.login().then(res=>{
    login(res.code).then((res)=>{
      console.log('登录成功--:',res);
      Taro.setStorageSync('token',res.data.data.token);
      run();
    }).catch(err=>{
      console.error('登录失败:',err);
    })
   }).catch(err=>{
    console.error('登录失败:',err);
   })
  }

  useEffect(()=>{ 
    getUserInfo()
  },[])

  return {loading, run, todoList, getUserInfo}
}
