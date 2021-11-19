import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routes from "./router";
import store from "./store";
import { registerMicroApps, start, initGlobalState } from 'qiankun';

Vue.config.productionTip = false;

let router: any = null
let app: any = null
const isAlone = !window.__POWERED_BY_QIANKUN__  // 独立运行

function render(props: any) {
  const { container } = props;
  router = new VueRouter({
    base: !isAlone ? '/app-vue-base/' : '/',
    mode: 'history',
    routes,
  });

  app = new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount(container ? container.querySelector('#app') : '#app');
}

// 独立运行时
if (isAlone) {
  render({});
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}
export async function mount(props: any) {
  console.log('[vue] props from main framework', props);
  props.onGlobalStateChange((state: any, prev: any) => {
    // state: 变更后的状态; prev 变更前的状态
    if (state.data !== prev.data) {
      console.log(state, '子应用 state');
      console.log(prev, '子应用 prev');
    }
  });

  const data = {
    data: 'global data change by vueAppBase'
  }
  props.setGlobalState(data)

  const actions = initGlobalState(data)
  actions.onGlobalStateChange((state: any, prev: any) => {
    if (state.data !== prev.data) {
      console.log(state, 'vueAppBase state');
      console.log(prev, 'vueAppBase prev');
      props.setGlobalState(state)
    }
  })
  actions.setGlobalState({
    data: 'global data change by middle'
  })

  // props.setGlobalState(state);
  render(props);
}
export async function unmount() {
  app.$destroy();
  app.$el.innerHTML = '';
  app = null;
  router = null;
}

// 注册微应用
registerMicroApps([
  {
    name: 'reactApp',
    entry: '//localhost:3001',
    container: '#container',
    activeRule: isAlone ? '/app-react' : '/app-vue-base/app-react',
  },
  {
    name: 'vueApp',
    entry: '//localhost:8081',
    container: '#container',
    activeRule: isAlone ? '/app-vue' : '/app-vue-base/app-vue',
  }
]);

// 启动 qiankun
start({
  prefetch: false
});
