<template>
  <div class="hello">
    Hello World
  </div>
</template>

<script>
export default {

}
</script>
{{#if_eq style "css"}}
<style scoped>

</style>
{{/if_eq}}
{{#if_eq style "less"}}
<style lang="less" scoped>

</style>
{{/if_eq}}
{{#if_eq style "sass"}}
<style lang="sass" scoped>

</style>
{{/if_eq}}
{{#if_eq style "stylus"}}
<style lang="stylus" scoped>

</style>
{{/if_eq}}
