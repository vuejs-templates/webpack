let Mock = require('mockjs');
Mock.mock('/api/login', 'get', {
    data: {},
    msg: '',
    code: 200
});