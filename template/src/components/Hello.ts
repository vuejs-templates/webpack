import Vue from "vue";
import Component from "vue-class-component";
import WithRender from "./Hello.html?style=./Hello.css";

@WithRender
@Component
export default class Hello extends Vue {
  msg = "Welcome to Your Vue.js App";

  constructor() {
    super();
  }
}
