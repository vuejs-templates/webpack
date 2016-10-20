<template>
    <section>
        <div class='wizard-head'>
            <bh-step-wizard v-ref:add :items='catagories' :current.sync='current'></bh-step-wizard>
        </div>
        <div class='clearfix'></div>
        <div class='bh-mt-16'>
            <div class='info'>
                <info :catagory='current'></info>
            </div>
        </div>
    </section>
</template>

<script>
    import BhStepWizard from 'bh-vue/bh-step-wizard/bhStepWizard';
    import Info from './info';

    import {getCatagories} from '../../vuex/actions';
    import {catagories} from '../../vuex/getters';

    export default {
        data () {
            return {
                title: '新增学生基本信息',
                current: 'basic'
            };
        },
        methods: {
            // 下一步
            next () {
                // TODO: save info
                this.$refs.add.next();
            }
        },
        ready () {
            this.getCatagories();
        },
        activate (done) {
            this.getCatagories();
            // 等待列表获取结束
            this.$nextTick(done);
        },
        vuex: {
            actions: {getCatagories},
            getters: {catagories}
        },
        components: {BhStepWizard, Info}
    };
</script>

<style scoped>
    .wizard-head {
        overflow: hidden;
    }
</style>
