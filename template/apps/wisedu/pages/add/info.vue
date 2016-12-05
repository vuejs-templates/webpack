<template>
    <div>
        <emap-form class='bh-col-md-9' v-ref:ef :options='options' :container='container' :outline='false' @inited='formInited'></emap-form>
        <div class="bh-col-md-3 bh-mt-32 photo">
            <img src="#">
        </div>
    </div>
</template>

<script>
    import {EmapForm} from 'bh-vue';
    import api from 'api';

    var _render = (vm, catagory) => {
        console.log('render ' + catagory);
    };

    export default {
        props: ['catagory'],
        data () {
            return {
                container: null,
                options: {
                    pagePath: api.USER_INFO_META,
                    modelName: 'user_view',
                    readonly: false,
                    inputWidth: 9
                    // model: 't'
                }
            };
        },
        methods: {
            formInited () {
                $.bhPaperPileDialog.resetPageFooter();
            }
        },
        beforeCompile () {
            this.container = this.$el;
        },
        ready () {
            _render(this, this.catagory);
            this.$watch('catagory', (catagory) => _render(this, catagory));
        },
        components: {EmapForm}
    };
</script>

<style scoped lang='less'>
    .photo {
        text-align: center;
        border-left: 1px solid #eee;

        img {
            width: 80%;
            height: 300px;
            margin: 0 auto;
        }
    }
</style>
