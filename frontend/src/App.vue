<script setup>
import ItemModal from './components/ItemModal.vue'
import ItemForm from './components/ItemForm.vue'
import { useItemStore } from './stores/itemStore'

const itemStore = useItemStore()
itemStore.fetchItems()
</script>

<template>
  <div class="wrapper">
    <div class="card">
      <router-view></router-view>
      <item-modal />
      <item-form />
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

</style>
