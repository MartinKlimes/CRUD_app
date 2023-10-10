<script setup>
import { useItemStore } from '../stores/itemStore'
import { computed, reactive, onMounted, watch } from 'vue'

const itemsStore = useItemStore()



const item = reactive({
  title: '',
  body: '',
  important: false
})

watch(() => itemsStore.selectedItem, () => {
  const updatedItem = itemsStore.getItem(itemsStore.selectedItem)
  if (updatedItem) {
    item.title = updatedItem.title
    item.body = updatedItem.body
    item.important = updatedItem.important
  } else {
    item.title = ''
    item.body = ''
    item.important = false
  }
})
const isEditing = computed(() => {
  return itemsStore.selectedItem != null
})

async function createItem() {
  const newItem = {
    title: item.title,
    body: item.body,
    important: item.important,
    date: Date.now()
  }
  await itemsStore.createItem(newItem)
  itemsStore.fetchItems()
}

async function editItem() {
  const updatedItem = {
    title: item.title,
    body: item.body,
    important: item.important,
    date: itemsStore.getItem(itemsStore.selectedItem).date,
    _id: itemsStore.selectedItem
  }
  await itemsStore.editItem(updatedItem)
  itemsStore.fetchItems()
}

const isValidate = computed(() => {
  return item.title != '' && item.body != ''
})

onMounted(() => {
  document.getElementById('formModal').addEventListener('hide.bs.modal', () => {
    if (!itemsStore.selectedItem) {
      setTimeout(() => {
        item.title = ''
        item.body = ''
        item.important = false
      }, 0)
    }
  })
})
</script>

<template>
  <div
    class="modal fade"
    id="formModal"
    tabindex="-1"
    aria-labelledby="formModalLabel"
    aria-hidden="true"
  >

    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="formModalLabel">{{ isEditing ? 'Update item' : 'New item' }}</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Title:</label>
              <input
                type="text"
                v-model="item.title"
                class="form-control"
                id="recipient-name"
                required
              />
            </div>
            <div class="mb-3">
              <label for="message-text" class="col-form-label">Body:</label>
              <textarea v-model="item.body" class="form-control" id="message-text"></textarea>
            </div>
            <div class="form-check">
              <input
                v-model="item.important"
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label class="form-check-label" for="flexCheckDefault"> Important </label>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button
            :disabled="!isValidate"
            @click="isEditing ? editItem() : createItem()"
       
            type="button"
            data-bs-dismiss="modal"
            :class="[!isEditing ? 'btn btn-primary' : 'btn btn-success']"
          >
          {{ isEditing ? 'Update item' : 'Add item' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
