import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/services/axios'
import { applyFilters } from '@/helpers'

export default {
  namespaced: true,

  state: {
    items: [],
    item: {}
  },
  actions: {
    fetchTrades ({state, commit}, options = {}) {
      commit('setItems', {resource: 'trades', items: []}, {root: true})
      const url = applyFilters('/api/v1/trades', options.filter)

      return axios.get(url)
        .then(res => {
          const trades = res.data
          commit('setItems', {resource: 'trades', items: trades}, {root: true})
          return state.items
        })
    },
    fetchTradeById ({state, commit}, tradeId) {
      commit('setItem', {resource: 'trades', item: {}}, {root: true})
      return axios.get(`/api/v1/trades/${tradeId}`)
        .then(res => {
          const trade = res.data
          commit('setItem', {resource: 'trades', item: trade}, {root: true})
          return state.item
        })
    },
    createTrade ({rootState}, tradeToCreate) {
      tradeToCreate.tradeCreator = rootState.auth.user
      tradeToCreate.processedLocation = tradeToCreate.location.toLowerCase().replace(/[\s,]+/g,'').trim()

      return axiosInstance.post('/api/v1/trades', tradeToCreate)
        .then(res => res.data)
    },
    joinTrade ({state, rootState, commit, dispatch}, tradeId) {
      // We were just debugging in this lecture (:
      const user = rootState.auth.user

      return axiosInstance.post(`/api/v1/trades/${tradeId}/join`)
        .then(() => {
          dispatch('auth/addTradeToAuthUser', tradeId, {root: true})

          const joinedPeople = state.item.joinedPeople
          commit('addUsersToTrade', [...joinedPeople, user])
          return true
        })
    },
    leaveTrade ({state, rootState, commit, dispatch}, tradeId) {
      const user = rootState.auth.user

      return axiosInstance.post(`/api/v1/trades/${tradeId}/leave`)
        .then(() => {
          dispatch('auth/removeTradeFromAuthUser', tradeId, {root: true})

          const joinedPeople = state.item.joinedPeople
          const index = joinedPeople.findIndex(jUser => jUser._id === user._id)
          joinedPeople.splice(index, 1)
          commit('addUsersToTrade', joinedPeople)
        })
    },
    updateTrade ({commit, state}, tradeData) {
      tradeData.processedLocation = tradeData.location.toLowerCase().replace(/[\s,]+/g,'').trim()
      return axiosInstance.patch(`/api/v1/trades/${tradeData._id}`, tradeData)
        .then(res => {
          const updatedTrade = res.data
          commit('mergeTrade', updatedTrade)
          return state.item
        })
    }
  },
  mutations: {
    addUsersToTrade (state, joinedPeople) {
      Vue.set(state.item, 'joinedPeople', joinedPeople)
    },
    mergeTrade (state, updatedTrade) {
      state.item = {...state.item, ...updatedTrade}
    }
  }
}




