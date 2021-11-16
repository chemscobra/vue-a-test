<template>
  <v-card>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Quantity: {{ item.quantity }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-badge :color="itemStatus" offset-x="25" offset-y="25">
        <v-avatar tile size="80">
          <v-img :src="require('../assets/box.svg')"></v-img>
        </v-avatar>
      </v-badge>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text :to="`/items/${item.id}/detail`">
        Details
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({
        id: 0,
        name: 'Item Name Example',
        quantity: 0,
        status: '0'
      })
    }
  },
  computed: {
    itemStatus() {
      return this.item.status === '1' ? 'success' : 'error';
    }
  }
};
</script>
