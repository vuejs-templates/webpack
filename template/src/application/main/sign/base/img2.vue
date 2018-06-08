<!--
  一个可使用占位图的`img`标签

  图片开始加载和加载成功中有一小段间隔（具体间隔视图片大小和网络环境而定），这时提供一个占位图是比较友好的。

  占位图通过参数`placeholder`指定

  `placeholder`应是一个已有的css类名，它定义了一个背景图样式，并且有一个固定的长宽
  `placeholder`无默认值

  监听当前组件的原生事件（即`load`, `error`)时，需要添加 `native` 修饰符

  其它同`img`标签
-->
<template>
  <img :src=uri :class=clz @load=onLoad @error=reset>
</template>
<script>
  import {isURL} from '@/widget/util/URL.js'
  export default {
    name: 'img',
    props: {
      src: String,
      placeholder: String
    },
    data () {
      return {
        backup: '',
        loaded: false,
        uri: this.src
      }
    },
    computed: {
      clz () {
        return {[this.placeholder]: !this.loaded}
      }
    },
    watch: {
      src () {
        this.uri = this.src
      }
    },
    methods: {
      //  从一个元素中摘取它在CSS渲染树中对应的背景图
      getBgImage (element) {
        return document.defaultView.getComputedStyle(element, null).backgroundImage
          .replace(/^url\(('|")?/, '')
          .replace(/('|")?\)$/, '')
      },
      onLoad (event) {
        if (isURL(this.src) && !this.loaded) {
          this.loaded = true
        }
      },
      reset (event) {
        if (!this.backup) {
          this.backup = this.getBgImage(event.target)
        }
        if (this.uri !== this.backup) {
          this.uri = this.backup
        }
      }
    }
  }
</script>
