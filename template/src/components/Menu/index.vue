<template>
  <div class="menu-wrap">
    <div class="menu-logo-name">
      <i class="iconfont icon-shop"></i>
      <div class="logo-name">SEAFOOD-MARKET</div>
    </div>
    <div class="menu-content">
      <div class="menu-item" v-for="(item, index) in datas" :key="index">
        <div class="title" v-text="item.title"></div>
        <div class="menu-sub-item" :class="subitem.actived ? 'actived' : ''" v-for="(subitem, subindex) in item.datas" :key="subindex" @click="handleClick(index, subindex)">
          <i class="iconfont" :class="subitem.icon"></i>
          <div class="name" v-text="subitem.subtitle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style src="./index.less" lang="less"></style>
