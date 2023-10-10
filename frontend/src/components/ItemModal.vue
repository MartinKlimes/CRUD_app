<script setup lang="ts">
import { useItemStore } from '../stores/itemStore'
import { onMounted } from 'vue';

const itemStore = useItemStore()

onMounted(() => {
  document.getElementById('deleteModal')?.addEventListener('hide.bs.modal', () => {
    setTimeout(() => {
      itemStore.selectedItem = null
    }, 0)
  })
})

async function deleteItem() {
  await itemStore.deleteItem()
  itemStore.fetchItems()

}

</script>

<template>
  <div
    class="modal fade"
    id="deleteModal"
    tabindex="-1"
    aria-labelledby="deleteModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deleteModalLabel">Delete Item</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Are you sure you want to delete the item?</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button @click="deleteItem" type="button" class="btn btn-primary" data-bs-dismiss="modal">
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
