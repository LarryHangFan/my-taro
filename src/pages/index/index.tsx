import { View, Text, Image, Button } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import React, { useState } from 'react'
import './index.scss'
import { increment } from '@/store/reducers/counter'
import { getTestData } from '@/apis/user'

const Home: React.FC = () => {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()
  const [test, setTest] = useState<string>('')
  const getData = async () => {
    const res = await getTestData()
    console.log(222, res.)
  }
  return <View className='index'>
    <Text>{count}</Text>
    <Button onClick={() => {
      dispatch(increment())
    }}>加一</Button>
    <Button onClick={() => {
      getData()
    }}>请求数据</Button>
    <Image
      style='width: 300px;height: 100px;background: #fff;'
      src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
    />
  </View>
}

export default Home