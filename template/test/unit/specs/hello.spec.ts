import { expect } from "chai";

import Vue = require("vue");
import Hello = require("src/components/hello");

describe("Hello.vue", () => {
  it("should render correct contents", () => {
    const vm = new Vue({
      el: document.createElement("div"),
      render: (h) => h(Hello),
    });
    const subtitle: Element | null = vm.$el.querySelector("subtitle");
    if (subtitle !== null) {
      expect(subtitle.textContent).to.equal("Welcome to Your Vue.js App");
    }
  });
});
