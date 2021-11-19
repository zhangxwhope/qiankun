<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/app-vue">SubAppVue</router-link> |
      <router-link to="/app-react">SubAppReact</router-link>
    </div>
    <div id="container"></div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {
  addGlobalUncaughtErrorHandler,
  removeGlobalUncaughtErrorHandler,
} from "qiankun";

export default Vue.extend({
  mounted() {
    // 全局的未捕获异常处理
    const errorHandler = (event: any) => {
      console.log("errorHandler -> event", event);
    };
    addGlobalUncaughtErrorHandler(errorHandler);
    this.$once("hook:beforeDestroy", () => {
      removeGlobalUncaughtErrorHandler(errorHandler);
    });
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
