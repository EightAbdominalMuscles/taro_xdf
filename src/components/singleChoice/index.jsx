import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";

import "./index.scss";
export default class SingleChoice extends Taro.Component {
  static defaultProps = {
    item: {},
    defaultClass: '',
    defaultIconClass: '',
    selectClass: '',
    bingoClass: '',
    wrongClass: '',
    // 1  是选择不展示对错  2 选择直接展示对错 3结果
    answerType: 2,
    selectClick: null,
  }
  state = {
  }
  isErrorAnswer (item, i) {
    if ((item.currentOption === item['optionSeq' + i] && item.currentOption !== item.answer)) {
      return true
    } else {
      return false
    }
  }
  isBingoAnswer (item, i) {
    if ((item.currentOption && item['optionSeq' + i] === item.answer)) {
      return true
    } else {
      return false
    }
  }
  componentWillMount () {}
  render() {
    const {item, defaultClass, selectClass, bingoClass, wrongClass, selectClick, defaultIconClass, answerType} = this.props
    return (
      <View>
        {
          answerType === 1 && (
            <View>
              <View className={`${defaultClass} ${defaultIconClass === '' && (item.currentOption === item.optionSeq1 ? selectClass: '')}}`} onClick={() => {selectClick && selectClick(item.id, item.optionSeq1, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${(item.currentOption === item.optionSeq1 ? selectClass: '')}}`}></View>}
                {item.option1}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && (item.currentOption === item.optionSeq2 ? selectClass: '')}}`} onClick={() => {selectClick && selectClick(item.id, item.optionSeq2, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${(item.currentOption === item.optionSeq2 ? selectClass: '')}}`}></View>}
                {item.option2}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && (item.currentOption === item.optionSeq3 ? selectClass: '')}}`} onClick={() => {selectClick && selectClick(item.id, item.optionSeq3, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${(item.currentOption === item.optionSeq3 ? selectClass: '')}}`}></View>}
                {item.option3}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && (item.currentOption === item.optionSeq4 ? selectClass: '')}}`} onClick={() => {selectClick && selectClick(item.id, item.optionSeq4, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${(item.currentOption === item.optionSeq4 ? selectClass: '')}}`}></View>}
                {item.option4}
              </View>
            </View>
          )
        }
        {
          answerType === 2 && (
            <View>
              <View className={`${defaultClass} ${defaultIconClass === '' && this.isBingoAnswer(item, 1) ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 1) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq1, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${this.isBingoAnswer(item, 1) ? bingoClass : ''} ${this.isErrorAnswer(item, 1) ? wrongClass : ''}`}></View>}
                {item.option1}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && this.isBingoAnswer(item, 2) ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 2) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq2, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${this.isBingoAnswer(item, 2) ? bingoClass : ''} ${this.isErrorAnswer(item, 2) ? wrongClass : ''}`}></View>}
                {item.option2}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && this.isBingoAnswer(item, 3) ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 3) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq3, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${this.isBingoAnswer(item, 3) ? bingoClass : ''} ${this.isErrorAnswer(item, 3) ? wrongClass : ''}`}></View>}
                {item.option3}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && this.isBingoAnswer(item, 4) ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 4) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq4, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${this.isBingoAnswer(item, 4) ? bingoClass : ''} ${this.isErrorAnswer(item, 4) ? wrongClass : ''}`}></View>}
                {item.option4}
              </View>
            </View>
          )
        }
        {
          answerType === 3 && (
            <View>
              <View className={`${defaultClass} ${defaultIconClass === '' && item.optionSeq1 === item.answer ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 1) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq1, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${item.optionSeq1 === item.answer ? bingoClass : ''} ${this.isErrorAnswer(item, 1) ? wrongClass : ''}`}></View>}
                {item.option1}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && item.optionSeq2 === item.answer ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 2) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq2, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${item.optionSeq2 === item.answer ? bingoClass : ''} ${this.isErrorAnswer(item, 2) ? wrongClass : ''}`}></View>}
                {item.option2}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && item.optionSeq3 === item.answer ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 3) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq3, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${item.optionSeq3 === item.answer ? bingoClass : ''} ${this.isErrorAnswer(item, 3) ? wrongClass : ''}`}></View>}
                {item.option3}
              </View>
              <View className={`${defaultClass} ${defaultIconClass === '' && item.optionSeq4 === item.answer ? bingoClass : ''}  ${defaultIconClass === '' && this.isErrorAnswer(item, 4) ? wrongClass : ''}`}  onClick={() => {selectClick && selectClick(item.id, item.optionSeq4, item)}}>
                {defaultIconClass && <View className={`${defaultIconClass} ${item.optionSeq4 === item.answer ? bingoClass : ''} ${this.isErrorAnswer(item, 4) ? wrongClass : ''}`}></View>}
                {item.option4}
              </View>
            </View>
          )
        }
      </View>
    );
  }
}