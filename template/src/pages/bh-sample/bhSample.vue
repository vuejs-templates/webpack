<template>
    <div class='bh-p-16'>
        <bh-button type='primary' @click='visible = true'>Welcome to BhVue</bh-button>
        <div class='bh-mt-8' v-if='visible' @click='visible = false'>
            WELCOME
        </div>
    </div>
</template>

<script>
    import BhButton from 'bh-vue/BhButton'

    export default {
        data: () => ({
            visible: false
        }),
        components: {BhButton}
    }
</script>
