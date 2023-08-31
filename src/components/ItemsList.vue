<script setup lang="ts">
import { useItemStore } from '../stores/itemStore'
import ItemCard from './ItemCard.vue'

const itemStore = useItemStore()

function orderItems(event: Event) {
  const value = (event.target as HTMLSelectElement).value
  if (value === 'titleAsc') {
    itemStore.sortType = 'title'
    itemStore.sortDirection = 'asc'
  } else if (value === 'titleDesc') {
    itemStore.sortType = 'title'
    itemStore.sortDirection = 'desc'
  } else if (value === 'date') {
    itemStore.sortType = 'date'
    itemStore.sortDirection = 'desc'
  }
  itemStore.fetchItems()
}
</script>

<template>
  <div class="card-header d-flex justify-content-between align-items-center">
    <select @click="orderItems" class="form-select w-25" aria-label="Default select example">
      <option value="date">Date</option>
      <option value="titleAsc">Title (ascending)</option>
      <option value="titleDesc">Title (descending)</option>
    </select>

    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#formModal"
      data-bs-whatever="@fat"
    >
      Add item
    </button>
  </div>

  <div class="card-body">
    <div v-if="!itemStore.items.length" class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
      <TransitionGroup name="items">
        <ItemCard
          v-for="item in itemStore.items"
          :key="item.id"
          :item="item"
          @click="itemStore.selectedItem = item.id"
        />
      </TransitionGroup>
    </div>
  </div>
</template>
<style scoped>
.items-card {
  transition: all 0.5s ease-in-out;
}
.items-enter-from {
  transform: scale(0.5) translatey(-80px);
  opacity: 0;
}

.items-leave-to {
  transform: translatey(30px);
  opacity: 0;
}

.items-leave-active {
  position: absolute;
  z-index: -1;
}

.card-body {
  height: 830px;
  overflow: auto;
}

.spinner-border {
  position: absolute;
  left: 50%;
  top: 50%;
}
</style>
