import axios from 'axios'

export default {
  namespaced: true,

  state: {
    items: []
  },
  actions: {
    fetchBrands ({state, commit}) {
      return axios.get('/api/v1/brands')
        .then(res => {
          const brands = res.data
          commit('setItems', {resource: 'brands', items: brands}, {root: true})
          return state.items
        })
    }
  }
}