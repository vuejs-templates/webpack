<!--
  电子签名
-->
<template>
  <div class="page-signature-app">
    <div v-if="isMultipleRecordApply">
      <za-title>双录保单</za-title>
      <div class="group-switch">
        <label class="color-gray">是否已双录</label>
        <hq-switch v-model="hasDoubleRecords" @update="updateDoubleRecords"/>
      </div>
    </div>
    <div class="panel-terms">
      <p>
        <hq-checkbox v-model="checkTerms"/>
        <span>本人已阅读并同意</span>
        <a @click="markRouteMeta">《转账授权声明》</a>
        <span>和</span>
        <template v-for="(item, index) in caInfo.clauseList">
          <span v-if="index>0">,</span>
          <a @click=viewPDF(item.url)  :key="index">《{{item.name}}》</a>
        </template>
        <span>的内容。</span>
      </p>
    </div>
    <tax-dweller :taxInfo="taxInfo" @taxResident="updateTaxResident" :applyId="applyId" @openPanel="goFillTax"/>
    <ul class="list-upload">
      <li>
        <div class="item-block">
          <span>投保日期</span>
          <span class="text">{{caInfo.applyDate}}</span>
        </div>
      </li>
      <li v-for="(item,index) in caInfo.caInfoList" :key="index">
        <hq-gather v-model="caInfo.caInfoList[index]" @update="updateCaInfo"/>
      </li>
    </ul>

    <za-title>证件影像上传</za-title>
    <ul class="list-upload">
      <li v-for="(item,index) in certImageInfoList" :key="index">
        <hq-gather-multiple :richTitle="true" v-model="certImageInfoList[index]" @update="updateUploadInfo"/>
      </li>
      <li>
        <p class="tips">温馨提示：证件影像必须上传，注意身份证必须上传正反面。</p>
      </li>
    </ul>

    <za-title>其他资料上传</za-title>
    <ul class="list-upload">
      <li v-for="(item,index) in otherImageInfoList" :key="index">
        <hq-gather-multiple v-model="otherImageInfoList[index]" @update="updateUploadInfo" />
      </li>
      <li>
        <p class="tips">温馨提示：根据客户投保情况选择性上传资料。</p>
      </li>
    </ul>

    <section-payment v-model="payInfo" @validation="onValidation"/> <!--支付信息-->

    <panel-countdown
      v-model="countModel" @send="sendMessage" :mobile="mobile"
      :disabled="!(multipleRecordVerify && checkTerms && checkTaxInfo && uploaded && payInfoValid)"/>

    <footer class="bar-footer">
      <btn class="btn-primary btn-reverse" @click.native="cachePayInfo" :disabled="submitDisabled">暂存</btn>
      <btn class="btn-primary" @click.native="confirmSign" :disabled="submitDisabled">确认</btn>
    </footer>

  </div>
</template>

