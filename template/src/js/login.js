export default {
    components: {

    },
    data() {
        return {
            ruleForm: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: 'Email is required', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: 'Password is required', trigger: 'blur' },
                ],
            }
        }
    },
    mounted() { },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    localStorage.setItem('USER_INFO', JSON.stringify({
                        email: this.ruleForm.email, TOKEN: 123
                    }))
                    setTimeout(() => {
                        location.href = '/home';
                    }, 1000);
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
    },
};