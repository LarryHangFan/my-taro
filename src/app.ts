import { Component, PropsWithChildren } from 'react'
import store from './store'
import { Provider } from '@tarojs/redux'
import './app.scss'
import { View } from 'react-native'

class App extends Component<PropsWithChildren> {

  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <View>
      { this.props.children }
      < /View>
    )
  }
}
export default App
