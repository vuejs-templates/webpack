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
    import {BhSearch, BhButton, EmapDatatable} from 'bh-vue';
    import store from '../../vuex/store';
    import Add from '../add/add';

    export default {
        data () {
            return {
                title: 'Hello',
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
                }
            };
        },
        methods: {
            search (row) {
                console.log('search:', row);
            },
            add (row) {
                var vm = this;
                var addPanel = '<add v-ref:add></add>';
                $.bhPaperPileDialog.show({
                    title: '新增学生基本信息',
                    content: addPanel,
                    footer: '<div class=\'text-center\'>' +
                            '<a class=\'bh-btn bh-btn-default data-cancel\' href=\'javascript:void(0)\'>取消</a>' +
                            '<a class=\'bh-btn bh-btn-primary data-next\' href=\'javascript:void(0)\'>下一步</a>' +
                            '</div>',
                    ready ($header, $section, $footer, $aside) {
                        vm.$compile($section[0]); // 重新扫描
                        $('.data-next', $footer).on('click', () => {
                            vm.$refs.add.next();
                        });
                        $('.data-cancel', $footer).on('click', () => {
                            $.bhPaperPileDialog.hide();
                        });
                    }
                });
            },
            edit () {},
            del () {}
        },
        components: {
            BhSearch,
            BhButton,
            EmapDatatable,
            Add
        },
        store: store
    };
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
