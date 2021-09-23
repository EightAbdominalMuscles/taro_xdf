import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import classnames from 'classnames'
import "./index.scss";
export default class ScrollFollowItem extends Taro.Component {
  state = {
    selected: false
  }
  componentWillMount () {}
  handleActive ({value, label}) {
    const {handleSelect} =this.props
    handleSelect({value, label})
  }
  render() {
    const { label, value, className = '', activeClass = 'active', defaultValue, handleSelect } = this.props;
    const active = defaultValue === value ? true : false
    return (
      <View className={
        classnames({
          'scrollFollowItem': true,
          [className] : true,
          [activeClass]: active
        })
      } onClick={() => handleSelect({value, label})} >{label}</View>
    );
  }
}