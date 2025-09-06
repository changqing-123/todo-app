import { completeTodo, deleteTodo } from '@/apis/todoServices'
import { ITodoItem } from '@/interface'
import userInfoStore from '@/store/userInfoStore'
import { ConfigProvider, Empty, Skeleton, Tabs } from '@taroify/core'
import { ScrollView, View } from '@tarojs/components'
import { useDidShow } from '@tarojs/taro'
import { Fragment, useEffect, useState } from 'react'
import useGetTodoList from '../../hooks/useGetTodoList'
import AddToDoDialog from './components/addToDoDialog'
import ToDOItem from './components/toDoItem'
import styles from './index.module.scss'

const tabs = [
  { title: '全部', key: 'all' },
  { title: '已完成', key: 'completed' },
  { title: '未完成', key: 'uncompleted' }
]
export default function Index() {
  const [open, setOpen] = useState(false)
  const { todoList, run, loading } = useGetTodoList()
  const [todoListRender, setTodoListRender] = useState<ITodoItem[]>([])
  const [activeTab, setActiveTab] = useState<string>('all')
  const userInfo = userInfoStore(state => state.userInfo)

  const onCloseDialog = () => {
    setOpen(false)
    run()
  }

  const onOpenDialog = () => {
    console.log('userInfo', userInfo)
    setOpen(true)
  }

  const finishItem = async (id: number, completed: boolean) => {
    try {
      const result = await completeTodo({ id, completed })
      if (result.statusCode === 200) {
        run()
        return
      }
      console.error('操作失败', result)
    } catch (error) {
      console.error('操作失败', error)
    }
  }

  const onDeleteItem = async (id: number) => {
    try {
      const result = await deleteTodo(id)
      console.log('删除成功:', result)
      run()
    } catch (err) {
      console.error('删除失败', err)
    }
  }

  const onChangeTab = value => {
    console.log('tab', value)

    setActiveTab(value)
  }

  useDidShow(() => {
    run()
  })

  useEffect(() => {
    if (activeTab === 'all') {
      setTodoListRender(todoList)
    }
    if (activeTab === 'completed') {
      setTodoListRender(todoList.filter(item => item.completed))
    }
    if (activeTab === 'uncompleted') {
      setTodoListRender(todoList.filter(item => !item.completed))
    }
  }, [todoList, activeTab])

  return (
    <ConfigProvider
      theme={{
        radioCheckedIconBackgroundColor: '#27296d',
        radioCheckedIconBorderColor: '#27296d',
        buttonPrimaryBorderColor: '#27296d',
        buttonPrimaryBackgroundColor: '#27296d',
        tabsLineBackgroundColor: '#27296d'
      }}
    >
      <View className={styles.index}>
        <Tabs style={{ margin: 0 }} value={activeTab} defaultValue={'all'} onChange={onChangeTab}>
          {tabs.map(tab => (
            <Tabs.TabPane value={tab.key} title={tab.title}>
              <ScrollView
                className={styles.container}
                scrollY
                scrollWithAnimation
                scrollTop={0}
                lowerThreshold={20}
                upperThreshold={20}
                onScrollToUpper={e => {
                  console.log('scrollToUpper', e)
                }}
                onScroll={e => {
                  console.log('scroll', e)
                }}
              >
                {loading ? (
                  <View>
                    <Skeleton title row={3} />
                    <Skeleton style={{ margin: '80rpx 0' }} title row={3} />
                    <Skeleton style={{ margin: '80rpx 0' }} title row={3} />
                    <Skeleton style={{ margin: '80rpx 0' }} title row={3} />
                    <Skeleton style={{ margin: '80rpx 0' }} title row={3} />
                    <Skeleton title row={3} />
                  </View>
                ) : (
                  <Fragment>
                    {todoListRender.length <= 0 ? (
                      <Empty>
                        <Empty.Description style={{ color: '#27296d' }}>
                          没有内容哦~
                        </Empty.Description>
                      </Empty>
                    ) : (
                      todoListRender.map(item => (
                        <ToDOItem
                          key={item.id}
                          title={item.title}
                          data={item}
                          onChange={v => finishItem(item.id, !item.completed)}
                          onDelete={() => onDeleteItem(item.id)}
                        />
                      ))
                    )}
                  </Fragment>
                )}
              </ScrollView>
            </Tabs.TabPane>
          ))}
        </Tabs>
        <View className={styles.buttonArea} onClick={onOpenDialog}>
          +
        </View>

        <AddToDoDialog open={open} onClose={onCloseDialog} />
      </View>
    </ConfigProvider>
  )
}
