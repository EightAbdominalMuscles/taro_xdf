import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
// alias测试
// import './index.scss'
import '@/pages/index/index.scss'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  
  config = {
    navigationBarTitleText: '首页'
  }
  render () {
    return (
      <View className='index'>1231
      </View>
    )
  }
}
