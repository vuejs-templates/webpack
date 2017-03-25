import Vue from "vue";

import { expect } from "chai";

import Hello from "@/components/Hello";

describe("Hello component", () => {
  it("should render correct contents", () => {
    const hello = new Hello();
    const vm = hello.$mount();
    expect(vm.$el.querySelector(".hello h1").textContent)
      .to.equal("Welcome to Your Vue.js App");
  });
});
