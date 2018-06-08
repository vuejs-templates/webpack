<!--
  空中签名（分享页面）
  cType: 1 签名； 2： 拍照； 3：拍照+人脸识别
-->
<template>
  <div>
    <tip-signature v-if="status !== null" :info="result" :status="status" @recommit="recommit"/>
    <tax-dweller-panel v-if="isEditTax" :inApp="false" :applyId="applyId" @end="endEditTax"/>
    <h5-sign v-if="isSign" :info="signInfo" @finish="onSign"/>
    <h5-commit v-if="isCommit" :info="signInfo" @finish="onCommit"/>
    <div class="panel-signature" v-if="ready && status===null" v-show="!isEditTax && !isCommit && !isSign">
      <div v-if="isMultipleRecordApply">
        <h2>双录保单</h2>
        <div class="group-switch">
          <label class="color-gray">是否已双录</label>
          <hq-switch v-model="hasDoubleRecords" @update="updateDoubleRecords"/>
        </div>
      </div>
      <h2>投保确认</h2>
      <div class="panel-terms">
        <p>
          <hq-checkbox v-model="checkTerms" />
          <span>本人已阅读并同意</span>
          <a :href="statement.url" @click="cached">《{{statement.name}}》</a>
          <template v-for="clause in clauseList">
            <span>、</span>
            <a :href="clause.url" @click="cached">《{{clause.name}}》</a>
          </template>
          <span>的内容。</span>
        </p>
      </div>
      <tax-dweller :taxInfo="taxInfo" :inApp="false" @taxResident="updateTaxResident" @openPanel="openTaxEditPanel"/>
      <ul class="list-main">
        <li>
          <label>投保日期</label>
          <span class="info">{{applyDate}}</span>
        </li>
        <li v-for="(it,index) in caInfoList">
          <label>{{it.desc}}</label>
          <span v-if="it.cType==1" class="btn-upload" @click="goSign({index, list: 'caInfoList'})">
            <i class="sign"></i>
          </span>
          <span v-else-if="it.cType==4" class="btn-upload" @click="goCommit({index, list: 'caInfoList'})">
            <i class="sign"></i>
          </span>
          <span v-else class="btn-upload">
            <i class="camera">
              <input type="file" @change="onCapture(it, $event)" accept="image/*" capture="camera">
            </i>
          </span>
          <div class="list-preview">
            <span v-for="img in pluck(it)" class="item">
              <i @click="removeImage(img,it, 'sign')"></i>
              <em>
                <img :src="img.datum"/>
              </em>
            </span>
          </div>
          <div class="tips" v-if="it.tips">{{it.tips}}</div>
        </li>
      </ul>
      <h2>证件影像上传</h2>
      <div class="panel-upload">
        <ul>
          <li v-for="it in certImageInfoList">
            <div class="btn-upload"  v-if="photoEditable(it)">
              <i class="camera">
                <input type="file" @change="onCapture(it, $event)" accept="image/*">
              </i>
            </div>
            <h3>
              <span>{{it.customerName}}</span>
              <label :class="typeEnum(it).role">{{typeEnum(it).name}}</label>
            </h3>
            <p>
              <small>{{it.certType}}</small>
              <small>{{it.certNo}}</small>
            </p>
            <div class="list-preview">
              <span v-for="img in pluck(it)" class="item">
                <i @click="removeImage(img,it, 'camera')"></i>
                <em>
                  <img :src="img.datum"/>
                </em>
              </span>
            </div>
          </li>
        </ul>
        <p class="tips">温馨提示：证件影像必须上传，注意身份证必须上传正反面。</p>
      </div>
      <h2>其它资料上传</h2>
      <div class="panel-upload">
        <ul class="list-minor">
          <li v-for="it in otherImageInfoList">
            <span class="btn-upload" v-if="photoEditable(it)">
              <i class="camera">
                <input type="file" @change="onCapture(it, $event)" accept="image/*">
              </i>
            </span>
            <h3>{{it.name}}</h3>
            <div class="list-preview">
              <span v-for="img in pluck(it)" class="item">
                <i @click="removeImage(img,it, 'camera')"></i>
                <em>
                  <img :src="img.datum"/>
                </em>
              </span>
            </div>
          </li>
        </ul>
        <p class="tips">温馨提示：根据客户投保情况选择性上传相关资料。</p>
      </div>
      <section-payment v-model="payInfo" :inApp="false" @validation="onValidation"/> <!--支付信息-->

      <panel-countdown
        v-model="countModel" :mobile="mobile" @send="send"
        :disabled="!(multipleRecordVerify && checkTerms && checkTaxInfo && uploaded && payInfoValid)"/>

      <footer>
        <btn class="btn btn-primary btn-reverse" @click.native="cachePayInfo" :disabled="submitDisabled">暂存</btn>
        <btn class="btn btn-primary" @click.native="submit" :disabled="submitDisabled">确认提交</btn>
      </footer>
    </div>
    <div v-show="loading" class="mask">
      <div class="loader"></div>
    </div>
  </div>
