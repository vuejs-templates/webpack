import { Title, GeneralRulesItem, Pagination } from '@/components'

export default {
    name: "Page",
    components: {
        Title,
        GeneralRulesItem,
        Pagination
    },
    data() {
        return {
            ruleForm: {
                page: 1,
            },
            formInline: {
                name: '',
                state: '',
                type: '',
                date: ''
            },
            GeneralRulesDatas: [{
                icon: 'icon-gift', title: '$4,590', label: 'Last month sales', backgroundColor: '#98d346'
            }, {
                icon: 'icon-piechart', title: '360', label: 'New order received', backgroundColor: '#988cef'
            }, {
                icon: 'icon-read', title: '1,680', label: 'Total products', backgroundColor: '#ff6764'
            }, {
                icon: 'icon-crown', title: '110,500', label: 'Unigue visitors', backgroundColor: '#00c5b1'
            }],
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    mounted() { },
    methods: {
        handlePageClick(val) {
            const { pathname } = window.location;
            let queryString = [];
            this.ruleForm = {
                ...this.ruleForm,
                page: val
            }
            let ruleForm = this.ruleForm;
            for (let key in ruleForm) {
                if (ruleForm[key] || ruleForm[key] === 0) {
                    queryString.push(`${key}=${ruleForm[key]}`);
                }
            }
            const path = `${pathname}?${queryString.join('&')}`;
            window.location.href = path;
        },
        handleClick(item) {
            this.$router.push('/details?id=1');
        },
        onSubmit() {

        },
        onReset() {

        }
    },
};