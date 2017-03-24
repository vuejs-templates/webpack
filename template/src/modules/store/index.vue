<template>
  <article>
    <div class="icon-dm"><img :src="store.logo"></div>
    <swiper :list="store.images" v-model="swiperStart" :aspect-ratio="247/375" auto></swiper>
    <div class="store-info">
      <cell class="store-name">
        <div slot="after-title">
          <p class="info">
            {{store.address}}
          </p>
          <p class="info">
            {{store.contact_number}}
          </p>
        </div>
        <div class="store-find" slot="child">
          <a :href="'tel:'+store.contact_number" class="phone-a"></a>
          <em></em>
          <a id="map" href="javascript:void(0);" title="" class="address-a"></a>
        </div>
      </cell>
      <tabbar class="tabbar">
        <tabbar-item link="/appointment/index">
          <span slot="icon">
            <span class="icon">
              <i class="icon-yxyy"></i>
            </span>
          </span>
          <span slot="label" class="label">养修预约</span>
        </tabbar-item>
        <tabbar-item link="/appointment/presotre">
          <span slot="icon">
            <span class="icon">
              <i class="icon-cxxj"></i>
            </span>
          </span>
          <span slot="label" class="label">车险特惠</span>
        </tabbar-item>
        <tabbar-item link="/personal/index">
          <span slot="icon">
            <span class="icon">
              <i class="icon-grzx"></i>
            </span>
          </span>
          <span slot="label" class="label">个人中心</span>
        </tabbar-item>
      </tabbar>
    </div>
    <div class="featured-activities">
      <h4>
        <img src="../../assets/styles/images/featured-activities.png">
        <span>精选活动</span>
      </h4>
      <div class="featured-activities-list">
        <ul>
          <li v-for="item in store.marketing_banners">
            <a :href="item.target_url"><img :src="item.image_url"></a>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
<script>
import cache from '../../common/cache'
import { Swiper, Cell, InlineDesc, Tabbar, TabbarItem } from '@cvux'

export default {
  components: {
    Swiper,
    Cell,
    Tabbar,
    TabbarItem,
    InlineDesc
  },
  data() {
    return {
      store: {
        images: []
      },
      storeId: 0,
      swiperStart: 0
    }
  },
  created() {
    let storeId = this.storeId = this.$route.params.store_id
    if (!storeId) {
      storeId = cache.getLocalStorageData(cache.keyMap.CACHE_STORE_ID)
    }
    if (storeId) {
      this.$rest.store.getStoreInfo(null, storeId).then((res) => {
        if (res.code === 0) {
          let data = res.data
          data.images.forEach((item) => {
            item.img = item.url
            item.url = 'javascript:void(0);'
          })
          this.store = data
        }
      })
    }
  }
}
</script>
<style lang="less">
  body {
    background-color: #eee;
  }
</style>
