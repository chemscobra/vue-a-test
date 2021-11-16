<template>
  <div class="inventory">
    <ItemListSkeleton v-if="loading" />
    <ItemListError v-else-if="error" :error="error" />
    <ItemList v-else :items="itemList" />
  </div>
</template>

<script>
import ItemList from '../components/ItemList.vue';
import ItemListSkeleton from '../components/ItemListSkeleton.vue';
import ItemListError from '../components/ItemListError.vue';
export default {
  name: 'Inventory',
  components: {
    ItemList,
    ItemListSkeleton,
    ItemListError
  },
  data() {
    return {
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    fetchItems() {
      if (!this.$store.state.itemList) {
        this.loading = true;
        this.$store
          .dispatch('fetchItems')
          .catch((err) => {
            this.error = err;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  },
  computed: {
    itemList() {
      return this.$store.state.itemList;
    }
  }
};
</script>
