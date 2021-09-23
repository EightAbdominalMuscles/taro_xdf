> 参数

## ScrollFollow 组件参数


| 参数名 | 参数描述 | 参数类型 | 说明 |
| :----:| :----: | :----: | :----: |
| defaultValue | 默认选中的value | Number | （一般填写下标 + 1） |
| handleSelect | 选择事件 | Fun | 用来复值或者其他操作 |
| scrollClass | 自定义ScrollView的Class | String | - |
| scrollStyle | 自定义ScrollView的Style | JSON | - |
| scrollBoxClass | 自定义当前数据外层box的Class | String | - |

## scrollFollowItem 组件参数


| 参数名 | 参数描述 | 参数类型 | 说明 |
| :----:| :----: | :----: | :----: |
| label | 描述 | String | 显示内容 |
| value | 值 | Number | 一般是当前下表 |
| className | 自定义Class | String ｜ JSON | - |
| activeClass | 自定义选中 | String ｜ JSON | - |

### 例子
```jsx
import ScrollFollow from '@/components/scrollFollow'
import ScrollFollowItem from '@/components/scrollFollowItem'
handleSelect = ({value, label}) => {
  // 选中的value和label
  this.setState({
    page: value
  })
}
<ScrollFollow
  scrollStyle={{ height: '62vh' }}
  defaultValue={page}
  handleSelect={this.handleSelect}
>
  {['aboriginal','boriginal', 'coriginal', 'doriginal','eoriginal','foriginal','aoriginal','boriginal', 'coriginal', 'd','e','f','a','b', 'c', 'd','e','f','a','b', 'c', 'd','e','f','a','b', 'c', 'd','e','f','a','b', 'c', 'd','e','f']
    .map((item, index) => {
      return <ScrollFollowItem
        label={item}
        value={index+1}
      />
    })
  }
</ScrollFollow>
```