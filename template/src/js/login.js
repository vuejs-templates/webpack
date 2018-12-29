import api from '@/api'
import md5 from 'blueimp-md5'

export default {
    components: {

    },
    data() {
        return {
            form: {
                name: '',
                password: ''
            },
            rules: {
                name: [
                    { required: true, message: '登录账号不能为空', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '登录密码不能为空', trigger: 'blur' },
                ],
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        login() {
            
        }
    },
};