import { defineStore } from 'pinia'
import { api } from '../api'

export interface Item {
  _id: string
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
      return (id: string) => this.items.find((item) => item._id === id)
    }
  },
  actions: {
    async fetchItems() {
      api
        .get('items')
        .then((response) => {
          this.items = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    },
    async createItem(item: Item) {
      try {
        const response = await api.post('items', item)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async deleteItem() {
      try {
        const response = await api.delete('items/' + this.selectedItem)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async editItem(item: Item) {
      try {
        const response = await api.patch('items/' + item._id, item)
        console.log(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    async orderItems() {
      if (this.sortType === 'date') {
        this.items.sort((a, b) => {
          if (this.sortDirection === 'desc') {
            return new Date(b.date).getTime() - new Date(a.date).getTime()
          } else {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
          }
        })
      } else if (this.sortType === 'title') {
        this.items.sort((a, b) => {
          if (this.sortDirection === 'desc') {
            return b.title.localeCompare(a.title)
          } else {
            return a.title.localeCompare(b.title)
          }
        })
      }
    }

  }
})
