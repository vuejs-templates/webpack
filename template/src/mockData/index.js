import Mock from 'mockjs'
// 一些正则匹配的公用拦截
import commonMock from './common'
// 单据
import baseMock from './base'

const HOST = ''

const mockArr = [
  ...baseMock,
  ...commonMock
]

Mock.setup({
  timeout: 200
})
mockArr.forEach(mockItem => {
  let rurl = mockItem.url
  Mock.mock(
    // 兼容正则匹配
    typeof rurl === 'string' ? HOST + rurl : rurl,
    mockItem.type,
    mockItem.data
  )
})
