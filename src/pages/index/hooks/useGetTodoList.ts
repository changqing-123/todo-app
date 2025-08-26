import { useEffect, useState } from 'react';
import {useRequest} from 'ahooks';
import { getTodoList, login } from '@/apis/todoServices';
import Taro from '@tarojs/taro';
import { ITodoItem } from '../interface';
import { Dialog } from '@taroify/core';
import userInfoStore from '@/store/userInfoStore';

export default function useGetTodoList() {
  const [todoList, setTodoList] = useState<ITodoItem[]>([]);
  const  setUserInfo = userInfoStore((state) =>state.setUserInfo);
  const userInfo = userInfoStore((state) =>state.userInfo);
  const  setLoadInfo = userInfoStore((state) =>state.setLoadInfo);
  const {loading, run} = useRequest(getTodoList, {
    manual: true,
    onSuccess: (res) => {
      console.log('todolist',res);
      setTodoList(res.data);
    }
  });

   const getUserInfo = async()=>{ 
    try{
      Taro.showLoading({title:'登录中...'});
      setLoadInfo(true);
      const resUser = await Taro.getUserProfile({desc: '获取用户信息'});
      setUserInfo(resUser.userInfo);
      const wxlogRes = await Taro.login();
      const logRes = await login(wxlogRes.code);
      Taro.setStorageSync('token',logRes.data.data.token);
      Taro.showToast({title:'登录成功', icon:'success'});
      Taro.hideLoading();
      setLoadInfo(false);
    }catch(err){ 
      console.error('获取用户信息失败:',err.errMsg);
      Taro.showToast({title:err.errMsg,icon:'error'});
    }
  }

  useEffect(()=>{
    
  },[])

  useEffect(()=>{
    if(userInfo.nickName){
      run();
    }else{
      Dialog.confirm({
        title: '提示',
        message: '请先登录',
        onConfirm: getUserInfo,
      })
    }
  },[userInfo.nickName])

  return {loading, run, todoList, getUserInfo}
}

