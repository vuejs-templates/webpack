import Vue from "vue";
import Component from "vue-class-component";
import WithRender from "./App.html?style=./App.css";
{{#unless router}}

import Hello from "./components/Hello.vue";
{{/unless}}

@WithRender
@Component{{#unless router}}({
  components: {Hello}
}){{/unless}}
export default class App extends Vue {
  name = "app";

  constructor() {
    super();
  }
}
