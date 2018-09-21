<template>
  <div class="tabs">
    <div class="left" @click="moveToLeft"><img src="@/assets/img/left.png" width="20" height="20" /></div>
    <div class="containerTag" id="containerTag">
      <ul id="left1" :style="translateData">
        <template v-for="(item, index) in TabsList" >
          <li :class="menuActiveArr[menuActiveArr.length - 1] === item.pkid ? 'active' : null" :key="index">
            <a @click="switchTab(item.link)" :title="item.linkName" v-text="item.linkName"></a>
            <img @click="deleteTab(item, index)" src="@/assets/img/close.png" class="closeTag" v-if="item.pkid!==-1" />
          </li>
        </template>
      </ul>
    </div>
    <div class="rightContainer">
      <div class="icon" @click="moreHandle">
        <img src="@/assets/img/other.png" class="allTag">
        <ul v-if="showMore" class="allTagText">
          <template v-for="(item, index) in TabsList" >
            <li :key="index" class="everyTagText" @click="switchTab(item.link)" :title="item.linkName" v-text="item.linkName"></li>
          </template>
        </ul>
      </div>
      <div @click="moveToRight" class="right">
        <img src="@/assets/img/right.png" width="20" hight="20">
      </div>
      <div @click="refresh" class="fresh bg" title="刷新当前标签页">
        <img src="@/assets/img/refresh.png" width="20" height="20">
      </div>
      <div @click="closeHandle" class="closeTagText">
        关闭
        <img src="@/assets/img/zjsjx.png" width="10" height="10" class="rt">
        <div class="closeType" v-if="showClose">
          <div @click="closeAll" class="closeTypeUp">关闭全部标签</div>
          <div @click="closeSiblings" class="closeTypeDown">关闭其他标签</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tabs',
  data () {
    return {
      showMore: false,
      showClose: false,
      translateData: {transform: 'translate(0px)'},
      py: 0
    }
  },
  computed: {
    ...mapState('layout', [
      'TabsList',
      'menuActiveArr'
    ]),
    // 获取当前显示的tab的索引值
    getCurrentIndex () {
      return this.TabsList.findIndex((value) => {
        return value.pkid === this.menuActiveArr[this.menuActiveArr.length - 1]
      })
    }
  },
  mounted () {
    this.hub.$on('TabEvent', () => {
      this.scrollTab()
    })
    window.onresize = () => {
      let allWidth = document.getElementById('containerTag').offsetWidth
      let liWidth = document.querySelectorAll('#left1 li')[0].offsetWidth
      if (this.py < 0 && this.TabsList.length * liWidth + this.py < allWidth) {
        let s = allWidth - this.TabsList.length * liWidth
        this.py = s
        this.translateData = {transform: 'translate(' + s + 'px)'}
      }
    }
  },
  methods: {
    // 删除tab时滚动处理
    deleteTabToScroll () {
      let allWidth = document.getElementById('containerTag').offsetWidth
      let liWidth = document.querySelectorAll('#left1 li')[0].offsetWidth
      if (this.TabsList.length - this.getCurrentIndex + 1 < Math.ceil(allWidth / liWidth)) {
        let a
        if (this.TabsList.length < Math.ceil(allWidth / liWidth)) {
          a = 0
        } else {
          a = allWidth - this.TabsList.length * liWidth
        }
        this.py = a
        this.translateData = {
          transform: 'translate(' + a + 'px)'
        }
      }
    },
    // Tab偏移调整
    scrollTab () {
      let allWidth = document.getElementById('containerTag').offsetWidth
      let liWidth = document.querySelectorAll('#left1 li')[0].offsetWidth
      // 当前tab可视范围
      let showfw = [0 - this.py, allWidth - this.py]
      // 当前tab显示的索引范围
      let showIndex = [Math.ceil(showfw[0] / liWidth), Math.floor(showfw[1] / liWidth) - 1]
      // 如果在可是范围内的左边
      if (this.getCurrentIndex < showIndex[0]) {
        let ca = this.getCurrentIndex * liWidth * -1
        this.py = ca
        this.translateData = {transform: 'translate(' + ca + 'px)'}
      }
      // 如果在可是范围内的右边
      if (this.getCurrentIndex > showIndex[1]) {
        let ca = allWidth - (this.getCurrentIndex + 1) * liWidth
        this.py = ca
        this.translateData = {transform: 'translate(' + ca + 'px)'}
      }
    },
    // 向左显示更多tab
    moveToLeft () {
      let allWidth = document.getElementById('containerTag').offsetWidth
      let liWidth = document.querySelectorAll('#left1 li')[0].offsetWidth
      if (this.py === allWidth - this.TabsList.length * liWidth || this.TabsList.length < Math.ceil(allWidth / liWidth)) return false
      let s
      if ((allWidth - this.py) % liWidth === 0) {
        s = this.py - liWidth
      } else {
        s = this.py - (liWidth - (allWidth % liWidth))
      }
      this.py = s
      this.translateData = {
        transform: 'translate(' + s + 'px)'
      }
    },
    // 向右显示更多tab
    moveToRight () {
      let liWidth = document.querySelectorAll('#left1 li')[0].offsetWidth
      if (this.py === 0) return false
      let s
      if (this.py % liWidth === 0) {
        s = this.py + liWidth
      } else {
        s = this.py - (this.py % liWidth)
      }
      this.py = s
      this.translateData = {
        transform: 'translate(' + s + 'px)'
      }
    },
    // 刷新当前tab
    refresh () {
      this.hub.$emit('refresh', this.getCurrentIndex)
    },
    // 关闭其他
    closeSiblings () {
      let newTabs = [this.TabsList[0]]
      let link = this.TabsList[0].link
      let curIndex = this.getCurrentIndex
      if (curIndex > 0) {
        newTabs = newTabs.concat(this.TabsList[curIndex])
        link = this.TabsList[curIndex].link
      }
      this.close(newTabs, link)
    },
    // 关闭所有标签
    closeAll () {
      let newTabs = this.TabsList.slice(0, 1)
      let link = newTabs[0].link
      this.close(newTabs, link)
    },
    // 关闭操作
    close (newTabs, link) {
      // newTabs: 去除关闭的tab数组   link：关闭之后将要跳转的路由
      let self = this
      this.$store.commit('layout/updateState', {
        TabsList: newTabs
      })
      this.$nextTick(() => {
        if (link !== '') this.$router.push({ path: link })
        let timer = setTimeout(() => {
          self.deleteTabToScroll()
          clearTimeout(timer)
        }, 10)
      })
    },
    // 更多显隐
    moreHandle () {
      this.showMore = !this.showMore
    },
    closeHandle () {
      this.showClose = !this.showClose
    },
    // 切换
    switchTab (link) {
      this.$router.push({ path: link })
      this.$nextTick(() => {
        this.scrollTab()
      })
    },
    // 删除
    deleteTab (item, index) {
      let newTabs = [].concat(this.TabsList)
      let link = ''
      if (index === newTabs.length - 1) {
        // 删的是最后一个
        if (this.menuActiveArr[this.menuActiveArr.length - 1] === item.pkid) {
          // 当前为active状态
          newTabs.splice(index, 1)
          link = this.TabsList[index - 1].link
        } else {
          // 当前不是active状态
          newTabs.splice(newTabs.length - 1, 1)
        }
      } else {
        // 删的不是最后一个
        if (this.menuActiveArr[this.menuActiveArr.length - 1] === item.pkid) {
          // 当前为active状态
          newTabs.splice(index, 1)
          link = this.TabsList[index + 1].link
        } else {
          // 当前不是active状态
          newTabs.splice(index, 1)
        }
      }
      this.close(newTabs, link)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tabs {
    height: 35px;
    border-bottom: 2px solid #246FBA;
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    background: #fff;
    width: 100%;
    margin-bottom: 10px;
  }
  .left{
    min-width: 35px;
    max-height: 35px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid #E6E6E6;
  }
  .containerTag{
    position: relative;
    z-index: 1;
    overflow: hidden;
    white-space: nowrap;
    flex-grow: 1;
  }
  ul#left1{
    display: flex;
    align-items: center;
    transition: all ease-in-out 0.2s;
    li{
      cursor: pointer;
      max-width: 174px;
      min-width: 174px;
      height: 35px;
      line-height: 35px;
      color: #000000;
      position: relative;
      display: flex;
      align-items: center;
      border-right: 1px solid #E6E6E6;
      a{
        position: relative;
        text-decoration: none;
        padding-left: 8px;
        color: #000000;
        display: inline-block;
        text-align: center;
        overflow: hidden;
        width: 140px;
      }
      .closeTag{
        position: absolute;
        right: 8px;
        width: 13px;
        height: 13px;
      }
      &.active{
        background-color: #246FBA;
        a{
          color: #FFFFFF;
        }
      }
    }
  }
  .rightContainer{
    display: flex;
    align-items: center;
    .icon{
      border-left: 1px solid #E6E6E6;
      padding: 7px 9px 6px 9px;
      position:relative;
      .allTag{
        width: 5px;
        height: 20px;
      }
      .allTagText{
        border: 1px solid #E6E6E6;
        border-bottom: none;
        background-color: #F2F2F2;
        z-index: 1000;
        position: absolute;
        top: 35px;
        right: 0;
        .everyTagText{
          justify-content: flex-start;
          white-space: nowrap;
          padding: 0 10px;
          border-bottom: 1px solid #E6E6E6;
          cursor: default;
          height: 30px;
          display: flex;
          align-items: center;
        }
      }
    }
    .right,.fresh{
      width: 35px;
      height: 35px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #E6E6E6;
      position:relative;
    }
    .fresh.bg{
      background-color: #266FBA;
    }
    .closeTagText{
      width: 50px;
      height: 35px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      border-left: 1px solid #E6E6E6;
      position:relative;
      color: #86868B;
      .rt{
        position: absolute;
        right: 0px;
        bottom: 0px;
      }
      .closeType{
        width: 110px;
        border: 1px solid #E6E6E6;
        border-bottom: none;
        background-color: #F2F2F2;
        z-index: 1000;
        position: absolute;
        top: 34px;
        right: 0;
        .closeTypeUp, .closeTypeDown{
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-bottom: 1px solid #E6E6E6;
        }
      }
    }
  }
</style>
