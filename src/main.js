import './public-path';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import routes from './router';

let router = null;
let instance = null;
let history = null;

const APP_SELECTOR = '#app'

function retrieveContainer(props = {}) {
    const { container } = props;
    return container ? container.querySelector(APP_SELECTOR) : APP_SELECTOR
}

function retrieveHistoryBase(props = {}) {
  const qiankunBase = props.activeRule || '/'
  return window.__POWERED_BY_QIANKUN__ ? qiankunBase : '/'
}

function render(props = {}) {
  history = createWebHistory(retrieveHistoryBase(props));
  router = createRouter({ history, routes });

  instance = createApp(App);
  instance.use(router);
  instance.mount(retrieveContainer(props));
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {}

export async function mount(props) {
  render(props);
  instance.config.globalProperties = {...instance.config.globalProperties, ...props};
}

export async function unmount() {
  instance.unmount();
  instance._container.innerHTML = '';
  instance = null;
  router = null;
  history.destroy();
}
