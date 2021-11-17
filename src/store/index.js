import Vue from 'vue';
import Vuex from 'vuex';
import API from '../plugins/axios';
import _pick from 'lodash.pick';
import {
  objectKeysFromSnakeToCamelCase,
  stringSentenceToSnakeCase
} from '../utils/helpers';

Vue.use(Vuex);

const ALLOWED_KEYS = ['id', 'name', 'quantity', 'status'];

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
    itemFormDialog: false,
    userBalance: 0
  },
  mutations: {
    setUserBalance(state, balance) {
      localStorage.setItem('userBalance', balance);
      state.userBalance = balance;
    },
    decreaseUserBalance(state, amount) {
      const newBalance = parseFloat(state.userBalance) - amount;
      localStorage.setItem('userBalance', newBalance.toFixed(2));
      state.userBalance = newBalance;
    },
    increaseUserBalance(state, amount) {
      const newBalance = parseFloat(state.userBalance) + amount;
      localStorage.setItem('userBalance', newBalance.toFixed(2));
      state.userBalance = newBalance;
    },
    initializeStore(state) {
      const localUserBalance = localStorage.getItem('userBalance');
      if (localUserBalance) {
        state.userBalance = localUserBalance;
      }
    },
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
      state.itemList = state.itemList.filter(
        (item) => parseInt(item.id) !== parseInt(itemId)
      );
    },
    updateItem(state, newItem) {
      // 👀 problems with key updates
      // const index = state.itemList.findIndex((item) => parseInt(item.id) !== parseInt(itemId));
      // Vue.set(state.itemList, index, item);
      state.itemList = state.itemList.map((_item) => {
        if (_item.id === newItem.id) {
          return Object.assign({}, _item, newItem);
        }
        return _item;
      });
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
            const parsedItem = _pick(
              objectKeysFromSnakeToCamelCase(res.data),
              ALLOWED_KEYS
            );
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
            commit('deleteItem', parseInt(itemId));
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
            const parsedItem = _pick(
              objectKeysFromSnakeToCamelCase(res.data),
              ALLOWED_KEYS
            );
            commit('updateItem', parsedItem);
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
        value: id.toString(),
        iconName: stringSentenceToSnakeCase(name)
      }));
    }
  }
});
