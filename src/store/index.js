import Vue from 'vue';
import Vuex from 'vuex';
import API from '../plugins/axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: null
  },
  mutations: {
    setItemList(state, itemList) {
      state.itemList = itemList;
    },
    createItem(state, item) {
      state.itemList.push(item);
    },
    deleteItem(state, itemId) {
      state.itemList = state.itemList.filter((item) => item.id !== itemId);
    },
    updateItem(state, item) {
      const index = state.itemList.findIndex((item) => item.id === item.id);
      Vue.set(state.itemList, index, item);
    }
  },
  actions: {
    fetchItems({ commit }) {
      return new Promise((resolve, reject) => {
        API.listItems()
          .then((res) => {
            const { data } = res.data;
            commit('setItemList', data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    createItem({ commit }, newItem) {
      return new Promise((resolve, reject) => {
        API.createItem(newItem)
          .then((res) => {
            commit('createItem', res.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    deleteItem({ commit }, itemId) {
      return new Promise((resolve, reject) => {
        API.deleteItem(itemId)
          .then((res) => {
            commit('deleteItem', itemId);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    updateItem({ commit }, item) {
      return new Promise((resolve, reject) => {
        API.updateItem(item)
          .then((res) => {
            commit('updateItem', res.data);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
});
