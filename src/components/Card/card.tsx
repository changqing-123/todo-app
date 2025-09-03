import { View } from '@tarojs/components'
import { ReactNode } from 'react'
import styles from './card.module.scss'

interface IProps {
  children: ReactNode
  title?: ReactNode
  right?: ReactNode
  style?: object
}
export default function Card({ children, title, right, style }: IProps) {
  return (
    <View className={styles.cardContainer} style={style}>
      <View className={styles.cardHeader}>
        <View className={styles.cardTitle}>{title}</View>
        <View className={styles.cardRight}>{right}</View>
      </View>
      <View className={styles.cardContent}>{children}</View>
    </View>
  )
}
