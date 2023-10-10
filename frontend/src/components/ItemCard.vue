<script setup lang="ts">
import { Item } from '../stores/itemStore'
import { useRouter } from 'vue-router'
import { useItemStore } from '../stores/itemStore'
import { Icon } from '@iconify/vue'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js'

const itemStore = useItemStore()

const props = defineProps<{
  item: Item
}>()

const router = useRouter()

function goItemDetail() {
  router.push({ name: 'itemDetail', params: { id: props.item._id } })
}

function showDeleteModal() {
  setTimeout(() => {
    itemStore.selectedItem = props.item._id
    
  }, 100);
  const myModal = new bootstrap.Modal(document.getElementById('deleteModal'))
  myModal.show()
}
</script>

<template>
  <div class="block items-card">
    <div class="position-relative">
      <div class="card" @click="goItemDetail">
        <span
          v-if="item.important"
          class="badge text-bg-warning position-absolute top-0 end-0 z-1"
          title="Important!"
          >!</span
        >
        <div class="card-body">
          <h5 class="card-title">{{ item.title }}</h5>
          <p class="card-text">{{ item.body }}</p>
        </div>
      </div>
      <button
        type="button"
        class="btn btn-outline-danger position-absolute bottom-0 border-0"
        @click="showDeleteModal"
      >
        <Icon icon="material-symbols:delete-outline" width="24" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 180px;
  overflow: hidden;
}
.card :hover {
  background-color: #ebebeb;
  cursor: pointer;
}
.card-body {
  padding-right: 0.25rem;
}

.card-text {
  font: 14px;
  max-height: 80px;
  overflow: auto;
}
</style>
