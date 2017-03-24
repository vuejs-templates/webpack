/**
 * 中升服务号4s店首页
 */
import Mock from 'mockjs'
import cache from '../../common/cache'
let mock = cache.getSessionData('mock')
  // mock 开关
let mockSwitch = mock ? '' : '_'

// 中升2.0首页--4s店信息
// images的object中的sequence表示图片顺序
Mock.mock(/store\/\d+/, 'get' + mockSwitch, {
  'code': 0,
  'message': '',
  'data': {
    'id': 1,
    'name': '深圳南山中升雷克萨斯',
    'logo': Mock.Random.dataImage('55x55'),
    'contact_number': '0755-86275119',
    'province': '广东省',
    'city': '深圳市',
    'district': '南山区',
    'address': '深云路9号',
    'latitude': 22.411609,
    'longitude': 113.024046,
    'images|4': [{
      'img': Mock.Random.dataImage('375x247'),
      'url': Mock.Random.dataImage('375x247'),
      'title': '@ctitle',
      'sequence|+1': 1
    }],
    'marketing_banners|3': [{
      'title': '标题',
      'image_url': Mock.Random.dataImage('360x154'),
      'target_url': 'https://target_url'
    }]
  }
})
