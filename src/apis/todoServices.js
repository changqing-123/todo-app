import Taro from "@tarojs/taro";


const BASE_URL = 'http://localhost:3000/api';

// 获取任务列表
export const getTodoList = async()=>{
  try{
    const result = await Taro.request({
      url:`${BASE_URL}/getTodoList`,
      method:'GET'
    })
    return result
  }catch(err){
    console.log(err)
    throw err
  }
}

// 创建任务
export const createTodo = async({title,priority})=>{
  try{
    const result = await Taro.request({
      url:`${BASE_URL}/create`,
      method:'POST',
      data:{
        title,
        priority
      }
    })
    return result
  }catch(err){
    console.log(err)
    throw err
  }
}

// 删除todo任务
export const deleteTodo = async(id)=>{ 
  try{
    const result = await Taro.request({
      url:`${BASE_URL}/delete/${id}`,
      method:'DELETE'
    })
    return result
  }catch(err){
    console.log(err)
    throw err
  }
}

// 完成任务
export const completeTodo = async({id, completed})=>{ 
  try{
    const result = await Taro.request({
      url:`${BASE_URL}/complete`,
      method:'POST',
      data:{
        id,
        completed
      }
    })
    return result
  }catch(err){
    console.log(err)
    throw err
  }
}