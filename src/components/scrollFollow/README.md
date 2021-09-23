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