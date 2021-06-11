import {poetry} from '@@/mock/cz_gsw_50.js'
import {setAttrToList, randomNum, fillMiddleBlanks, findStringIdx, replaceIdxString, getArrItem} from '@/utils/utils.js'
/**
 * 获取list的某些参数集合
 */
export function getPoetryList() {
  return poetry.RECORDS
}
/**
 * 获取指定ID的数据
 */
export function getPoetryById(id) {
  return setAttrToList(poetry.RECORDS, 'id', id)[0]
}
/**
 * 古诗根据符号切割段落
 */
export function getPoetryItem(item) {
  return item
  .replace(/[\r\n]/g, '')
  .replace(/<\/br>$/g, '')
  .split(/<\/br>/g)
}

/**
 * 扣字
 */
export function getPoetry() {
  const poetryList = JSON.parse(JSON.stringify(poetry.RECORDS))
  return poetryList.map((item) => {
    /**
     * # 先按段落(\n) 区分 
     * # 然后按照段落随机两个数字
     * # 将段落答案抠出
     * # 替换答案为_____①_____
     * # 新加答案字段，将扣出答案放入
     */
    let poetry = item.content
    const poetryArr = getPoetryItem(poetry)
    const randomNumFn = randomNum(0, poetryArr.length, true)
    let randomNum1 = randomNumFn()
    let randomNum2 = randomNumFn()
    if (randomNum1 > randomNum2) {
      [randomNum2, randomNum1] = [randomNum1, randomNum2]
    }
    const replaceStrFn = replaceIdxString(poetry)
    const randomNum1Obj = buttonWord(poetryArr,randomNum1, '①', replaceStrFn)
    poetry = randomNum1Obj.poetry
    item.answerOne = randomNum1Obj.word
    // ! 重复数据  替换了一次，下一次要吧数组置为___ 防止应数据重复导致下标变多
    poetryArr[randomNum1] = '_____________'
    const randomNum2Obj = buttonWord(poetryArr, randomNum2, '②', replaceStrFn)
    item.content = randomNum2Obj.poetry
    item.answerTwo = randomNum2Obj.word
    return item
  })
}
/**
 * 获取扣字细节
 */
export function buttonWord (poetryArr, idx, txt, fn) {
  //~ 拿到每行里面的第一个
  let word;
  try{
    word = poetryArr[idx].match(/([\u4e00-\u9fa5]+)/g)[0]
    //~ 根据length 生成 _____1_____
    const wordLen = word.length
    const fillBlanksTxt = fillMiddleBlanks(txt, '_', wordLen)
    const appearIdx = findStringIdx(poetryArr,word, idx)
    return {
      poetry: fn(word, appearIdx, fillBlanksTxt),
      word
    }
  }catch(e){
    console.log(`未找到当前行的第一个， 当前第${idx}，Arr数据是：${poetryArr}`)
  }
}