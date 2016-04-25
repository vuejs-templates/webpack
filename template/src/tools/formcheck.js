/**
 * Created by hq5544 on 16/3/30.
 * vue-validator 的验证规则和提示文字
 */
import utils from '../tools/utils'

export const validRules = {
    username: {
        required: {
            rule: true,
            message: '请输入姓名'
        }
    },
    bankCard: {
        length: {
            rule: 12,
            message: '请输入 12 位银行卡号'
        }
    },
    phone: {
        length: {
            rule: 11,
            message: '请输入 11 位手机号'
        }
    },
    password: {
        minlength: {
            rule: 6,
            message: '请输入 6 - 20 位密码'
        },
        maxlength: {
            rule: 20,
            message: '请输入 6 - 20 位密码'
        }
    },
    code: {
        length: {
            rule: 6,
            message: '您输入的验证码有误'
        }
    },
    idcard: {
        length: {
            rule: 18,
            message: '请输入 18 位身份证号'
        }
    }
}

export const validators = {
    eq (val, target) {
        return parseInt(val, 10) === parseInt(target, 10)
    },
    atLeast (val, target) {
        return parseInt(val, 10) >= parseInt(target, 10)
    },
    length (val, target) {
        return val.length === parseInt(target, 10)
    }
}

export function toValidate(cb) {
    // 手动验证
    this.$validate(true)
    if (this.$validator.invalid) {
        const errorsList = this.$validator.errors.reverse()
        let errors = ''
        for (const i in errorsList) {
            if ({}.hasOwnProperty.call(errorsList, i)) {
                errors += `${errorsList[i].message}<br>`
            }
        }
        utils.alert(errors)
    } else {
        cb()
    }
}
