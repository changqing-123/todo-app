import Card from '@/components/Card/card'
import todolistStore from '@/store/todolistStore'
import { Tag } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro, { useDidHide, useDidShow } from '@tarojs/taro'
import { VChart } from '@visactor/taro-vchart'
import { useEffect, useMemo, useState } from 'react'
import { chartSpec, lineSpec } from './constants'
import styles from './index.module.scss'

export const StatsPage = () => {
  const [chartKey, setChartKey] = useState(0)
  const todoList = todolistStore(state => state.list)
  const statistics = todolistStore(state => state.statistics)

  const isToday = dateString => {
    if (!dateString) return false

    const today = new Date().toLocaleDateString('zh-CN')
    const date = new Date(dateString).toLocaleDateString('zh-CN')

    return today === date
  }

  // 处理饼图数据
  const pieChartData = useMemo(() => {
    if (!todoList || todoList.length === 0) return []

    return todoList
      .filter(ite => ite.completed)
      .map(item => ({ type: item.title, value: item.duration }))
  }, [todoList])

  // 处理折线图数据
  const lineChartData = useMemo(() => {
    if (!todoList || todoList.length === 0) return []

    return todoList
      .filter(ite => ite.completed && ite.end_time && isToday(ite.end_time))
      .sort((a, b) => new Date(a.end_time).getTime() - new Date(b.end_time).getTime())
      .map(item => ({
        time: new Date(item.end_time).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        value: item.duration / 60
      }))
  }, [todoList])

  // 当数据变化时强制重新渲染图表
  useEffect(() => {
    // 每次数据变化时增加 key 值，强制重新渲染图表
    setChartKey(prev => prev + 1)
  }, [pieChartData, lineChartData])

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
    console.log('统计页面显示')
    // 页面显示时强制刷新
    setChartKey(prev => prev + 1)
  })

  useDidHide(() => {
    console.log('统计页面隐藏')
  })

  return (
    <View className={styles.container}>
      <Card title="待办统计">
        <View className={styles.sumTodoCount}>
          <View>
            <Tag style={{ backgroundColor: '#a393eb', borderRadius: '12rpx' }} size="medium">
              总数:{statistics.total}
            </Tag>
          </View>
          <View>
            <Tag
              color="success"
              size="medium"
              style={{ backgroundColor: '#1fab89', borderRadius: '12rpx' }}
            >
              已完成:{statistics.completed}
            </Tag>
          </View>
          <View>
            <Tag
              color="danger"
              size="medium"
              style={{ backgroundColor: '#e61c5d', borderRadius: '12rpx' }}
            >
              未完成:{statistics.uncompleted}
            </Tag>
          </View>
          <View>
            <Tag
              color="primary"
              size="medium"
              style={{ backgroundColor: '#00bbf0', borderRadius: '12rpx' }}
            >
              今日完成:{todayStats.count}
            </Tag>
          </View>
        </View>
      </Card>
      <Card title="待办时长占比">
        <VChart
          key={`pie-chart-${chartKey}`} // 强制重新渲染
          style={{
            width: '100%',
            height: '500rpx'
          }}
          type={Taro.getEnv() as any}
          spec={{
            ...chartSpec,
            data: [
              {
                id: 'pieData',
                values: pieChartData.length > 0 ? pieChartData : [{ type: '暂无数据', value: 1 }]
              }
            ]
          }}
          canvasId={`pie-chart-${chartKey}`}
          onChartReady={chart => {
            console.log('饼图准备就绪', chartKey)
          }}
        />
      </Card>
      <Card title="每日专注统计">
        <VChart
          key={`line-chart-${chartKey}`} // 强制重新渲染
          style={{
            width: '100%',
            height: '300rpx'
          }}
          type={Taro.getEnv() as any}
          spec={{
            ...lineSpec,
            data: [
              {
                id: 'lineData',
                values: lineChartData.length > 0 ? lineChartData : [{ time: '00:00', value: 0 }]
              }
            ]
          }}
          canvasId={`bar-chart-${chartKey}`}
          onChartReady={chart => {
            console.log('折线图准备就绪', chartKey)
          }}
        />
      </Card>
    </View>
  )
}

export default StatsPage
