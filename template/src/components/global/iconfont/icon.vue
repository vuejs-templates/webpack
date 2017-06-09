/* 已经写入全局 */

<template lang="html">
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="('#'+xlink)"></use>
  </svg>
</template>

<script>
import iconfont from '@/styles/iconfont.js'
export default {
  name: 'icon',
  props: {
    xlink: String,
    required: true
  }
}
</script>

<style lang="scss">
.icon {
   width: 1em;
   height: 1em;
   vertical-align: -.15em;
   fill: currentColor;
   overflow: hidden;
}
</style>
