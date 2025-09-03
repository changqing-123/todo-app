import Card from '@/components/Card/card'
import todolistStore from '@/store/todolistStore'
import { Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { VChart } from '@visactor/taro-vchart'
import { useEffect, useState } from 'react'
import { chartSpec, lineSpec } from './constants'
import styles from './index.module.scss'

export const StatsPage = () => {
  const todoList = todolistStore(state => state.list)
  const [pieData, setPieData] = useState<any>(chartSpec)

  useEffect(() => {
    if (todoList && todoList.length > 0) {
      setPieData(preVal => ({
        ...preVal,
        data: {
          ...preVal.data,
          values: [...todoList.map(item => ({ type: item.title, value: `${item.duration}` }))]
        }
      }))
    }
  }, [todoList])

  useEffect(() => {
    console.log('pieData', pieData)
  }, [pieData])

  console.log('StatsPage-todoList', todoList)
  console.log('StatsPage-Taro.getEnv()', Taro.getEnv())

  return (
    <View className={styles.container}>
      <Card title="待办统计">
        <View className={styles.sumTodoCount}>
          <Text>总数：</Text>
          <Text>已完成：</Text>
          <Text>未完成：</Text>
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
            height: '500rpx'
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
