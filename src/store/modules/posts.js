import Vue from 'vue'
import axios from 'axios'
import axiosInstance from '@/services/axios'
import { applyFilters } from '@/helpers'

export default {
  namespaced: true,

  state: {
    isAllPostsLoaded: false,
    items: []
  },
  actions: {
    fetchPosts ({state, commit}, {tradeId, filter = {}, init}) {
      if (init) {
        commit('setItems', {resource: 'posts', items: []}, {root: true})
      }

      const url = applyFilters(`/api/v1/posts?tradeId=${tradeId}`, filter)
      return axios.get(url)
        .then(res => {
          const {posts, isAllDataLoaded} = res.data
          commit('setAllDataLoaded', isAllDataLoaded)
          commit('mergePosts', posts)
          return state.items
        })
    },
    postPost ({commit, state}, {title, tradeId}) {
      const post = {}
      post.title = title
      post.trade = tradeId

      return axiosInstance.post('/api/v1/posts', post)
        .then(res => {
          const createdPost = res.data 
          const index = state.items.length

          commit('addItemToArray', {item: createdPost, index, resource: 'posts'}, {root: true})
          return createdPost
        })
    },
    sendPost ({dispatch}, {text, postId}) {
      const _post = {text, post: postId} 

      return axiosInstance.post('/api/v1/posts', _post)
        .then(res => {
          const createdPost = res.data
          dispatch('addPostToDiv', {_post: createdPost, postId})
          return createdPost
        })
    },
    addPostToDiv ({commit, state}, {_post, postId}) {
      const postIndex = state.items.findIndex(post => post._id === postId)

      if (postIndex > -1) {
        const posts = state.items[postIndex].posts
        posts.unshift(_post)
        commit('savePostToDiv', {posts, index: postIndex})
      }
    }
  },
  mutations: {
    savePostToDiv (state, {posts, index}) {
      Vue.set(state.items[index], 'posts', posts)
    },
    setAllDataLoaded (state, isAllDataLoaded) {
      state.isAllPostsLoaded = isAllDataLoaded
    },
    mergePosts (state, posts) {
      state.items = [...state.items, ...posts]
    }
  }
}