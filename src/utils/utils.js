export function getArrItem(item) {
  return item
  .replace(/[\r\n]/g, '')
  .replace(/<\/br>$/g, '')
  .split(/<\/br>/g)
}

/**
 * js 目标字符串在另一个字符串中第n次出现时替换
 */
export function replaceIdxString (str) {
  let strMatch = str
  /**
   * 匹配字
   * 第几个填充
   * 填充字
   */
  return function (word, appearIdx, fillTxt) {
    let txtSpeed = 1
    strMatch = strMatch.replace(new RegExp(word,'gm'), function (t) {
      if (txtSpeed === appearIdx) {
        txtSpeed++
        return fillTxt
      }else {
        txtSpeed++
        return t
      }
    })
    return strMatch
  }
}
/**
 * 目标字符串在数组中出现的位置
 */
export function findStringIdx (arr, txt ,idx) {
  let num = 0
  let regexp = new RegExp(txt,'gm'); 
  for(let i=0; i<arr.length; i++) {
    num += arr[i].match(regexp) === null ? 0 : 1
    if (i ===idx) {
      break;
    }
  }
  return num
}

/**
 * 填充字
 */
export function fillMiddleBlanks(txt, fillTxt, length) {
  const middle = Math.floor(length/2)
  let arr = Array.from({length: length}, ()=> {
    return fillTxt
  })
  arr[middle] = txt
  return arr.join('')
}
/**
 * 属性值对比，获取新的list
 */
 export function setAttrToList(list, attr, value) {
  return list.filter((val) => {
    return val[attr] === value
  })
}
/**
 * 获取当前元素所在下标
 */
 export function getIdByAttr(list, attr, value) {
   let currentIdx = null
  list.map((item, idx) => {
    if (item[attr] === value) {
      currentIdx = idx
    }
  })
  return currentIdx
}
/**
 * 属性值对比，获取新的list
 */
 export function setAttrNoList(list, attr, value) {
  return list.filter((val) => {
    return val[attr] !== value
  })
}
/**
 * 数组对象去重
 * list 原数据
 * attr 
 * @returns 
 */
export function distinct(list, attr) {
  const result = []
  let hash = {}
  for(let item of list) {
    if (!hash[item[attr]]) {
      result.push(item)
      hash[item[attr]] = item[attr]
    }
  }
  return result
}
/**
 * 随机数组 取n个
 * 思路: 让数组随机排序取前n个
 * limit 限制长度
 * repeat 再次调用是否有可能重复
 */
export const randomArr = ({arr, limit = arr.length, repeat = false}) => {
    let list = arr.sort(() => .5 - Math.random())
  if (repeat === true) {
    let start =0
    return function (appointLimit) {
      const newList = list.slice(start, appointLimit ? (appointLimit + start) : (limit + start))
      start+= appointLimit || limit
      if (limit + start > list.length) {
        console.log(`数组剩余长度不够截取${limit}个，返回${newList.length}个`)
      }
      return newList
    }
  } else {
    return list.slice(0, limit)
  }
}

/**
 * 生成随机数
 */
export function randomNum(min, max, repeat) {
  if (repeat === true) {
    if (min >= max) {
      console.log('min>max=>参数异常');
      return
    }
    let arr = Array.from({length: max - min}, (v, k)=> {
      return k + min
    })
    let start = 0
    const ranNumArr = randomArr({arr: arr})
    return function () {
      const num = ranNumArr[start]
      start++
      if (start>max) {
        console.log('没有未重复随机数了')
        return start
      }
      return num
    }
  }else {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
}
/**
 * 计时器
 */
export const countTime = (callback) => {
    let timer = null
    let startTime = 0
    timer = setInterval(() => {
        startTime+=1000
        let time = timestampTotime('{%m}:{%s}', startTime)
        callback && callback(time, timer)
    }, 1000)
}
/**
 * 获取当前时间
 */
export const getTime = () => {
    var time = new Date();    
    var year = time.getFullYear();    
    var month = time.getMonth() + 1;    
    var day = time.getDate();    
    var hour = time.getHours();    
    var minus = time.getMinutes();   
    var second = time.getSeconds(); 

    var week = time.getDay();    
    var area = '日一二三四五'   
    return {
        year: year,
        month: addZero(month),
        day: addZero(day),
        week: area[week],
        hour: addZero(hour),
        minus: addZero(minus),
        second: addZero(second),
        timestamp: time.getTime()
    }
}
export const addZero = (value) => {
    return value < 10 ? "0" + value : value;
}
/**
 * 日期格式化
 * @param format 日期格式 {%d天}{%h时}{%m分}{%s秒}{%f毫秒}
 * @param time 单位 毫秒
 * @returns {string}
 */
export const timestampTotime = (format, time) => {
    time = parseInt(time);
    let t = {};
    let floor = Math.floor;
    t.f = time % 1000;
    time = floor(time / 1000);
    t.s = time % 60;
    time = floor(time / 60);
    t.m = time % 60;
    time = floor(time / 60);
    t.h = time % 24;
    t.d = floor(time / 24);
    let ment = function (a) {
      if (a <= 0) {
        return '00';
      }
      return `$1${a < 10 ? `0${a}` : a}$2`;
    };
    let ment2 = function (a) {
      if (a <= 0) {
        return '0';
      }
      return `$1${(a < 10 ? `0${a}` : a).toString().substring(0, 1)}$2`;
    };
    let zero = function (a) {
      if (a < 10) {
        return `0${a}`;
      }
      return a;
    };
    format = format.replace(/\{([^{]*?)%d(.*?)\}/g, ment(t.d));
    format = format.replace(/\{([^{]*?)%h(.*?)\}/g, ment(t.h));
    format = format.replace(/\{([^{]*?)%m(.*?)\}/g, ment(t.m));
    format = format.replace(/\{([^{]*?)%s(.*?)\}/g, ment(t.s));
    format = format.replace(/\{([^{]*?)%f(.*?)\}/g, ment2(t.f));
    return {
      format,
      t: {
        d: zero(t.d),
        h: zero(t.h),
        m: zero(t.m),
        s: zero(t.s),
        f: t.f,
      },
    };
}