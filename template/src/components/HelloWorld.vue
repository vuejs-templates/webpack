<template>
  <div class="hello">
    <h1>MY NAME IS {{ name }}</h1>
    <router-link to="/test">run</router-link>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { testRequest } from '../api/test';

export default {
    name: 'HelloWorld',
    data () {
        return {
        };
    },
    created () {
        console.log(this.name);
        this.$store.commit('CHANGE_NAME');
        console.log(this.name);
    },
    computed: {
        ...mapState([
            'name', // this.$store.name 映射 this.name
            'userInfo'
        ]),
        ...mapGetters([
            'sex'
        ])
    },
    methods: {
        axiosTest () {
            testRequest('crm_access_type1').then(response => {
                console.log(JSON.stringify(response));
            });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
