import Card from '@/components/Card/card'
import useGetTodoList from '@/hooks/useGetTodoList'
import { Tag } from '@taroify/core'
import { View } from '@tarojs/components'
import Taro, { useDidShow } from '@tarojs/taro'
import { VChart } from '@visactor/taro-vchart'
import { useEffect, useState } from 'react'
import { chartSpec, lineSpec } from './constants'
import styles from './index.module.scss'

export const StatsPage = () => {
  // const todoList = todolistStore(state => state.list)
  const { todoList, run, statistics } = useGetTodoList()
  const [pieData, setPieData] = useState<any>(chartSpec)

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
    }
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
          spec={lineSpec}
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
