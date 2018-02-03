<template>
  <div class="collapse" @click="toggleDroplist">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <transition name="content">
      <div class="content" :class="transition" v-show="toggle">
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    name: 'Collapse',
    props: {
      active: Boolean,
      transition: {
        type: String,
        default: 'fade'
      }
    },
    data () {
      return {
        toggle: this.active
      }
    },
    watch: {
      'active' (newVal, oldVal){
        this.toggle = newVal
      }
    },
    methods: {
      toggleDroplist(){
//        this.$emit('toggle')
        this.$emit('update:active', !this.active)
      }
    }
  }
</script>
<style lang="scss">
  .collapse {
    .content {
      &.fade {
        transition: opacity .3s ease;
        will-change: auto;
      }
      &.size {
        transition: all .3s ease;
        min-height: 500px;
        will-change: auto;
      }
    }
    .content-enter,.content-leave-active {
      &.fade {
        will-change: opacity;
        opacity: 0
      }
      &.size {
        will-change: all;
        min-height: 0;
      }
    }
  }

</style>