<script>
	import { formUnit, zaInput, zaSelect, zaTitle } from "vformer";
  import {isFunction, isObject, isString} from '@/widget/util'
  import equals from '@/widget/util/equals'
  import clone from '@/widget/util/clone'
  import { fetch,toast} from '@/widget/util/currying'
  import hqDict from '../base/hq-dict.vue'
  import hqSwitch from '../base/hq-switch.vue'
  import hqCheckbox from '../base/hq-checkbox.vue'
  import taxDweller from '@/application/main/sign/esignature/tax-dweller.vue'
  import panelCountdown from '../base/panel-countdown.vue'
  import hqGather from '../base/hq-gather.vue'
  import hqGatherMultiple from '../base/hq-gather-multiple.vue'
  import btn from '../base/btn.vue'
  import sectionPayment from './payment.vue'
  import {CA_RESET, CACHE_SIGN_E_UPLOAD, CACHE_SIGN_E_CA, SIGN_E_LOAD, SIGN_E_SAVE, SIGN_E_SAVE_PAY, DE_SIGN_AIR, INFO_SHARE_SIGNATURE, APPLYSUBMIT, SMSVERIFY, DELETEAPPLY, SMS_SEND, APP_CHANGE_SIGN} from '@/api'
  export default {
    name: 'eSign',
    components: {
      sectionPayment,
      hqCheckbox,
      taxDweller, // 税收居民
      hqDict,
      hqSwitch,
      hqGather,
      hqGatherMultiple,
      btn,
      panelCountdown,
      zaTitle
    },
    data () {
      return {
        applyId: '',
        submitDisabled: false,
        sendCount: 0, // 验证码发送次数
        caInfo: {},
        uploadInfo: {},
        payInfo: {},
        taxInfo: {},
        validation: [],
        checkTerms: false,
        countModel: {on: false, value: ''},
        canAir: false // 是否可以进行空中签名
      }
    },
    computed: {
      // 纳税信息是否完整
      checkTaxInfo: {
        get () {
          const {taxInfo} = this
          if (taxInfo) {
            const a = taxInfo.isChineseTaxResident === 'Y'
            const b = taxInfo.isChineseTaxResident === 'N' && Array.isArray(taxInfo.taxCountry) && taxInfo.taxCountry.length > 0
            return a || b
          }
          return false
        }
      },
      // 是否是中国税居民 (Y, N)
      isChineseTaxResident: {
        get () {
          return this.taxInfo.isChineseTaxResident
        },
        set (isChineseTaxResident) {
          this.taxInfo.isChineseTaxResident = isChineseTaxResident
        }
      },
      // 是否是双录保单(true, false)
      isMultipleRecordApply: {
        get () {
          return this.caInfo.isDoubleRecords === 'Y'
        }
      },
      // 双录保单是否已双录(Y, N). Y表示已双录, N表示还没有双录
      hasDoubleRecords: {
        get () {
          return this.caInfo.hasDoubleRecords
        },
        set (hasDoubleRecords) {
          this.caInfo.hasDoubleRecords = hasDoubleRecords
        }
      },
      certImageInfoList: {
        get () {
          return this.uploadInfo.certImageInfoList || []
        },
        set (list) {
          this.uploadInfo.certImageInfoList = list
        }
      },
      otherImageInfoList: {
        get () {
          return this.uploadInfo.otherImageInfoList || []
        },
        set (list) {
          this.uploadInfo.otherImageInfoList = list
        }
      },
      // 手机验证码
      verCode: {
        get () {
          return this.countModel.value
        },
        set (value) {
          this.model.value = value
        }
      },
      mobile: {
        get () {
          return this.payInfo.mobile
        },
        set (mobile) {
          this.caInfo.mobile = mobile
          this.payInfo.mobile = mobile
        }
      },
      // 资料是否已上传完毕，用作获取验证码的守卫条件
      uploaded: {
        get () {
          return this.uploadVerify({tip: false})
        }
      },
      // 支付信息是否是通过校验的
      payInfoValid: {
        get () {
          return this.validation.length === 0
        }
      },
      // 签名信息，caInfo是完整的CA一个数据模型，而signInfo只是其中的签名数据列表
      signInfo: {
        get () {
          return this.caInfo.caInfoList || []
        },
        set (caInfoList) {
          this.caInfo.caInfoList = caInfoList
        }
      },
      // 代理人签名信息
      agentSignInfo: {
        get () {
          return this.signInfo.find(it => it.code === 'code_agent') || {}
        },
        set (agentSignInfo) {
          const index = this.signInfo.findIndex(it => it.code === 'code_agent')
          this.signInfo[index] = agentSignInfo
        }
      },
      // 代理人签名图片
      agentSignImgPath: {
        get () {
          return this.agentSignInfo.signImgPath
        },
        set (signImgPath) {
          this.agentSignInfo.signImgPath = signImgPath
        }
      }
    },
    created () {
      const applyId = this.$route.query.applyId
      this.applyId = applyId
      if (!this.$route.meta.unClearInfo) {
        this.resetCaInfo().then(() => this.loadData(), toast)
      } else {
        this.loadData()
      }
      delete this.$route.meta.unClearInfo
      const {canAir: enumCanAir} = this.$route.query
      const canAir = enumCanAir === '1'
      this.canAir = canAir
      this.setMenuBar({canAir})
    },
    beforeDestroy () {
      window.removeEventListener('visibilitychange', this.backProgressAfterShare)
    },
    methods: {
      fetch: fetch,
      toast: toast,
      // 标记路由
      markRouteMeta () {
        this.markCaInfoUnClear()
        this.savePayInfo({saveType: false}).then(() => {
          this.$router.push({path: '/web/tips'})
        }, toast).catch(console.error)
      },
      // 标记CA信息在返回的时候不清空
      markCaInfoUnClear () {
        this.$route.meta.unClearInfo = true
        this.savePayInfo({saveType: false}).then(null, toast).catch(console.error)
      },
      goFillTax () {
        this.markCaInfoUnClear()
      },
      // 加载页面数据
      loadData () {
        const {applyId} = this.$route.query
        this.fetch(SIGN_E_LOAD, {applyId}).then(value => {
          const {caModel = {}, payDTO = {}, uploadImageModel = {}, taxInfo = {}} = value || {}
          this.caInfo = caModel
          this.payInfo = payDTO
          this.uploadInfo = uploadImageModel
          this.taxInfo = taxInfo
          // 更新路由配置,这里只是路由配置对象meta （路由对象是、也应是一个只读对象）
          this.updateRouteMeta(caModel)
        }, toast).catch(console.error)
      },
      // 设置菜单栏（标题右边的按钮）
      setMenuBar ({canAir}) {
        if (!canAir) {
          window.toggleMenu(2, false)
          return
        }
        window.goAirSign = () => {
          const activeInput = document.querySelector('input:focus')
          if (activeInput && activeInput.blur) {
            activeInput.blur()
          }
          this.$forceUpdate()
          this.$nextTick(() => {
            this.goAirSign()
          })
        }
        window.rightMenu({
          title: '空中签名',
          javascript: 'goAirSign'
        })
        window.toggleMenu(2, true)
      },
      // 代理人签名的promise函数，如果未签则rejected
      agentSignGuard () {
        return new Promise((resolve, reject) => {
          if (this.agentSignImgPath !== null) {
            resolve()
          } else {
            this.confirm({
              content: '代理人签名后方可空中签名',
              onCancel: reject,
              onConfirm: () => {
                this.gather(this.agentSignInfo).then(resolve, reject)
              }
            })
          }
        })
      },
      // 去空中签名
      goAirSign () {
        this.agentSignGuard()
          .then(() => this.cacheCaInfo(), null)
          .then(() => this.savePayInfo({saveType: false}), toast)
          .then(() => this.loadAirSignInfo(), toast)
          .then(value => this.openSharePanel(value), toast)
      },
      // 获取空中签名信息
      loadAirSignInfo () {
        const {applyId} = this
        return this.fetch(INFO_SHARE_SIGNATURE, {applyId})
      },
      // 打开分享面板（由native提供）
      openSharePanel (shareInfo) {
        const {icon, title, remark, url} = shareInfo
        // 只要打开面板，就会再临时绑定(每点击分享一次，就会执行一次)
        window.addEventListener('visibilitychange', this.backProgressAfterShare)
        window.showShare('2', url, icon, title, remark).then(json => {
          let info = JSON.parse(json)
          if (info.resultCode == '0') {
            this.$router.push({name: 'progress'})
          } else {
            this.unlock() //  收回空中签名，取消保单锁定
          }
          // 点击分享，然后取消，这时该事件的监听应该移除
          window.removeEventListener('visibilitychange', this.backProgressAfterShare)
        })
        // 只要打开面板，就会再临时绑定(每点击分享一次，就会执行一次)
        window.addEventListener('visibilitychange', this.backProgressAfterShare)
      },
      // 分享成功后返回投保进度页。
      backProgressAfterShare () {
        if (!document.hidden && this.$router.currentRoute.path === '/web/esign') {
          this.$router.push({name: 'progress'})
          window.removeEventListener('visibilitychange', this.backProgressAfterShare)
        }
      },
      // 更新税收居民信息
      updateTaxResident (isChineseTaxResident) {
        if (isChineseTaxResident === '') return
        const param = {
          applyId: this.applyId,
          changeType: '2',
          taxInfo: {
            isChineseTaxResident
          }
        }
        this.fetch(APP_CHANGE_SIGN, param).then(null, toast).catch(console.error)
      },
      //  收回空中签名
      unlock () {
        const {applyId} = this
        return this.fetch(DE_SIGN_AIR, {applyId}).then(null, this.toast)
      },
      // 在服务端缓存证件影音和其它资料
      cacheUploadInfo () {
        const uploadInfo = clone(this.uploadInfo)
        return this.fetch(CACHE_SIGN_E_UPLOAD, uploadInfo)
      },
      // 缓存CA信息
      cacheCaInfo () {
        const caInfo = clone(this.caInfo)
        return this.fetch(CACHE_SIGN_E_CA, caInfo)
      },
      updateCaInfo () {
        this.cacheCaInfo().then(null, toast).catch(console.error)
      },
      updateUploadInfo () {
        this.cacheUploadInfo().then(null, toast).catch(console.error)
      },
      //  在当前路由项的配置中添加一个守卫函数，当接下来的流程分享出去让客户操作时，代理人不能继续往下操作
      updateRouteMeta ({isAirSignSuccess}) {
        if (this.$route && this.$route.meta) {
          this.$route.meta.prevent = () => this.prevent(isAirSignSuccess)
        }
        return isAirSignSuccess
      },
      /**
       * 路由的守卫函数，阻止路由跳转到不期望的地方
       * 该函数作为当前视图的路由的meta对象的一个属性存在
       * @param isAirSignSuccess {Boolean} 是否正在空中签名
       * @returns {Boolean} 是否真要拦截路由的跳转，真正的拦截逻辑在App.vue里的路由监听里
       */
      prevent (isAirSignSuccess) {
        isAirSignSuccess && this.$vux.alert.show({
          title: '提示',
          content: '客户已签名确认，不能返回修改'
        })
        return isAirSignSuccess
      },
      // 删除保单
      deleteApply () {
        const {applyId} = this
        return this.fetch(DELETEAPPLY, {applyId})
      },
      // 验证手机验证码
      validateCode () {
        const templeteNo = 'HQAPP_001'
        const {verCode: content, mobile: phoneNo} = this
        return this.axios.post(SMSVERIFY, {phoneNo, content, templeteNo}).then(({data}) => {
          const {success, value, errorMsg, errorCode} = data
          if (success) {
            return Promise.resolve(value)
          }
          let msg = errorMsg || value.errMsg
          if (errorCode == 4) {
            this.sendCount++
          }
          if (this.sendCount >= 3) {
            msg = '验证码连续输错3次，本次投保作废'
            this.deleteApply().then(() => {
              this.$router.push({path: '/web/progress'})
            })
          }
          return Promise.reject(msg)
        })
      },
      validatePayInfo () {
        const {validation} = this
        return validation.length ? Promise.reject(validation[0].msg) : Promise.resolve()
      },
      gather (model) {
        const {certNo, keyWordRule, title, cType} = model
        const serialized = JSON.stringify({...keyWordRule, certNo})
        return window.caSign(title, cType, serialized).then(result => {
          const res = JSON.parse(result)
          switch (cType) {
          case 1:
            model.signImgPath = res.gestureImage // 签名 url
            return Promise.resolve(model)
          case 2:
            model.photoPath = res.captureImage // 拍照url
            return Promise.resolve(model)
          case 3:
            if (res.IDRecognizeResult === '0') { // failed
              this.faceFlag = "1"
            }
            model.photoPath = res.gestureImage // 人脸识别url
            return Promise.resolve(model)
          }
        })
      },
      // 通过横琴接口发送手机验证码
      sendHQ () {
        const templeteNo = 'HQAPP_001'
        const {mobile: phoneNo} = this
        return this.axios.post(SMS_SEND, {phoneNo, templeteNo})
          .then(({data: {success, errorMsg, value = {}, errorCode}}) => {
            if (success && errorCode === '0') {
              this.countModel.on = true
            } else {
              this.toast(errorMsg || value.errMsg)
            }
          })
      },
      // 校验支付信息，通过时向服务器端发送请求，让它向用户发验证短信
      sendMessage () {
        if (!this.validate(['multipleRecordVerify', 'checkTerms', 'checkTaxInfo', 'uploaded'])) {
          return
        }
        return this.validatePayInfo()
          .then(() => this.savePayInfo())
          .then(() => this.sendHQ())
          .then(value => Promise.resolve(value), toast)
      },
      onValidation (arr) {
        this.$set(this, 'validation', arr)
      },
      // 确认电子签名（开始提交流程）
      confirmSign () {
        if (!this.validate()) return
        const onSuccess = status => {
          this.submitDisabled = false
        }
        const onFailure = status => {
          this.submitDisabled = false
          this.toast(status)
        }
        const onError = error => {
          this.submitDisabled = false
          this.toast('提交超时')
          console.error(error)
        }
        this.submitDisabled = true

        this.validatePayInfo()
          .then(() => this.savePayInfo())
          .then(() => this.validateCode())
          .then(() => this.saveApplyInfo())
          .then(() => this.submit())
          .then(onSuccess, onFailure)
          .catch(onError)
      },
      // 保存保单信息（所有信息）
      saveApplyInfo () {
        const applyInfo = {
          applyId: this.applyId,
          payDTO: clone(this.payInfo),
          uploadImageModel: clone(this.uploadInfo),
          caModel: clone(this.caInfo),
          taxInfo: clone(this.taxInfo)
        }
        return this.fetch(SIGN_E_SAVE, applyInfo)
      },
      // 重置CA信息(把它们清空)
      resetCaInfo () {
        const {applyId} = this
        return Promise.resolve()
//      return this.fetch(CA_RESET, {applyId})
      },
      cachePayInfo () {
        this.submitDisabled = true
        this.savePayInfo({saveType: false}).then(value => {
          this.submitDisabled = false
          this.toast('暂存成功')
        }, errorMsg => {
          this.submitDisabled = false
          this.toast(errorMsg)
        }).catch(error => {
          this.submitDisabled = false
          console.error(error)
        })
      },
      // 保存支付信息
      savePayInfo (buffer) {
        let payInfo = clone(this.payInfo)
        if (buffer) {
          for (let key in buffer) {
            payInfo[key] = buffer[key]
          }
        }
        return this.fetch(SIGN_E_SAVE_PAY, payInfo)
      },
      submit () {
        const {applyId} = this
        toast({text: '此过程可能持续时间较长，请耐心等待', time: 3000})
        return this.axios.post(APPLYSUBMIT, {applyId}, {timeout: 180000}).then(({data: {success, value, errorMsg}}) => {
          if (success) {
            const {status} = value
            const {isNeedEmail} = this.caInfo
            const params = {...value, isNeedEmail}
            // 状态为2001（人工核保成功）时页面跳转
            if (status === 2001) {
              this.$router.push({ name: 'resultsucc', params })
              // 状态为2003（人工核保失败）时页面跳转
            } else if (status === 2003) {
              this.$router.push({ name: 'resultmanual', params })
              // 状态为10001（支付失败）时页面跳转
            } else if (status === 10001) {
              this.$router.push({ name: 'resultfail', params })
              // 状态为2004,10002时页面跳转中间状态页
            } else if (status === 2004 || status === 10002 || status === 10003 || status === 0) {
              this.$router.push({ name: 'resultwait', params })
              // 程序出错跳转页面
            } else if (status === 5001) {
              this.$router.push({ name: 'resultWaitMultiple', params })
            } else if (status === -1) {
              this.$router.push({ name: 'resultfailself', params })
            } else if (status === -100) {
              this.toast('投保失败')
            } else if (status === -999) {
              // 投保年龄发生变化
              this.alert({
                content: value.msg,
                onHide: () => {
                  this.$router.push({ path: '/web/progress' })
                }
              })
            }
          }
          return success ? Promise.resolve(value) : Promise.reject(errorMsg)
        })
      },
      getCustomerTypeName (customerType) {
        return ({
          1: '投保人',
          2: '被保人',
          3: '受益人'
        })[customerType]
      },
      // 上传资料校验
      uploadVerify ({tip}) {
        const {caInfoList = []} = this.caInfo
        const {certImageInfoList: certs = [], otherImageInfoList: others = []} = this
        // 必填校验
        const required = it => {
          let {sign, photo, signImgPath, photoPath, desc} = it
          let valid = sign ? signImgPath : (photo ? photoPath : false)
          if (!valid && tip) {
            this.toast(`请完善${desc}`)
          }
          return valid
        }
        // 上传数量校验
        const numValidate = it => {
          let {imagePathList, minNum, name, certType, customerName, customerType} = it
          let valid = true
          if (minNum != null && minNum > 0) {
            if (!(Array.isArray(imagePathList) && imagePathList.length >= minNum)) {
              valid = false
              if (tip) {
                name = name || this.getCustomerTypeName(customerType) + `(${customerName})的${certType}`
                this.toast(`${name}至少需要上传${minNum}张`)
              }
            }
          }
          return valid
        }
        return caInfoList.every(required) && certs.every(numValidate) && others.every(numValidate)
      },
      countVerify () {
        if (this.sendCount >= 3) {
          this.toast('验证码连续输错3次，本次投保作废')
          return false
        }
        return true
      },
      // 验证码校验, true表示通过
      codeVerify () {
        if (!/^\d{6}$/.test(this.verCode)) {
          this.toast(`验证码只能是6位数字`)
          return false
        }
        return true
      },
      // 双录校验
      multipleRecordVerify ({tip}) {
        if (this.isMultipleRecordApply) {
          if (this.hasDoubleRecords === null) {
            if (tip) this.toast('请确认是否已双录')
            return false
          }
          if (this.hasDoubleRecords === 'N') {
            if (tip) this.toast('本次投保计划符合保监双录要求，必须完成双录才能进行投保！')
            return false
          }
        }
        return true
      },
      /**
       * 校验当前页面
       * 内部持有一个map，使用它来定义如何校验当前页面。 校验规则有顺序，校验不通过则不继续往下校验
       * map的key定义了要校验的项
       * map的value定义了校验的方式：
       * 1. value是函数，这个函数需要在当前vm中有定义，函数的返回值是true表示通过校验，false则表示该项没有通过校验
       * 2. value是字符串，需要当前value对应的key在vm的数据中有定义，使用该数据的值是否为真来表示校验结果。value在这里表示错误消息
       * @param [list] {Array} - 校验项的数组表示 如果为空默认校验全部
       */
      validate (list) {
        let map = {
          multipleRecordVerify: this.multipleRecordVerify,
          checkTerms: '请先阅读条款',
          checkTaxInfo: '请填写税收居民信息',
          uploaded: this.uploadVerify,
          verCode: '请验证手机号码',
          countVerify: this.countVerify,
          codeVerify: this.codeVerify
        }
        let verify = key => {
          if (isFunction(map[key])) {
            return map[key]({tip: true})
          } else {
            const pass = this[key]
            if (!pass) {
              this.toast(map[key])
            }
            return pass
          }
        }
        if (!list) {
          list = Object.keys(map)
        }
        return list.every(verify)
      },
      viewPDF (url) {
        window.articleDetail(url)
      },
      alert (param) {
        this.$vux.alert.show({title: '提示', ...param})
      },
      confirm (param) {
        this.$vux.confirm.show({title: '提示', ...param})
      },
      // 更新双录
      updateDoubleRecords (hasDoubleRecords) {
        const param = {
          applyId: this.applyId,
          changeType: '1',
          doubleInfo: {
            hasDoubleRecords
          }
        }
        this.fetch(APP_CHANGE_SIGN, param).then(null, toast).catch(console.error)
      },
      tips (msg) {
        this.$vux.alert.show({
          title: '说明',
          content: msg
        })
      }
    },
    watch: {
      payInfo (to, from) {
        if (Object.keys(from).length === 0) return
        if (!equals(to, from)) {
          this.countModel.on = false
        }
      }
    }
  }
