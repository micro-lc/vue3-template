import { createApp } from "vue";
import { createPinia } from "pinia";
import {
  renderWithQiankun,
  qiankunWindow,
} from "vite-plugin-qiankun/dist/helper";

import type { QiankunProps } from "vite-plugin-qiankun/dist/helper";

import App from "./App.vue";
import router from "./router";

const APP_SELECTOR = "#app";

const app = createApp(App);

app.use(createPinia());
app.use(router);

function retrieveContainer(props: QiankunProps) {
  const { container } = props;
  return container ? container.querySelector(APP_SELECTOR) : APP_SELECTOR;
}

const renderApp = (props: QiankunProps) => {
  const container = retrieveContainer(props) || APP_SELECTOR;
  app.mount(container);
};

renderWithQiankun({
  mount(props: QiankunProps) {
    renderApp(props);
  },
  bootstrap() {
    // eslint-disable-next-line
  },
  unmount() {
    app.unmount();
  },
  update() {
    // eslint-disable-next-line
  },
});

if (!qiankunWindow.__POWERED_BY_QIANKUN__) {
  renderApp({});
}
