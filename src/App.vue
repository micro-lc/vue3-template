<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";

import VueLogo from "./assets/logo.svg";
</script>

<template>
  <header>
    <VueLogo />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

#app header {
  line-height: 1.5;
  max-height: 100vh;
}

#app .logo {
  display: block;
  margin: 0 auto 2rem;
}

#app a,
#app .green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  #app a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

#app nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

#app nav a.router-link-exact-active {
  color: var(--color-text);
}

#app nav a.router-link-exact-active:hover {
  background-color: transparent;
}

#app nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

#app nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  body#vue-app {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  #app header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  #app header .wrapper {
    margin-left: 3em;
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  #app .logo {
    margin: 0 2rem 0 0;
  }

  #app nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
