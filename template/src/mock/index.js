import {Mock} from 'mockjs';
Mock.mock('/api/login', 'get', {
    data: {},
    msg: '',
    code: 200
});