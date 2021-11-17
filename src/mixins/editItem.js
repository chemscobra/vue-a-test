export default {
  toEditItem: {
    set(newValue) {
      this.$store.commit('setToEditItem', newValue);
    },
    get() {
      return this.$store.state.toEditItem;
    }
  },
  editedItemIndex: {
    set(newValue) {
      this.$store.commit('setEditedItemIndex', newValue);
    },
    get() {
      return this.$store.state.editedItemIndex;
    }
  }
};
