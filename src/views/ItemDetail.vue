<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '../stores/itemStore'
import ItemForm from '../components/ItemForm.vue'
import { ref, reactive, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const itemStore = useItemStore()

function goBack() {
  router.push('/')
  itemStore.selectedItem = null
}
</script>

<template>
  <div class="card-body">
    <div v-if="!itemStore.getItem(route.params.id)" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else>
      <span
        v-if="itemStore.getItem(route.params.id).important"
        class="badge text-bg-warning w-25 z-1 mb-4"
        title="Important!"
        >Important!</span
      >
      <h5 class="card-title">{{ itemStore.getItem(route.params.id).title }}</h5>
      <p class="card-text">{{ itemStore.getItem(route.params.id).body }}</p>
    </div>
  </div>
  <div class="card-header d-flex justify-content-between align-items-center">
    <button @click="goBack" class="btn btn-dark">Back</button>
    <button
      @click="itemStore.selectedItem = route.params.id"
      class="btn btn-success"
      data-bs-toggle="modal"
      data-bs-target="#formModal"
      data-bs-whatever="@fat"
    >
      Edit
    </button>
  </div>
</template>
<style scoped>
.card-body {
  text-align: center;
}
</style>
