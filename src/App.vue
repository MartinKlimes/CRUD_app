<script setup>


import ItemModal from './components/ItemModal.vue';
import ItemForm from './components/ItemForm.vue';
import { useItemStore } from './stores/itemStore'

const itemStore = useItemStore()
itemStore.fetchItems()


</script>

<template>
  <div class="wrapper">
    <div class="card">
      <router-view></router-view>
      <item-modal/>
      <item-form/>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100vh;
  width: 100%;
  position: absolute;
  background-color: rgb(252, 247, 247);
}

.card {
  max-width: 800px;
  margin: 0 auto;
  margin-top: 20px;
}
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
