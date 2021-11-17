<template>
  <v-card class="overflow-y-visible" elevation="0">
    <v-row dense>
      <v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="3">
        <ItemCard
          :item="item"
          @edit-item="editItem"
          @delete-item="deleteItem"
          @sell-item="sellItem"
          @buy-item="buyItem"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const taxRate = 0.78;
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
        this.$store.commit('setEditedItemIndex', parseInt(itemId));
        this.$store.commit('setItemFormDialog', true);
      } catch (error) {
        this.error = error;
      }
    },
    async deleteItem(itemId) {
      try {
        await this.$store.dispatch('deleteItem', itemId);
      } catch (error) {
        this.error = error;
      }
    },
    async sellItem({ itemId, quantityToSell }) {
      const _qToSell = parseInt(quantityToSell);
      try {
        const { data } = await this.$API.getItem(itemId);
        const newQuantity = parseInt(data.quantity) - _qToSell;
        const subTotal = parseFloat(data.priceTaxExcluded) * _qToSell;
        const tax = subTotal * taxRate;
        const total = subTotal - tax;
        data.quantity = newQuantity.toString();
        await this.$store.dispatch('updateItem', data);
        this.$store.commit('increaseUserBalance', total);
      } catch (error) {
        this.error = error;
      }
    },
    async buyItem({ itemId, quantityToBuy }) {
      const _qToBuy = parseInt(quantityToBuy);
      try {
        const { data } = await this.$API.getItem(itemId);
        const newQuantity = parseInt(data.quantity) + _qToBuy;
        const subTotal = parseFloat(data.priceTaxExcluded) * _qToBuy;
        const tax = subTotal * taxRate;
        const total = subTotal + tax;
        data.quantity = newQuantity.toString();
        await this.$store.dispatch('updateItem', data);
        this.$store.commit('decreaseUserBalance', total);
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>
