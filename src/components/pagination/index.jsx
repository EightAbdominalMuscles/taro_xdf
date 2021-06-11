import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";
export default class Pagination extends Taro.Component {
  state = {
  }
  componentWillMount () {}
  goPrev () {
    const { page, handleChange} = this.props
    let newPage = page - 1
    if(newPage <1) {
      Taro.showToast({ icon: "none", mask: true, title: "到头了!", duration: 800});
      console.log('到头了')
    } else {
      handleChange(newPage, -1)
    }
  }
  goNext () {
    const { total, page, handleChange} = this.props
    let newPage = page + 1
    if (newPage > total) {
      Taro.showToast({ icon: "none", mask: true, title: "没有更多了!", duration: 800});
      console.log('没有更多了')
    }else {
      handleChange(newPage, 1)
    }
    
  }
  render() {
    const {prevDom, nextDom} = this.props
    return (
      <View className='pagination'>
        <View onClick={() => { this.goPrev() }}>{prevDom}</View>
        <View  onClick={() => { this.goNext() }}>{nextDom}</View>
      </View>
    );
  }
}