# mia_template_service_name_placeholder

## Summary

%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%

## Local development

First thing you need to do is install the dependencies. Enable Yarn running 

```sh
corepack enable
```

(or install it as a global dependency with `npm i -g yarn` for Node < 16.9.0), and run 

```sh
yarn install
```

> **Note**
>
> If you whish to use NPM instead of Yarn, simply delete the `yarn.lock` file and run `npm install`.

Once you have the dependencies in place, run

```sh
yarn start
```

to spin up the application.

### Build

The lifecycle hooks needed by micro-lc are automatically created in the built entrypoint by a
[custom Vite plugin](./plugins/vite-plugin-micro-lc.ts).

You need to set the `base` property in [vite.config.ts](./vite.config.ts) file to the path where static asses will be
found once the application is loaded in micro-lc (i.e., the `entry` property of the application in micro-lc configuration).

For example, if your Vue application is registered in micro-lc with the following configuration:

```json5
{
  "applications": {
    "vue3-parcel": {
      "integrationMode": "parcel",
      "route": "./vue3-parcel/",
      "entry": "/my-micro-lc-vue-parcel/",
      "injectBase": true
    }
  }
}
```

the `base` property in [vite.config.ts](./vite.config.ts) file should be `/my-micro-lc-vue-parcel/`.

## Use in micro-lc

Applications build with this template can be used as-is in micro-lc as [parcels](https://micro-lc.io/docs/guides/applications/parcels).

An example configuration may be:

```json5
{
  "applications": {
    "vue3-parcel": {
      "integrationMode": "parcel",
      "route": "./vue3-parcel/", // <-- must have the ending "/", should have the starting "."
      "entry": "/my-micro-lc-vue3-parcel/", // <-- must have the ending "/"
      "injectBase": true // TODO
    }
  }
}
```

### Internal routing

The internal routing of the application is already set up to work in micro-lc, meaning that the base url of the application is dynamically
computed on the bases of micro-lc `<base>`, as explained in the [official documentation](https://micro-lc.io/docs/guides/applications/parcels/#injectbase).

When registering new routes, remember to prepend the base of the parcel. You can obtain it calling the `getBasePath` function
exposed by [basePath.ts](./src//basePath.ts) and taking the property `parcelBase` of the result. A running example can be
found in [router/index.ts](./src/router/index.ts):

```ts
import { getBasePath } from '@/basePath'

const createVueRouter = () => {
  const paths = getBasePath()

  const router = createRouter({
    routes: [
      {
        path: paths.parcelBase,
        name: 'home',
        component: HomeView
      }
    ]
  })
}
```

In a similar way, parcel base path should be also used in internal links.  A running example can be found in 
[App.vue](./src/App.vue):

```vue
<script setup lang="ts">
  import { ref } from 'vue'
  import { getBasePath } from './basePath'

  const basePath = ref(getBasePath().parcelBase)
</script>

<template>
  <RouterLink :to="basePath + 'about'">About</RouterLink>
</template>

```
