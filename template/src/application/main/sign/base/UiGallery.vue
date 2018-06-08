<!--
              author: xx
            descript: ui base gallery
    Factory: 组件实例化工厂  自动实例化组件 配置信息 在 componentConfig
-->
<template>
<div class="page-uiGallery">
  <h2>this baseUI-GALLERY</h2>
  <CFactory :items = 'componentConfig'></CFactory>
</div>
</template>

<script>
import Vue from 'vue'
import MaskLayer from './mask'
import CFactory from '../Factory'
// import './button/bluebutton'
// import './scroll'
// import './article'
export default {
  name: 'uiGallery',
  data () {
    return {
      componentConfig: [
        {
          name: 'MaskLayer',
          title: 'mask',
          txt: 'mask show',
          props: {
            bgcolor: 'rgba(110,110,132,.5)',
            max: true
          },
          style: {
            display: 'none'
          },
          on: {
            Click: () => {
              this.toggleMask()
            },
            OnShow: () => {
              console.log('OnShowEvent')
            },
            OnHides: () => {
              console.log('OnHidesEvent')
            }
          },
          buttonOn: {
            click: () => {
              this.toggleMask()
            }
          }
        },
        {
          name: 'c_scroll',
          title: 'scroll',
          txt: '',
          show: false,
          class: 'scrolldemo',
          domProps: `data-dd`,
          on: {
            Scroll: () => {
              console.log('Scroll')
            }
          },
          buttonOn: {
            click: () => {
              this.toggleScroll()
            }
          },
          createSon (h) {
            let son = []
            for (let i = 0; i < 20; i++) {
              son.push(h('p', {class: 'scroll_son_block'}, i))
            }
            return son
          }
        },
        {
          name: 'c_article',
          title: 'article',
          txt: '',
          show: false,
          props: {
            id: '1', imgpath: '//static.zhongan.com/upload/mobile/material/1490759500160.png', title: 'article demo', word: 'article demo'
          }
        },
        {
          name: 'c_button',
          title: 'button',
          txt: '',
          show: false,
          props: {
            val: 'this is Button',
            linkUrl: '/'
          },
          on: {
            Click: () => {
//              alert('blue button clicked')
            }
          }
        },
        {
          name: 'c_btngroup',
          title: 'btngroup',
          txt: '',
          show: false,
          on: {
            Check: (idx) => {
              console.log('Checked ' + idx)
            }
          },
          props: {
            btlist: [
              {
                id: '0',
                val: '低'
              },
              {
                id: '1',
                val: '中'
              },
              {
                id: '2',
                val: '高'
              }
            ]
          }
        },
        {
          name: 'c_gender',
          title: 'c_gender',
          props: {
          },
          on: {
            Click: (n) => {
//              alert(n)
            }
          }
        }
      ]
    }
  },
  methods: {
    toggleMask () {
      console.log('fffffff')
      this.componentConfig[0].style.display = this.componentConfig[0].style.display ? '' : 'none'
      this.componentConfig[0].txt = !this.componentConfig[0].props.show ? 'mask show' : 'mask hide'
    },
    toggleScroll () {
      this.componentConfig[1].show = !this.componentConfig[1].show
      this.componentConfig[1].txt = !this.componentConfig[1].show ? 'scroll show' : 'scroll hide'
    }
  },
  components: {
    MaskLayer, CFactory
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' >
.page-uiGallery {
    padding: 10px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-y: auto;
    h2 {
        font-weight: normal;
        margin: 20px 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: block;
        margin:20px 10px;
    }
    .ui_gallery_button{
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
    }
    .scrolldemo{
      background: #ccc;
      height: 300px;
      flex-wrap: wrap;
      flex-direction: row;
      .scroll_son_block{
        display: block;
        width:100%;
        padding:20px 0;
      }
    }
}
</style>
