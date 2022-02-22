import axios from 'axios'

export default {
  namespaced: true,

  state: {
    items: []
  },
  actions: {
    fetchPrices ({state, commit}) {
      return axios.get('/api/v1/prices')
        .then(res => {
          const prices = res.data
          commit('setItems', {resource: 'prices', items: prices}, {root: true})
          return state.items
        })
    }
  }
}