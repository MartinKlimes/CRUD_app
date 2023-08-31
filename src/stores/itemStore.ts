import { defineStore } from 'pinia'
import { addDoc, onSnapshot, deleteDoc, updateDoc, query, orderBy, doc } from 'firebase/firestore'
import { itemsCollection } from '../firebase'

export interface Item {
  id: string
  title: string
  body: string
  important: boolean
  date: Date
}

export const useItemStore = defineStore('itemStore', {
  state: () => {
    return {
      items: [] as Item[],
      sortType: 'date',
      sortDirection: 'desc',
      selectedItem: null as string | null
    }
  },
  getters: {
    getItem() {
      return (id: string) => this.items.find((item) => item.id === id)
    }
  },
  actions: {
    async fetchItems() {
      onSnapshot(
        query(itemsCollection, orderBy(this.sortType, this.sortDirection)),
        (querySnapshot) => {
          let dbitems = [] as Item[]
          querySnapshot.forEach((doc) => {
            const item = {
              id: doc.id,
              title: doc.data().title,
              body: doc.data().body,
              important: doc.data().important,
              date: doc.data().date
            }
            dbitems.push(item)
          })
          this.items = dbitems
        }
      )
    },
    async createItem(item: Item) {
      addDoc(itemsCollection, item)
    },
    async deleteItem() {
      deleteDoc(doc(itemsCollection, this.selectedItem))
    },
    async editItem(item: Item) {
      updateDoc(doc(itemsCollection, item.id), {
        title: item.title,
        body: item.body,
        important: item.important
      })
    }
  }
})
