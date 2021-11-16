<template>
  <v-row dense>
    <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="4">
      <ItemCard :item="item" />
    </v-col>
  </v-row>
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
  }
};
</script>
