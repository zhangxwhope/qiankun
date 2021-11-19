import './public-path';
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";
import store from "./store";

Vue.config.productionTip = false;

let router: any = null
let app: any = null

function render(props: any) {
  const { container } = props
  const baseURI = container && container.baseURI
  const base = baseURI && (baseURI.substr(baseURI.lastIndexOf(':') + 5))
  router = new VueRouter({
    mode: 'history',
    base: (window as any).__POWERED_BY_QIANKUN__ ? `${base}/` : '/',
    routes
  })

  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props: any) {
  console.log('[vue] props from main framework', props);
  props.onGlobalStateChange((state: any, prev: any) => {
    // state: 变更后的状态; prev 变更前的状态
    console.log(state, prev);
  });
  props.setGlobalState({
    data: 'global data change by vueApp'
  })
  render(props);
}

export async function unmount() {
  app.$destroy();
  app.$el.innerHTML = '';
  app = null;
  router = null;
}