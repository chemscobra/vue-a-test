<template>
  <v-card class="overflow-y-visible" elevation="0">
    <v-row dense>
      <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="3">
        <ItemCard
          :item="item"
          @edit-item="editItem"
          @delete-item="deleteItem"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import ItemCard from './ItemCard.vue';
export default {
  name: 'ItemList',
  components: {
    ItemCard
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async editItem(itemId) {
      try {
        const { data } = await this.$API.getItem(itemId);
        this.$store.commit('setToEditItem', data);
        this.$store.commit('setEditedItemIndex', +itemId);
        this.$store.commit('setItemFormDialog', true);
      } catch (error) {
        this.error = error;
      }
    },
    async deleteItem(itemId) {
      try {
        await this.$store.dispatch('deleteItem', itemId);
        await this.$store.dispatch('fetchItems');
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>
