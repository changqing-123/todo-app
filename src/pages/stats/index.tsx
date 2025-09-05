import Card from '@/components/Card/card'
import useGetTodoList from '@/hooks/useGetTodoList'
import { Tag } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { VChart } from '@visactor/taro-vchart'
import { useEffect, useMemo, useState } from 'react'
import { chartSpec, lineSpec } from './constants'
import styles from './index.module.scss'

export const StatsPage = () => {
  // const todoList = todolistStore(state => state.list)
  const { todoList, run, statistics } = useGetTodoList()
  const [pieData, setPieData] = useState<any>(chartSpec)
  const [lineData, setLineData] = useState<any>(lineSpec)

  const isToday = dateString => {
    if (!dateString) return false

    const today = new Date().toLocaleDateString('zh-CN')
    const date = new Date(dateString).toLocaleDateString('zh-CN')

    return today === date
  }

  useEffect(() => {
    if (todoList && todoList.length > 0) {
      setPieData(preVal => ({
        ...preVal,
        data: {
          ...preVal.data,
          values: [
            ...todoList
              .filter(ite => ite.completed)
              .map(item => ({ type: item.title, value: `${item.duration}` }))
          ]
        }
      }))

      setLineData(preVal => ({
        ...preVal,
        data: {
          ...preVal.data,
          values: [
            ...todoList
              .filter(ite => ite.completed && ite.end_time && isToday(ite.end_time))
              .sort((a, b) => (new Date(a.end_time) as any) - (new Date(b.end_time) as any)) // 按时间排序
              .map(item => ({
                time: new Date(item.end_time).toLocaleTimeString('zh-CN', {
                  hour: '2-digit',
                  minute: '2-digit',
                  hour12: false
                }),
                value: item.duration / 60
              }))
          ]
        }
      }))
    }
  }, [todoList])

  // 计算今天的统计数据
  const todayStats = useMemo(() => {
    if (!todoList || todoList.length === 0) return { count: 0, totalDuration: 0 }

    const todayCompleted = todoList.filter(
      ite => ite.completed && ite.end_time && isToday(ite.end_time)
    )

    const count = todayCompleted.length
    const totalDuration = todayCompleted.reduce((sum, item) => sum + (item.duration || 0), 0)

    return { count, totalDuration }
  }, [todoList])

  useDidShow(() => {
    run()
  })
  return (
    <View className={styles.container}>
      <Card title="待办统计">
        <View className={styles.sumTodoCount}>
          <View>
            <Tag style={{ backgroundColor: '#27296d', borderRadius: '12rpx' }} size="medium">
              总数:{statistics.total}
            </Tag>
          </View>
          <View>
            <Tag
              color="success"
              size="medium"
              style={{ backgroundColor: '#00396d', borderRadius: '12rpx' }}
            >
              已完成:{statistics.completed}
            </Tag>
          </View>
          <View>
            <Tag
              color="danger"
              size="medium"
              style={{ backgroundColor: '#c93e5a', borderRadius: '12rpx' }}
            >
              未完成:{statistics.uncompleted}
            </Tag>
          </View>
          <View>
            <Tag
              color="danger"
              size="medium"
              style={{ backgroundColor: '#1890ff', borderRadius: '12rpx' }}
            >
              今日完成:{todayStats.count}
            </Tag>
          </View>
        </View>
      </Card>
      <Card title="待办时长占比">
        <VChart
          style={{
            width: '100%',
            height: '500rpx'
          }}
          type={Taro.getEnv() as any}
          spec={pieData}
          canvasId="pie-chart"
          onChartReady={() => {
            console.log('onChartReady')
          }}
        />
      </Card>
      <Card title="每日专注统计">
        <VChart
          style={{
            width: '100%',
            height: '300rpx'
          }}
          type={Taro.getEnv() as any}
          spec={lineData}
          canvasId="bar-chart"
          onChartReady={() => {
            console.log('onChartReady')
          }}
        />
      </Card>
    </View>
  )
}

export default StatsPage
