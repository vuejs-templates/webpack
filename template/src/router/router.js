/**
 * Created by hq5544 on 16/3/26.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import RouterMap from './map'
import {
    changeTitle,
    toggleFooterShow
} from '../store/actions'
import store from '../store/store'

Vue.use(VueRouter)

const router = new VueRouter()

router.map(RouterMap.map)

router.alias(RouterMap.alias)

router.afterEach((transition) => {
    // 每次路由切换时候进行的操作
    changeTitle(store, transition.to.title)
    toggleFooterShow(store, transition.to.footer)
})

export default router