</template>
<script>
  import sectionPayment from '../esignature/payment.vue'
  import panelCountdown from '../base/panel-countdown.vue'
  import hqCheckbox from '../base/hq-checkbox.vue'
  import hqDict from '../base/hq-dict.vue'
  import hqSwitch from '../base/hq-switch.vue'
  import btn from '../base/btn.vue'
  import taxDweller from '../esignature/tax-dweller.vue'
  import tipSignature from './tip-signature.vue'
  import h5Commit from './anySign/index.vue'
  import h5Sign from "./anySign/sign-name.vue"
  import Zip from "./item/h5-esign-item/zip"
  import taxDwellerPanel from './tax-dweller/index.vue'
  import clone from '@/widget/util/clone'
  import URL from '@/widget/util/URL'
  import equals from '@/widget/util/equals'
  import {isFunction} from '@/widget/util/index'
  import {fetch, toast} from '@/widget/util/currying'
  import opacify from '@/widget/util/opacify'
  import {
    WX_CHANGE_SIGN, CACHE_SIGN_UPLOAD, SIGN_SAVE_PAY_SHARE, SMS_SEND_SHARE, SMS_VERIFY_SHARE, INIT_SIGNATURE,
    UPLOAD_IMG, VERIFY_CERT, RNREQUEST, SUBMIT_SIGNATURE, RNVALIDATE, DELETEAPPLY, CACHE_SIGN_CA, WX_TAX_VERIF
  } from '@/api'
  const FastClick = require('fastclick')
  FastClick.attach(document.body)
  export default {
    components: {
      btn, h5Sign, tipSignature, hqDict, hqCheckbox, hqSwitch, panelCountdown, sectionPayment, h5Commit, taxDweller, taxDwellerPanel
    },
    data () {
      return {
        applyId: null,
        statement: null,
        checkTerms: false,
        loading: false,
        isSign: false,
        isCommit: false,
        signInfo: {}, // 签字信息
        canvasRelatedInfo: null,  //  打开canvas时的上下文，保存一些相关的状态信息，关闭canvas时会用到
        //  基于便于和后端整合逻辑以及前端交互实现，需要两个属性（photoFileKey,signFileKey所代表的这两个属性）添加到元数据中，作为数据传递用
        photoFileKey: 'photoFile',
        signFileKey: 'signImgFile',
        zip: new Zip({maxSize: 100 * 1024}),
        ready: false,
        applyDate: null,
        // 倒计时面板使用的模型
        countModel: {
          on: false,
          value: ''
        },
        sendCount: 0,
        clauseList: [],
        caInfoList: [],
        certImageInfoList: [],
        otherImageInfoList: [],
        status: null,
        result: {},
        payInfo: {},
        caInfo: {},
        taxInfo: {},
        validation: [],
        submitDisabled: false,
        TERMINAL_TIPS: '网络异常，提交失败，可点击确认提交按钮重新尝试~',
        VALUE: null, // 值的备份
        isEditTax: false // 是否在编辑税收居民信息
      }
    },
    watch: {
      payInfo (to, from) {
        if (Object.keys(from).length === 0) return
        if (!equals(to, from)) {
          this.countModel.on = false
        }
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
      verCode: {
        get () {
          return this.countModel.value
        },
        set (verCode) {
          this.countModel.value = verCode
        }
      },
      mobile: {
        get () {
          return this.payInfo.mobile
        },
        set (mobile) {
          this.payInfo.mobile = mobile
        }
      },
      uploaded: {
        get () {
          return this.uploadVerify({tip: false})
        }
      },
      payInfoValid: {
        get () {
          return this.validation.length === 0
        }
      }
    },
    created () {
      let url = new URL(location.href)
      let applyId = url.getKey('applyId')
      let status = url.getKey('status')
      let result = (history.state || {}).result
      if ((status || status === '0') && result) {
        status = parseInt(status)
        this.status = status
        this.result = result
        this.setTitle('查看投保结果')
        return
      }
      this.applyId = applyId
      this.loadData({applyId})
      this.optimizeHistoryBack()
    },
    methods: {
      fetch: fetch,
      // 加载数据
      loadData ({applyId}) {
        this.fetch(INIT_SIGNATURE, {applyId}).then(value => {
          let {caModel, caModel: {clauseList, caInfoList, applyDate, bankTransfer}, payDTO} = value
          let {uploadImageModel: {certImageInfoList, otherImageInfoList}, taxInfo} = value
          this.VALUE = clone(value) // 备份，提交时会用到
          this.statement = bankTransfer
          this.clauseList = clauseList
          this.caInfoList = caInfoList
          this.applyDate = applyDate
          this.certImageInfoList = certImageInfoList
          this.otherImageInfoList = otherImageInfoList
          this.caInfo = caModel
          this.payInfo = payDTO
          this.taxInfo = taxInfo
          this.count = this.getCount()
          this.ready = true
          // 场景恢复
          this.recover()
          if (location.hash === '#editTax') {
            this.isEditTax = true
          }
        }, errorMsg => this.tips(errorMsg)).catch(console.error)
      },
      // 优化后退行为
      optimizeHistoryBack () {
        window.addEventListener('popstate', event => this.historyBack(event))
      },
      historyBack (event) {
        this.isEditTax = false
      },
      // 缓存数据（到本地history对象中，页面级缓存，页面挂掉了则缓存丢失，从前进后退按钮中访问到的页面视为有效页面）
      cached () {
        let keys = ['checkTerms', 'verCode', 'payInfo']
        let info = keys.reduce((pub, key) => {
          if (Array.isArray(this[key])) {
            pub[key] = Array.from(this[key])
          } else {
            pub[key] = this[key]
          }
          return pub
        }, {})
        window.history.replaceState({info}, document.title, location.href)
      },
      // 恢复数据（从本地缓存数据的history对象中）
      recover () {
        let state = window.history.state
        if (state && state.info) {
          Object.keys(state.info).forEach(key => {
            this[key] = state.info[key]
          })
        }
      },
      onValidation (arr) {
        this.$set(this, 'validation', arr)
      },
      // 校验手机验证码
      mobileValidate () {
        return this.mobileValidateByHQ()
      },
      // 校验横琴的手机验证码
      mobileValidateByHQ () {
        const templeteNo = 'HQAPP_001'
        const {verCode: content, mobile: phoneNo} = this
        return this.axios.post(SMS_VERIFY_SHARE, {phoneNo, content, templeteNo}).then(({data}) => {
          const {success, value, errorMsg, errorCode} = data
          if (success) {
            return Promise.resolve(value)
          } else {
            let msg = errorMsg || value.errMsg
            if (errorCode == 4) {
              this.sendCount++
              if (this.sendCount >= 3) {
                msg = '验证码连续输错3次，本次投保作废'
                this.deleteApply()
                this.setCount(0)
              } else {
                this.setCount(this.sendCount)
              }
            }
            return Promise.reject(msg)
          }
        })
      },
      getUploadInfo () {
        let certImageInfoList = clone(this.certImageInfoList)
        if (Array.isArray(certImageInfoList)) {
          certImageInfoList = certImageInfoList.map(it => {
            delete it.imageFileList
            return it
          })
        }
        let otherImageInfoList = clone(this.otherImageInfoList)
        if (Array.isArray(otherImageInfoList)) {
          otherImageInfoList = otherImageInfoList.map(it => {
            delete it.imageFileList
            return it
          })
        }
        const {applyId} = this
        return {applyId, certImageInfoList, otherImageInfoList}
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
        this.taxInfo.isChineseTaxResident = isChineseTaxResident
        this.fetch(WX_CHANGE_SIGN, param).then(null, toast).catch(console.error)
      },
      getCaInfo () {
        let {signFileKey, photoFileKey} = this
        let caInfo = clone(this.caInfo)
        let caInfoList = clone(this.caInfoList).map(it => {
          if (it.sign) {
            delete it[signFileKey]
          } else if (it.photo) {
            delete it[photoFileKey]
          }
          return it
        })
        caInfo.caInfoList = caInfoList
        return caInfo
      },
      infoSubmit () {
        let param = clone(this.VALUE)
        param.caModel = this.getCaInfo()
        param.uploadImageModel = this.getUploadInfo()
        param.payDTO = clone(this.payInfo)
        param.taxInfo = clone(this.taxInfo)
        return this.fetch(SUBMIT_SIGNATURE, param, {timeout: 180000})
      },
      submit () {
        if (!this.validate()) return
        this.submitDisabled = true
        this.loading = true
        const onSuccess = value => {
          this.success(value)
          this.submitDisabled = false
          this.loading = false
        }
        const onFailure = errorMsg => {
          this.submitDisabled = false
          this.loading = false
          this.toast(errorMsg)
        }
        const onError = error => {
          this.loading = false
          this.submitDisabled = false
          this.toast(this.TERMINAL_TIPS)
          console.error(error)
        }
        this.validatePayInfo()
          .then(() => this.savePayInfo())
          .then(() => this.mobileValidate())
          .then(() => this.infoSubmit())
          .then(onSuccess, onFailure)
          .catch(onError)
      },
      deleteApply () {
        const {applyId} = this
        return this.fetch(DELETEAPPLY, {applyId}).then(null, toast)
      },
      getCount () {
        let {applyId, mobile} = this
        let count = 0
        if (localStorage && localStorage.getItem) {
          let map = localStorage.getItem('verifyCodeSendCountStore') || '[]'
          map = JSON.parse(map)
          let specify = map.find(it => it.mobile == mobile && it.applyId == applyId)
          if (specify && specify.count) {
            count = parseInt(specify.count)
          }
        }
        return count
      },
      setCount (count) {
        let {applyId, mobile} = this
        if (localStorage && localStorage.setItem) {
          let table = []
          let has = false
          table = table.map(it => {
            if (it.mobile == mobile && it.applyId == applyId) {
              it.count = count
              has = true
            }
            return it
          })
          if (!has) {
            table.push({applyId, mobile, count})
          }
          localStorage.setItem('verifyCodeSendCountStore', JSON.stringify(table))
          return true
        } else {
          return false
        }
      },
      setTitle (title) {
        document.title = title
        if (/weixin/i.test(navigator.userAgent)) {
          let iframe = document.createElement('iframe')
          iframe.src = '/favicon.ico'
          iframe.style.display = 'none'
          iframe.onload = function () {
            setTimeout(function () {
              iframe.remove()
            }, 9)
          }
          document.body.appendChild(iframe)
        }
      },
      success (value) {
        const {status} = value
        this.status = status
        this.result = value
        this.submitDisabled = false
      },
      tips (msg) {
        this.$vux.alert.show({
          title: '说明',
          content: msg
        })
      },
      toast (msg) {
        if (typeof msg === 'object') {
          if (msg.errorMsg) {
            msg = msg.errorMsg
          } else {
            msg = this.TERMINAL_TIPS
          }
        } else if (typeof msg !== 'string') {
          msg = this.TERMINAL_TIPS
        }
        this.$vux.toast.show({
          text: msg || this.TERMINAL_TIPS,
          type: 'text',
          width: '50%',
          isShowMask: false
        })
      },
      typeEnum ({customerType}) {
        return ({
          1: {name: '投保人', role: 'role-pay'},
          2: {name: '被保人', role: 'role-cared'},
          3: {name: '受益人', role: 'role-benefit'}
        })[customerType]
      },
      // 在签名或者批注前，缓存相关信息，更新签名信息
      setSignInfo (info) {
        const {index, list} = info
        const related = this[list][index]
        const {applyId: id} = this
        const {name, certNo} = related
        this.canvasRelatedInfo = info
        this.signInfo = {...related.keyWordRule, id, name, certNo}
      },
      // 去批注
      goCommit (info) {
        this.setSignInfo(info)
        this.isCommit = true
      },
      // 去签名
      goSign (info) {
        this.setSignInfo(info)
        this.isSign = true
      },
      // 批注结束，包含批注成功和取消批注
      onCommit (file) {
        this.isCommit = false
        if (!file) return
        let {index, list} = this.canvasRelatedInfo
        let related = this[list][index]
        let {signFileKey} = this
        this.$set(related, signFileKey, 'data:image/png;base64,' + file)
        this.uploadImage(file, {removeHead: false}).then(path => {
          this.$set(related, 'signImgPath', path)
          return this.saveCaInfo()
        }).catch(e => {
          this.$set(related, signFileKey, null)
          this.toast('图片上传失败，请稍后重试~')
          console.error(e)
        })
      },
      //  签名结束，包含签名成功和取消签名
      onSign (result) {
        this.isSign = false
        if (!result) return
        let {value, gem} = result || {}
        let {index, list} = this.canvasRelatedInfo
        let related = this[list][index]
        Promise.all([opacify(value).then(this.uploadImage), this.uploadGem(gem)]).then(([signImgPath, signPkgPath]) => {
          this.$set(related, 'signImgPath', signImgPath)
          this.$set(related, 'signPkgPath', signPkgPath)
          return this.saveCaInfo()
        }, toast).catch(console.error)
        this.canvasRelatedInfo = null
      },
      uploadImage (file) {
        return fetch(UPLOAD_IMG, {file, useFullUrl: 'yes'}).then(value => {
          const {url: [url]} = value
          return Promise.resolve(url)
        })
      },
      uploadGem (json) {
        let blob = new Blob([json], {type: 'application/json'})
        let reader = new FileReader()
        return new Promise((resolve, reject) => {
          reader.addEventListener('error', reject)
          reader.addEventListener('load', event => {
            return this.uploadImage(reader.result).then(resolve, reject)
          })
          reader.readAsDataURL(blob)
        })
      },
      //  移除图片。 该函数的实现与pluck函数有关系
      //  @param id {Array}
      removeImage ({ids, id, multiple}, it, type) {
        if (multiple) {
          it.imagePathList.splice(id, 1)
          it.imageFileList && it.imageFileList.splice(id, 1)
        } else {
          ids.forEach(id => (it[id] = null))
        }
        if (type === 'sign') {
          this.saveCaInfo()
        } else {
          this.saveUploadInfo()
        }
      },
      getBase64 (rowFile) {
        return this.zip.run(rowFile).then(({base64: file}) => {
          return file || this.zip.toDataURL(rowFile)
        })
      },
      //  当捕获图片时的处理函数
      onCapture (source, event) {
        this.getBase64(event.target.files[0]).then(file => {
          let multiple = Object.keys(source).indexOf('imagePathList') > -1 //  是否是多重的，如果是true，当前项可以上传多项图片
          if (multiple) {
            this.updateUpload({source, file}).then(() => this.saveUploadInfo())
          } else {
            this.updateSign({source, file}).then(() => this.saveCaInfo())
          }
        })
      },
      // 更新对应签名项
      updateSign ({source, file}) {
        let {photoFileKey} = this
        const {cType} = source
        this.$set(source, photoFileKey, file)   //  把图片以base64的方式显示到界面
        if (cType === 3) {  //  人脸识别。失败了不阻碍流程，失败了只给一个提示
          this.certVerify(source, file).then(({data: {success, errorMsg, value}}) => {
            if (success) {
              try {
                let info = JSON.parse(value)
                if (info.resultCode === '0') {
                  this.$set(source, 'faceFlag', 0)
                  this.toast(errorMsg || '人脸识别成功~')
                } else {
                  this.$set(source, 'faceFlag', 1)
                  this.toast(errorMsg || '人脸识别失败~')
                }
              } catch (e) {
                this.$set(source, 'faceFlag', 1)
                this.toast('人脸识别失败~')
              }
            } else {
              this.toast(errorMsg)
            }
          })
        }
        //  上传图片并同步数据
        return this.uploadImage(file).then(path => {
          source.photoPath = path
          return Promise.resolve()
        }).catch(e => {
          this.$set(source, photoFileKey, null)
          console.error(e)
        })
      },
      // 更新资料上传项
      updateUpload ({source, file}) {
        const {maxNum} = source
        let pathList = source.imagePathList || []
        let fileList = source.imageFileList || (pathList.length ? pathList.map(it => it.url) : [])
        fileList.push(file)
        if (fileList.length > maxNum) {
          fileList = fileList.slice(-maxNum)
        }
        this.$set(source, 'imageFileList', fileList)
        return this.uploadImage(file).then(path => {
          pathList.push({url: path, local: ''}) //  后端的格式以及要的格式
          if (pathList.length > maxNum) { //  数组过大，裁切掉多余部分
            pathList = pathList.slice(-maxNum)
          }
          source.imagePathList = pathList
//          this.$forceUpdate()
          return Promise.resolve()
        }).catch(() => {
          this.toast('图片上传失败')
          fileList.pop()
          this.$set(source, 'imageFileList', fileList)
          this.$forceUpdate()
        })
      },
      //  身份验证
      certVerify ({certNo, title}, file) {
        file = this.removeBase64Head(file)
        let param = {certiNo: certNo, certiName: title, testPicture: file, certiType: 'I'}
        return this.axios.post(VERIFY_CERT, param)
      },
      removeBase64Head (file = '') {
        return file.replace(/^data:image\/([^;]+);base64,/, '')
      },
      //  萃取一项元数据，得到需要展示的图片的数组列表
      //  注意：萃取过程不应操纵原数组，操纵原数组类似于for循环中更新循环数组，更新自身会不断触发mounted
      pluck (it) {
        let arr = []
        let {signFileKey, photoFileKey} = this
        let signPathKey = 'signImgPath'
        let photoPathKey = 'photoPath'
        let multiple = Object.keys(it).indexOf('imagePathList') > -1  //  有多张图片
        if (multiple) {
          if (!it.imageFileList) {  //  imageFileList是动态的、最新的；imagePathList是服务端生成，且前端可能会更新的
            if (Array.isArray(it.imagePathList)) {
              it.imagePathList.forEach(({url: datum}, id) => arr.push({datum, id, multiple}))
            }
          } else if (it.imageFileList && Array.isArray(it.imageFileList)) {
            it.imageFileList.forEach((datum, id) => arr.push({datum, id, multiple}))
          }
        }
        if (it.sign) {  // sign === true表示需要签名
          if (it[signFileKey]) { //  有新建的签名文件（base64文件)，使用文件
            arr.push({datum: it[signFileKey], ids: [signFileKey, signPathKey], multiple})
          } else if (it.signImgPath) {  // 如果没有文件，有路径的话，使用路径
            arr.push({datum: it.signImgPath, ids: [signPathKey], multiple})
          }
        }
        if (it.photo) { //  photo === true 表示需要拍照
          if (it[photoFileKey]) { //  如果有新拍的照片（base64文件），使用该文件
            arr.push({datum: it[photoFileKey], ids: [photoFileKey, photoPathKey]})
          } else if (it.photoPath) {  //  否则，如果有已有照片的路径，使用路径
            arr.push({datum: it.photoPath, ids: [photoPathKey]})
          }
        }
        return arr
      },
      // 判断一项数据的图片是否可以再编辑
      photoEditable (it) {
        return (it.imagePathList || []).length < (it.maxNum || 1)
      },
      uploadVerify ({tip}) {
        let {caInfoList, certImageInfoList, otherImageInfoList} = this
        let validateByType = it => {
          let {sign, photo, signImgPath, photoPath, desc} = it
          let valid = sign ? signImgPath : (photo ? photoPath : false)
          if (!valid && tip) {
            this.toast(`请完善${desc}`)
          }
          return valid
        }
        let lengthValidate = it => {
          let {imagePathList, minNum, name, certType, customerName, customerType} = it
          let valid = true
          if (minNum != null && minNum > 0) {
            if (!(Array.isArray(imagePathList) && imagePathList.length >= minNum)) {
              valid = false
              if (tip) {
                name = name || this.typeEnum({customerType}).name + `(${customerName})的${certType}`
                this.toast(`${name}至少需要上传${minNum}张`)
              }
            }
          }
          return valid
        }
        return caInfoList.every(validateByType) &&
          certImageInfoList.every(lengthValidate) &&
          otherImageInfoList.every(lengthValidate)
      },
      countVerify () {
        if (this.sendCount >= 3) {
          this.toast('验证码连续输错3次，本次投保作废')
          return false
        }
        return true
      },
      verCodeVerify () {
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
      validate (specify) {
        let map = {
          multipleRecordVerify: this.multipleRecordVerify,
          checkTerms: '请先阅读条款',
          checkTaxInfo: '请填写税收居民信息',
          uploaded: this.uploadVerify,
          verCode: '请验证手机号码',
          countVerify: this.countVerify,
          verCodeVerify: this.verCodeVerify
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
        specify = specify || Object.keys(map)
        return Array.isArray(specify) ? specify.every(verify) : verify(specify)
      },
      validatePayInfo () {
        const {payInfo} = this
        if (!payInfo.bank) {
          return Promise.reject('请选择银行')
        } else if (!payInfo.account) {
          return Promise.reject('请填写银行账号')
        } else if (!payInfo.mobile) {
          return Promise.reject('请填写手机号')
        }
        const {validation} = this
        return validation.length ? Promise.reject(validation[0].msg) : Promise.resolve()
      },
      savePayInfo (buffer = {}) {
        let payInfo = clone(this.payInfo)
        for (let key in buffer) {
          payInfo[key] = buffer[key]
        }
        return this.fetch(SIGN_SAVE_PAY_SHARE, payInfo)
      },
      // 缓存支付信息(指定后端跳过校验)
      cachePayInfo () {
        this.submitDisabled = true
        return this.savePayInfo({saveType: false}).then(() => {
          this.submitDisabled = false
          toast('暂存成功')
        }, errorMsg => {
          this.submitDisabled = false
          toast(errorMsg)
        }).catch(error => {
          this.submitDisabled = false
          console.error(error)
        })
      },
      saveUploadInfo () {
        const uploadInfo = this.getUploadInfo()
        return this.fetch(CACHE_SIGN_UPLOAD, uploadInfo)
      },
      saveCaInfo () {
        return this.fetch(CACHE_SIGN_CA, this.getCaInfo())
      },
      send () {
        if (!this.validate(['multipleRecordVerify', 'checkTerms', 'checkTaxInfo', 'uploaded', 'countVerify'])) {
          console.log('no pass!')
          return
        }
        return this.validatePayInfo()
          .then(() => this.savePayInfo())
          .then(() => this.sendAccessHQ(), toast)
      },
      // 由通联发送手机验证码
      sendAccessTL () {
        let {applyId} = this
        return this.axios.post(RNREQUEST, {applyId}).then(({data: {success, errorMsg, value}}) => {
          if (success) {
            this.countModel.on = true
            if (value.retCode === '0000') {
              this.reqSn = value.reqSn
            } else {
              this.toast(value.errMsg)
            }
          } else {
            this.toast(errorMsg)
          }
        })
      },
      // 由橫琴平台发送手机验证码
      sendAccessHQ () {
        const templeteNo = 'HQAPP_001'
        const {mobile: phoneNo} = this
        this.axios.post(SMS_SEND_SHARE, {phoneNo, templeteNo}).then(({data: {success, errorMsg, value = {}, errorCode}}) => {
          if (success && errorCode === '0') {
            this.countModel.on = true
          } else {
            this.toast(errorMsg || value.errMsg)
          }
        })
      },
      endEditTax (data) {
        this.isEditTax = false
        this.taxInfo = {
          ...this.taxInfo,
          name: data.basicApntInfo.firstName + '/' + data.basicApntInfo.familyName,
          taxCountry: data.taxAreas.map(it => it.taxCountry || it.taxCounty)
        }
        history.back()
      },
      // 打开税收地区信息编辑面板
      openTaxEditPanel () {
        this.isEditTax = true
        this.cached()
        // 在税收信息编辑视图中点击返回,应返回当前视图, 故添加一个history项
        history.pushState(history.state, document.title, location.pathname + location.search + '#editTax')
      },
      recommit () {
        let url = new URL(location.href)
        url.removeKey('status')
        url.invoke({replace: true})
        this.status = null
        this.submit()
      },
      updateDoubleRecords (hasDoubleRecords) {
        const param = {
          applyId: this.applyId,
          changeType: '1',
          doubleInfo: {
            hasDoubleRecords
          }
        }
        this.fetch(WX_CHANGE_SIGN, param).then(null, toast).catch(console.error)
      }
    }
  }
</script>
<style lang='less'  >
  @color-primary: #00adff;
  @color-split: #e1e1e1;
  body{
    overflow: hidden;
  }
  .panel-signature{
    background-color:#f7f7f7;
    -webkit-overflow-scrolling: touch;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .mask{
      position: fixed;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 2;
    }
    .group-switch {
      display: flex;
      background-color: white;
      justify-content: space-between;
      align-items: center;
      line-height: 25px;
      padding: 8px 15px;
    }
  }
  h2{
    font-weight: normal;
    line-height: 45px;
    color: #646464;
    font-size: 15px;
    padding: 0 12px;
    position: relative;
    &::before{
      content:' ';
      display:inline-block;
      width: 3px;
      height: 16px;
      line-height: 16px;
      background-color: #00b0ff;
      margin-right: 8px;
      margin-bottom: -3px;
    }
  }
  .panel-terms{
    background-color: white;
    padding: 14px 13px;
    line-height: 24px;
    color: #999;
    > p {
      font-size: 0;
      padding-left: 24px;
      text-indent: -24px;
    }
    span, a{
      font-size: 15px;
    }
  }
  a{
    text-decoration: none;
    color: @color-primary;
  }
  .btn-upload {
    width: 45px;
    height: 45px;
    display: flex;
    margin-right: 5px;
    .sign {
      background: url("~@/assets/image/sign.png") no-repeat center;
      background-size: contain;
      width: 25px;
      height:25px;
      display: block;
      margin: auto;
    }
    .camera {
      background: url("~@/assets/image/camera.png") no-repeat center;
      background-size: 24px 19.5px;
      width: 24px;
      height:20px;
      display: block;
      margin: auto;
      position: relative;
      padding: 12.5px 10.5px;
      input[type=file]{
        position: absolute;
        width: 100%;
        height:100%;
        left:0;
        top:0;
        border: 0 none;
        opacity: 0;
      }
    }
  }
  .list-preview{
    line-height: 0;
    &::after{
      content: ' ';
      clear: both;
      display: block;
      line-height: 0;
      height: 0;
    }
    &:empty::after{
      content:'';
      clear: none;
    }
    .item{
      float: left;
      margin:8px 12px 8px 0;
      width: 50px;
      height: 50px;
      position: relative;
      z-index: 0;
      > i{
        position: absolute;
        display: block;
        top: -10px;
        right: -10px;
        width: 20px;
        height: 20px;
        background: url('~@/assets/image/dele.png') no-repeat;
        background-size: contain;
        z-index:1;
      }
      em{
        display: block;
        width: 50px;
        height: 50px;
        overflow: hidden;
      }
      img{
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .list-main{
    background-color: white;
    line-height: 45px;
    border-top: 1px solid @color-split;
    padding-left: 15px;
    font-size: 15px;
    color: #333;
    li{
      list-style-type: none;
      display:block;
      margin: 0;
    }
    li + li {
      border-top: 1px solid @color-split;
    }
    .btn-upload,
    .info{
      float: right;
    }
    .info{
      display: inline-block;
      margin: 0 15px;
      color: #999;
    }
    .tips{
      color:#00b0ff;
      font-size: 11px;
      padding-bottom: 8px;
      line-height: 20px;
      clear: both;
    }
    .list-preview:empty + .tips {
      margin-top: -10px;
      clear: unset;
    }
  }
  .panel-upload{
    background-color: white;
    border-bottom: 1px solid transparent;
    &::after{
      content: ' ';
      clear: both;
      display: block;
      height: 0;
      line-height: 0;
    }
    li{
      list-style-type: none;
      margin: 0;
      padding: 12px 0;
      line-height: 18px;
      border-bottom: 1px solid @color-split;
    }
    h3{
      color: #333;
      font-size: 15px;
      font-weight: normal;
    }
    h3, p{
      line-height: inherit;
      margin: 8px 12px;
    }
    label{
      display:inline-block;
      border-radius: 3px;
      font-size: 12px;
      color: white;
      padding: 0 5px;
      margin-left: 12px;
      position:relative;
      top: -1.5px;
      line-height: 17.5px;
      height: 17.5px;
    }
    /*投保人*/
    .role-pay{
      background-color: #00adff;
    }
    /*被保人*/
    .role-cared{
      background-color: #00cdbf;
    }
    /*受益人*/
    .role-benefit{
      background-color: #fa9a28;
    }
    small{
      color:#999;
      font-size: 13px;
    }
    small + small {
      margin-left: 12px;
    }
    .tips{
      color:#00b0ff;
      font-size: 11px;
      padding: 8px 0;
      line-height: 20px;
    }
    .btn-upload{
      float: right;
      margin-top: 6px;
    }
    .list-preview{
      margin-left: 12px;
      .item{
        margin-bottom: 0;
      }
    }
  }
  .list-minor{
    li {
      padding: 2) 0;
    }
    h3{
      line-height: 24px;
      margin: 8px 12px;
    }
    .btn-upload{
      margin-top: -2px;
    }
    .list-preview{
      .item{
        margin-bottom: 8)
      }
    }
  }
  footer {
    padding: 8px;
    display: flex;
    .btn {
      flex: 1;
      margin: 0 8px;
    }
  }

</style>
