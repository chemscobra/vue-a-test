import Vue from 'vue';
import Vuex from 'vuex';
import API from '../plugins/axios';

import { objectKeysFromSnakeToCamelCase } from '../utils/helpers';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    itemList: null,
    categoryList: [],
    editedItemIndex: -1,
    toEditItem: {
      name: '',
      description: '',
      quantity: '',
      categoryId: '',
      priceTaxExcluded: 0,
      status: '0'
    },
    itemFormDialog: false
  },
  mutations: {
    setItemList(state, itemList) {
      state.itemList = itemList;
    },
    setToEditItem(state, toEditItem) {
      state.toEditItem = toEditItem;
    },
    setItemFormDialog(state, itemFormDialog) {
      state.itemFormDialog = itemFormDialog;
    },
    setEditedItemIndex(state, editedItemIndex) {
      state.editedItemIndex = editedItemIndex;
    },
    setCategoryList(state, categoryList) {
      state.categoryList = categoryList;
    },
    createItem(state, item) {
      state.itemList.unshift(item);
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
    fetchCategories({ commit }) {
      return new Promise((resolve, reject) => {
        API.listCategories()
          .then((res) => {
            commit('setCategoryList', res.data);
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
            const parsedItem = objectKeysFromSnakeToCamelCase(res.data);
            commit('createItem', parsedItem);
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
            commit('deleteItem', +itemId);
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
  },
  getters: {
    getCategoryList(state) {
      return state.categoryList;
    },
    getCategoryListForVSelect(state) {
      return state.categoryList.map(({ id, name }) => ({
        text: name,
        value: id.toString()
      }));
    }
  }
});
