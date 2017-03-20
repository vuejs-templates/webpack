// Use this file to register components custom hooks.
// @see https://github.com/vuejs/vue-class-component#adding-custom-hooks
{{#router}}
import Component from "vue-class-component";

{{/router}}
{{#router}}
// Register the router hooks with their names
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
]);
{{/router}}