</script>

<style lang=less>
	@import url("~@/assets/styles/page.less");
  .page-signature-app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    background-color: #f7f7f7;
    .item-block{
      line-height: 45px;
      display: flex;
      .text {
        font-size: 15px;
        color: #999;
        padding-right: 15px;
        text-align: right;
        flex: 1;
      }
    }
    .group-switch {
      display: flex;
      background-color: white;
      justify-content: space-between;
      align-items: center;
      line-height: 25px;
      padding: 8px 15px;
    }
    .color-gray {
      color: #999;
    }
    .list-upload {
      background-color: #fff;
      list-style: none;
      > li + li {
        border:1px solid #efefef;
      }
      li > .tips{
        padding: 15px 0px;
        font-size: 11px;
        color: #00b0ff;
      }
    }
    .panel-terms{
      padding: 15px;
      background-color: #f7f7f7;
      > p {
        color: #999;
        line-height: 1.75;
        padding-left: 24px;
        text-indent: -24px;
        margin: 5px 0;
        font-size: 0;
      }
      span, a{
        font-size: 15px;
      }
      a{
        color: #00b0ff;
      }
    }
    footer {
      display: flex;
      padding: 7.5px;
      .btn-primary {
        flex: 1;
        margin: 0 7.5px;
      }
    }
  }

</style>
