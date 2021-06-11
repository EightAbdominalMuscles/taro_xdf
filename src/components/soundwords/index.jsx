import Taro from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";

import "./index.scss";
export default class Soundwords extends Taro.Component {
  state = {
    sound: null,
    words: null,
    scrollTop:0,
  }
  componentWillMount () {}
  /**
   * 组件更新后
   */
   componentDidUpdate(prevProps, prevState) {
    if (this.props.words !== prevProps.words) {
      this.setState({
        scrollTop: 0,
      })
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.words !== state.words) {
      let soundList, wordsList
      const {sound, words} = props
      const newWords = words
        .replace(/[\r\n]/g, '')
        .replace(/<\/br>$/g, '')
        
        .split(/<\/br>/g)
      wordsList = newWords.map((item) => {
        return item.split('')
      })
      if (sound) {
        const newSound = sound
        .replace(/[\r\n]/g, '')
        .replace(/<\/br>$/g, '')
        
        .split(/<\/br>/g)
        soundList = newSound.map((item) => {
          return item.trim().split(' ')
        })
        if (soundList.length !== wordsList.length) {
          console.error(`拼音跟字数组不匹配 拼音=>${sound}，长度：${soundList.length} 字=>${words}，长度：${wordsList.length}`)
          console.log(`拼音：${JSON.stringify(soundList)},文字：${JSON.stringify(wordsList)}`)
        }
      }
      return {...props, soundList, wordsList}
    }
    return
  }
  render() {
    const {soundList, wordsList, scrollTop} = this.state
    const {scrollHeight} = this.props
    return (
      <View className='soundwords'>
        <ScrollView  scrollTop={scrollTop} style={{ height: scrollHeight }} scrollY scrollWithAnimation>
          <View className='soundwords_box'>
            {wordsList.map((item, index) => {
              return <View className='soundwords_ul'>
                {item.map((val, idx) => {
                  return <View className='soundwords_li'>
                    {soundList && <View className='soundwords_symbol'>{soundList[index][idx]}</View>}
                    <View className='soundwords_txt'>{val}</View>
                  </View>
                })}
              </View>
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}