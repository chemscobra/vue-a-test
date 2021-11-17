<template>
  <v-card>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Quantity: {{ +item.quantity || 'OUT OF STOCK' }}
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
      <v-tooltip top>
        <template #[`activator`]="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
            color="info"
            @click.prevent="$emit('edit-item', item.id)"
          >
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
        </template>
        <span>Edit This Item</span>
      </v-tooltip>
      <v-dialog v-model="deleteDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" color="error">
            <v-icon> mdi-delete </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline error" primary-title>
            Delete Item
          </v-card-title>

          <v-card-text>
            ¿Are you sure you want to delete this item?, this action cannot be
            undone.
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" outlined text @click="deleteDialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              text
              dark
              @click.prevent="$emit('delete-item', item.id)"
            >
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
  data() {
    return {
      deleteDialog: false
    };
  },
  computed: {
    itemStatus() {
      return this.item.status === '1' ? 'success' : 'error';
    }
  }
};
</script>
