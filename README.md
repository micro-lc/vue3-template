<div align="center">
  <img src="https://avatars.githubusercontent.com/u/92730708?s=96&v=4" /> 
  <h1>Vue 3 Template</h1>
</div>

<p align="center">
  <a href="https://mia-platform.eu/?utm_source=referral&utm_medium=github&utm_campaign=micro-lc">
    <img src="https://img.shields.io/badge/Supported%20by-Mia--Platform-green?style=for-the-badge&link=https://mia-platform.eu/&color=DE0D92&labelColor=214147" alt="Mia-Platform"/>
  </a>
</p>

<p align="center">
  <a href="https://github.com/micro-lc/vue3-template/actions">
    <img src="https://github.com/micro-lc/vue3-template/workflows/Main%20CI/badge.svg" alt="Build Status" />
  </a>

  <a href="https://coveralls.io/github/micro-lc/vue3-template?branch=main">
    <img src="https://coveralls.io/repos/github/micro-lc/vue3-template/badge.svg?branch=master" alt="Coverage Status" />
  </a>
</p>

Boilerplate for a Vue 3 [micro-lc parcel](https://micro-lc.io/docs/guides/applications/parcels). It implements the
necessary features to work both standalone and in micro-lc.

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

---

## DevOps console

This walkthrough will explain you how to correctly create a [micro-lc](https://www.micro-lc.io) Vue 3 plugin from the DevOps Console.

### Create a microservice

Access your [Mia-Platform DevOps Console](https://console.cloud.mia-platform.eu/login), create a new project, and go to the **Design** area.

From the Design area of your project, select _Microservices_ and then create a new one, you have now reached [Mia-Platform Marketplace](https://docs.mia-platform.eu/development_suite/api-console/api-design/marketplace/)!
In the marketplace you will see a set of Examples and Templates that can be used to set-up microservices with a predefined and tested function.

For this walkthrough select the following template: **micro-lc Vue 3 Plugin Template**.
Give your microservice the name you prefer, in this walkthrough we'll refer to it with the following name: **micro-lc-vue3-plugin-template**. Then, fill the other required fields and confirm that you want to create a microservice.  
A more detailed description on how to create a Microservice can be found in [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#2-service-creation) section of Mia-Platform documentation.

### Expose an endpoint to your microservice

In order to access to your new microservice it is necessary to create an endpoint that targets it.  
In particular, in this walkthrough you will create an endpoint to your microservice *micro-lc-vue3-plugin-template*. To do so, from the Design area of your project select _Endpoints_ and then create a new endpoint.
Now you need to choose a path for your endpoint and to connect this endpoint to your microservice. Give to your endpoint the following path: **/micro-lc-vue3**. Then, specify that you want to connect your endpoint to a microservice and, finally, select *micro-lc-vue3-plugin-template*.  
Step 3 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#3-creating-the-endpoint) section of Mia-Platform documentation will explain in detail how to create an endpoint from the DevOps Console.

### Save your changes

After having created an endpoint to your microservice you should save the changes that you have done to your project in the DevOps console.  
Remember to choose a meaningful title for your commit (e.g 'created service micro_lc_vue3_plugin'). After some seconds you will be prompted with a popup message which confirms that you have successfully saved all your changes.  
Step 4 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#4-save-the-project) section of Mia-Platform documentation will explain how to correctly save the changes you have made on your project in the DevOps console.

### Deploy

Once all the changes that you have made are saved, you should deploy your project through the DevOps Console. Go to the **Deploy** area of the DevOps Console.  
Once here select the environment and the branch you have worked on and confirm your choices clicking on the *deploy* button. When the deploy process is finished you will receive a pop-up message that will inform you.  
Step 5 of [Microservice from template - Get started](https://docs.mia-platform.eu/development_suite/api-console/api-design/custom_microservice_get_started/#5-deploy-the-project-through-the-api-console) section of Mia-Platform documentation will explain in detail how to correctly deploy your project.

### Try it

Now, if you launch the following command on your terminal (remember to replace `<YOUR_PROJECT_HOST>` with the real host of your project):

```shell
curl <YOUR_PROJECT_HOST>/micro-lc-vue3
```

you should see a Vue-based webpage.

Congratulations! You have successfully learnt how to use our _micro-lc Vue 3 Plugin_ Template on the DevOps Console!
