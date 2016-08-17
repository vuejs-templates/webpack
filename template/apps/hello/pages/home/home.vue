<template>
<article bh-layout-role='single'>
    <h2>{{title}}</h2>
    <section>
        <bh-search class='bh-mb-24' style='width:60%' placeholder='请输入学号/姓名/拼音/所属部门' @search='search'></bh-search>
        <div>
            <div class='bh-col-md-12 bh-mb-16'>
                <div class='bh-pull-left'>
                    <bh-button type='primary' @click='add'>新增</bh-button>
                    <bh-button type='default' @click='add'>删除</bh-button>
                    <bh-button type='default' @click='add'>导出</bh-button>
                    <bh-button type='default' @click='add'>导入</bh-button>
                </div>
            </div>
            <div>
                <emap-datatable v-ref:studentTable :options='options' @edit='edit' @del='del'></emap-datatable>
            </div>
        </div>
    </section>
</article>
</template>

<script>
import bhPagination from 'bh-vue/bh-pagination/bhPagination.vue';
import bhSearch from 'bh-vue/bh-search/bhSearch.vue';
import bhButton from 'bh-vue/bh-button/bhButton.vue';
import emapDatatable from 'bh-vue/emap-datatable/emapDatatable.vue';

export default {
    data () {
        return {
            title: 'Hello',
            widgets: Array,
            pager: {
                'pagenum': 0,
                'total': 10
            },
            options: {
                'pagePath': 'http://res.wisedu.com/WeCloud/emap-meta/cmp/appManage_getAppHistoryList.json',
                'action': 'appManage_getAppHistoryList',
                'checkable': true,
                'pageable': true,
                'sortable': true,
                'height': 500,
                'columnsReorder': true,
                'serverProcessing': false,
                'params': {appId: 0, serviceType: 0},
                'operations': {
                    'title': '操作',
                    'width': 100,
                    'items': [{
                        'title': '查看',
                        'name': 'showhistory',
                        'type': 'link'
                    }]
                }
            },
            formOpts: {
                'pagePath': 'mock/emap/school.json',
                'modelName': '编辑学校信息'
            },
            formContainer: ''
        };
    },
    methods: {
        search (row) {
            console.log('search:', row);
        },
        add (row) {
            console.log(1314);
            var vm = this;
            var eform = '<emap-form :container=\'formContainer\' offset-top=0 :options=\'formOpts\'></emap-form>';
            $.bhPaperPileDialog.show({
                title: '新增学生基本信息',
                content: eform,
                titleContainer: '',
                footer: '<div class=\'text-center\'>' +
                        '<a class=\'bh-btn bh-btn-primary data-edit-save\' href=\'javascript:void(0)\'>保存</a>' +
                        '<a class=\'bh-btn bh-btn-default data-edit-cancel\' href=\'javascript:void(0)\'>取消</a>' +
                        '</div>',
                ready ($header, $section, $footer, $aside) {
                    vm.formContainer = $section;
                    vm.$compile($section[0]); // 重新扫描
                    $('.data-edit-save', $footer).on('click', () => {
                        console.log('save form: ', $section.emapForm('getValue'));
                    });
                    $('.data-edit-cancel', $footer).on('click', () => {
                        $.bhPaperPileDialog.hide();
                    });
                }
            });
        },
        edit (row) {
            console.log('edit:', row);
        },
        del (row) {
            console.log('del:', row);
        }
    },
    components: {
        bhPagination,
        bhSearch,
        bhButton,
        emapDatatable
    }
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
