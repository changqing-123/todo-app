import Card from '@/components/Card/card'
import { EChart } from '@/echarts-taro3-react'
import todolistStore from '@/store/todolistStore'
import { Tag } from '@taroify/core'
import { View } from '@tarojs/components'
import { useEffect, useMemo, useRef, useState } from 'react'
import { lineDefaultOption, pieDefaultOption } from './constants'
import styles from './index.module.scss'
export const StatsPage = () => {
  const refPieChart = useRef<any>(null)
  const refLineChart = useRef<any>(null)
  const [pieOption, setPieOption] = useState<any>(pieDefaultOption)
  const [lineOption, setLineOption] = useState(lineDefaultOption)
  const todoList = todolistStore(state => state.list)
  const statistics = todolistStore(state => state.statistics)

  const isToday = dateString => {
    if (!dateString) return false

    const today = new Date().toLocaleDateString('zh-CN')
    const date = new Date(dateString).toLocaleDateString('zh-CN')

    return today === date
  }

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

  // 处理饼图数据
  const pieChartData = useMemo(() => {
    if (!todoList || todoList.length === 0) return []

    return todoList
      .filter(ite => ite.completed)
      .map(item => ({ name: item.title, value: item.duration }))
  }, [todoList])

  // 处理折线图数据
  const lineChartData = useMemo(() => {
    if (!todoList || todoList.length === 0) return []

    return todoList
      .filter(ite => ite.completed && ite.end_time && isToday(ite.end_time))
      .sort((a, b) => new Date(a.end_time).getTime() - new Date(b.end_time).getTime())
      .map(item => [new Date(item.end_time).getTime(), item.duration / 60])
  }, [todoList])

  useEffect(() => {
    if (!pieChartData || pieChartData.length === 0) {
      return
    }
    const newOption: any = {
      ...pieOption,
      series: [{ ...pieOption.series[0], data: [...pieChartData] }]
    }
    setPieOption(newOption)
  }, [pieChartData])

  useEffect(() => {
    if (!lineChartData || lineChartData.length === 0) {
      return
    }
    const newOption: any = {
      ...lineDefaultOption,
      xAxis: {
        ...lineDefaultOption.xAxis
      },
      series: [
        {
          ...lineDefaultOption.series[0],
          data: [...lineChartData]
        }
      ]
    }
    setLineOption(newOption)
  }, [lineChartData])

  useEffect(() => {
    if (refPieChart.current && pieOption) {
      refPieChart.current.refresh(pieOption)
    }
  }, [refPieChart, pieOption])

  useEffect(() => {
    if (refLineChart.current && lineOption) {
      console.log('lineOption', lineOption)
      refLineChart.current.refresh(lineOption)
    }
  }, [refLineChart, lineOption])

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
        <View
          style={{
            width: '100%',
            height: '500rpx'
          }}
        >
          <EChart ref={refPieChart} canvasId={`pie-chart`} />
        </View>
      </Card>
      <Card title="每日专注统计">
        <View
          style={{
            width: '100%',
            height: '500rpx'
          }}
        >
          <EChart ref={refLineChart} canvasId={`line-chart`} />
        </View>
      </Card>
    </View>
  )
}

export default StatsPage
