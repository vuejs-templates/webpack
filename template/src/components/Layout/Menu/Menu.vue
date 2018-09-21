<template>
  <section class="menu">
    <ul class="firstMeu">
      <template v-for="(item, index) in menuData">
        <li @mouseenter="firstMeuHover(item)"
            :class="menuActiveArr.indexOf(item.pkid) > -1 ? 'active' : null"
            @click="firstMeuClick(item)"
            parentID="item.parentID"
            pkid="item.pkid"
            :key="index"
        >
          <img class="img" :src="item.icon" @error="defaultImg" />
          <span v-text="item.linkName"></span>
        </li>
      </template>
    </ul>
    <ul class="subMenu" @mouseleave="subMenuleave" :class="{opened: opened}">
      <template v-for="(subItem, index) in subMenuList">
        <li
          :class="menuActiveArr.indexOf(subItem.pkid) > -1 ? 'active' : null"
          :key="index"
          @click="subMenuClick(subItem)"
          pkid="subItem.pkid"
          parentID="subItem.parentID"
        >
          <span v-text="subItem.linkName"></span>
        </li>
      </template>
    </ul>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Menu',
  data () {
    return {
      subMenuList: [],
      currentFLag: false
    }
  },
  computed: {
    ...mapState('layout', [
      'menuData',
      'menuActiveArr',
      'opened',
      'TabsList',
      'allRouterLink'
    ])
  },
  beforeCreate () {
    // 获取左菜单按钮
    this.$store.commit('layout/updateState', {
      menuLoading: true
    })
    let params = {url: 'getMenuList', method: 'post', data: {module: 'Commerce', userNo: 'fanjuan@tuhu.cn'}, headers: {UserName: 'fanjuan@tuhu.cn'}}
    this.$store.dispatch('layout/getMenuList', params).then((res) => {
      if (res.length > 0) {
        this.$store.commit('layout/updateState', {
          menuLoading: false
        })
        this.routerUpdata()
      }
    })
  },
  created () {
    this.routerUpdata()
  },
  watch: {
    '$route': 'routerUpdata'
  },
  methods: {
    defaultImg (e) {
      e.target.src = '/static/img/defaultMenuIcon.png'
    },
    // 路由变化
    routerUpdata () {
      if (this.allRouterLink.length === 0) return false
      let menuActiveArr = []
      let TabsList = [].concat(this.TabsList)
      let path = this.$route.path
      let fil = []
      let meta = this.$route.meta
      if (meta.detail) {
        fil = [{icon: meta.icon, link: path, linkName: meta.title, parentID: meta.parentID, pkid: meta.pkid, keepAlive: meta.keepAlive}]
      } else {
        for (let item of this.allRouterLink) {
          if (item.link === path) {
            fil = [item]
            fil[0]['keepAlive'] = meta.keepAlive
            break
          }
        }
      }
      if (fil.length === 0) return false
      // 当前菜单和tab的active状态
      if (fil[0]['parentID'] === 0) {
        menuActiveArr[0] = fil[0]['pkid']
      } else {
        menuActiveArr[0] = fil[0]['parentID']
        menuActiveArr[1] = fil[0]['pkid']
      }
      // tab变化
      let Tab = this.TabsList.filter((list) => {
        return list.link === path
      })
      if (Tab.length === 0) {
        TabsList.push(fil[0])
      }
      this.$store.commit('layout/updateState', {
        menuActiveArr: menuActiveArr,
        TabsList
      })
    },
    subMenuClick (subItem) {
      let self = this
      this.$store.commit('layout/updateState', {
        opened: false
      })
      this.$router.push({ path: subItem.link ? '/' + subItem.link : '' })
      let timer = setTimeout(() => {
        self.hub.$emit('TabEvent')
        clearTimeout(timer)
      }, 10)
    },
    subMenuleave () {
      let self = this
      this.currentFLag = false
      const timer = setTimeout(function () {
        if (!self.currentFLag) {
          self.$store.commit('layout/updateState', {
            opened: false
          })
        }
        clearTimeout(timer)
      }, 100)
    },
    firstMeuHover (item) {
      if (this.menuActiveArr.indexOf(item.pkid) > -1 && item.nextLevelMenu.length > 0) {
        this.subMenuList = [].concat(item.nextLevelMenu)
        this.$store.commit('layout/updateState', {
          opened: true
        })
        this.currentFLag = true
      } else {
        this.currentFLag = false
      }
    },
    // 判断tab里面是否含有当前点击的菜单
    tabhasMenu (item) {
      let obj = {
        linkName: item.linkName,
        link: item.link ? '/' + item.link : '',
        pkid: item.pkid
      }
      let newArr = [].concat(this.TabsList)
      let num = this.TabsList.filter((list) => {
        return list.pkid === item.pkid
      }).length
      if (num === 0) {
        // 如果不存在
        newArr.push(obj)
      }
      return newArr
    },
    firstMeuClick (item) {
      if (!item.nextLevelMenu || item.nextLevelMenu.length === 0) {
        // 没有二级菜单
        this.$router.push({ path: item.link ? '/' + item.link : '' })
        this.$store.commit('layout/updateState', {
          opened: false,
          menuActiveArr: [item.pkid]
        })
        this.$nextTick(() => {
          this.hub.$emit('TabEvent')
        })
      } else {
        // 有二级菜单
        this.subMenuList = [].concat(item.nextLevelMenu)
        this.menuActiveArr[0] = item.pkid
        this.$store.commit('layout/updateState', {
          opened: true,
          menuActiveArr: this.menuActiveArr
        })
      }
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .menu{
    width:100px;
    position: fixed;
    left: 0;
    top: 50px;
    height: 100%;
    z-index: 2001;
  }
  ul.firstMeu{
    position: absolute;
    z-index: 2002;
    width: 100px;
    height: 100%;
    background: #2E4050;
    top: 0px;
    li{
      font-size: 14px;
      color: #fff;
      padding-left: 10px;
      height: 50px;
      display: flex;
      align-items: center;
      cursor: pointer;
      &.active{
        background: #1C84C6;
      }
      img{
        width: 16px;
        height: 16px;
        margin-right: 8px;
      }
    }
  }
  ul.subMenu{
    width: 200px;
    background: #fff;
    position: absolute;
    z-index: 2001;
    top: 0px;
    left: -100px;
    height: 100%;
    border-right:1px solid #F7F7F7;
    transition: all ease-in-out 0.2s;
    &.opened{
      left: 100px;
    }
    li{
      cursor: pointer;
      border-bottom:1px solid #F7F7F7;
      font-size: 14px;
      color: #333;
      display: flex;
      flex-direction: column;
      position: relative;
      &.active{
        background: #f5f5f5;
      }
      span{
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        padding-right: 35px;
        overflow: hidden;
      }
    }
  }

</style>
