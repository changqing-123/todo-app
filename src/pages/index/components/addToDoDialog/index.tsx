import { createTodo } from '@/apis/todoServices'
import { Button, Form, Input, Popup, Radio, Textarea, Toast } from '@taroify/core'
import { FormInstance } from '@taroify/core/form'
import { Cross } from '@taroify/icons'
import { Text, View } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'

export default function AddToDoDialog({ open, onClose }) {
  const formRef = useRef<FormInstance>()
  const [timerType, setTimerType] = useState<'forward' | 'backward' | 'none'>('forward')
  const onSubmit = async () => {
    try {
      if (!formRef.current) return
      console.log('formRef.current.validate()')
      await formRef.current.validate()
      const values: any = formRef.current.getValues()
      if (values.duration) {
        values.duration = Number(values.duration)
      }
      const res = await createTodo(values)
      if (res.statusCode === 200) {
        onClose()
      } else {
        Toast.fail('创建失败')
      }
      console.log('res--', res)
    } catch (error) {
      console.error('创建失败', error)
      Toast.fail('创建失败')
    }
  }

  const onValuesChange = values => {
    console.log('values--', values)
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
          <Form ref={formRef} onValuesChange={onValuesChange}>
            <Form.Item name="title" rules={[{ required: true, message: '请输入待办事项名称' }]}>
              <Form.Control>
                <Input placeholder="待办事项名称" />
              </Form.Control>
            </Form.Item>
            <Form.Item name="todo_desc">
              {' '}
              {/* 添加描述输入框 */}
              <Form.Control>
                <Textarea placeholder="待办事项描述（可选）" />
              </Form.Control>
            </Form.Item>
            <Form.Item name="priority" defaultValue={'low'}>
              <Form.Label>优先级</Form.Label>
              <Form.Control>
                <Radio.Group className={styles.priority} direction="horizontal">
                  <Radio name={'low'}>低</Radio>
                  <Radio name={'medium'}>中</Radio>
                  <Radio name={'high'}>高</Radio>
                </Radio.Group>
              </Form.Control>
            </Form.Item>
            <Form.Item name="timer_type" defaultValue={'forward'}>
              <Form.Label>计时类型</Form.Label>
              <Form.Control>
                <Radio.Group
                  className={styles.timerType}
                  direction="vertical"
                  value={timerType}
                  onChange={value => {
                    setTimerType(value)
                    formRef.current?.setFieldsValue({
                      timer_type: value
                    })
                  }}
                >
                  <Radio name={'forward'}>正计时</Radio>
                  <Radio name={'backward'}>倒计时</Radio>
                  <Radio name={'none'}>不计时</Radio>
                </Radio.Group>
              </Form.Control>
            </Form.Item>
            {timerType !== 'none' && (
              <Form.Item name="duration" rules={[{ required: true, message: '请输入计时时长' }]}>
                <Form.Control>
                  <Input placeholder="请输入计时时长" />
                </Form.Control>
              </Form.Item>
            )}
            <Button className={styles.addSubmit} shape="round" onClick={onSubmit}>
              确认添加
            </Button>
          </Form>
        </View>
      </Popup>
    </View>
  )
}
