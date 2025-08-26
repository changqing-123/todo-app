import { createTodo } from '@/apis/todoServices'
import { Button, Form, Input, Popup, Radio } from '@taroify/core'
import { FormInstance } from '@taroify/core/form'
import { Cross } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

export default function AddToDoDialog({ open, onClose }) {
  const formRef = useRef<FormInstance>()
  const onSubmit = async () => {
    try {
      if (!formRef.current) return
      const values: any = formRef.current.getValues()
      const res = await createTodo(values)
      if (res.statusCode === 200) {
        onClose()
      }
      console.log('res--', res)
    } catch (error) {
      console.error('创建失败', error)
    }
  }

  useEffect(() => {
    if (open && formRef.current) {
      formRef.current.reset()
    }
  }, [open])

  return (
    <View>
      <Popup
        className={styles.addDialog}
        placement="bottom"
        rounded
        lock={false}
        open={open}
        onClose={onClose}
      >
        <View className={styles.title}>
          <Text>添加待办</Text>
          <View onClick={onClose}>
            <Cross />
          </View>
        </View>

        <View className={styles.content}>
          <Form ref={formRef}>
            <Form.Item name="title" rules={[{ required: true, message: '请输入待办事项名称' }]}>
              <Form.Control>
                <Input placeholder="待办事项名称" />
              </Form.Control>
            </Form.Item>
            <Form.Item name="priority">
              <Form.Label>优先级</Form.Label>
              <Form.Control>
                <Radio.Group className={styles.priority} direction="horizontal">
                  <Radio name={'low'}>低</Radio>
                  <Radio name={'medium'}>中</Radio>
                  <Radio name={'high'}>高</Radio>
                </Radio.Group>
              </Form.Control>
            </Form.Item>

            <Button className={styles.addSubmit} shape="round" onClick={onSubmit}>
              确认添加
            </Button>
          </Form>
        </View>
      </Popup>
    </View>
  )
}
