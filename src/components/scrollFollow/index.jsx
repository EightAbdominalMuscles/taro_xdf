import Taro from "@tarojs/taro";
import { View, ScrollView } from "@tarojs/components";
import classnames from 'classnames'
import "./index.scss";
export default class ScrollFollow extends Taro.Component {
  layoutDom = Taro.createRef()
  ScrollDom = Taro.createRef()
  state = {
    // 设置默认值
    defaultValue: '',
    scrollTop: 0
  }
  componentWillMount () {
    const {defaultValue} = this.props
    this.setState({
      defaultValue
    })
  }
  static getDerivedStateFromProps(props, state) {
    if (props.defaultValue !== state.defaultValue) {
      return {defaultValue: props.defaultValue}
    }
    return
  }
  // 在scrollFollow中设置滚动条
  setScrollTop (value) {
    // 滚动组件 居中的位置
    const scroolCenter = this.ScrollDom.current.container.offsetHeight / 2
    // 包裹list的 View 的总高度
    // const boxH = this.layoutDom.current.vnode.dom.offsetHeight
    // 当前点击View 的 上卷度
    const liDom = this.layoutDom.current.props.children[value-1].dom
    const scrollTop = liDom.offsetTop - liDom.offsetHeight - scroolCenter
    this.setState({
      scrollTop: liDom.offsetTop - liDom.offsetHeight - scroolCenter
    })
  }
  handleSelect = (data) => {
    this.setScrollTop(data.value)
    const {handleSelect} = this.props
    handleSelect(data)
  }
  render() {
    const {scrollClass, scrollStyle, scrollBoxClass, children} = this.props
    const {value, scrollTop, defaultValue} = this.state
    return (
      <ScrollView 
        ref={this.ScrollDom}
        className={
          classnames({
            'scrollFollow': true,
            [scrollClass]: scrollClass,
          })
        }
        style={scrollStyle}
        scrollTop={scrollTop}
        scrollY
        scrollWithAnimation
      >
        <View 
          className={
            classnames({
              [scrollBoxClass]: scrollBoxClass
            })
          }
          ref={this.layoutDom}
        >
          {children && children.length > 0 && 
            children.map(child => (
              Taro.cloneElement(child, {
                defaultValue: defaultValue,
                handleSelect: this.handleSelect
              })
            ))
          }
        </View>
      </ScrollView>
    );
  }
}