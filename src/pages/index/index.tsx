import { View, Text, Image, Button } from '@tarojs/components'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import React from 'react'
import './index.scss'
import { increment } from '@/store/reducers/counter'

const Home: React.FC = () => {

  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()


  return <View className='index'>
    <Text>{count}</Text>
    <Button onClick={() => {
      dispatch(increment())
    }}>加一</Button>
    <Image
      style='width: 300px;height: 100px;background: #fff;'
      src='https://camo.githubusercontent.com/3e1b76e514b895760055987f164ce6c95935a3aa/687474703a2f2f73746f726167652e333630627579696d672e636f6d2f6d74642f686f6d652f6c6f676f2d3278313531333833373932363730372e706e67'
    />
  </View>
}

export default Home