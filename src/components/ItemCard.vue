<template>
  <v-card>
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ item.name }}
        </v-list-item-title>
        <v-list-item-subtitle>
          Quantity: {{ parseInt(item.quantity) || 'OUT OF STOCK' }}
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
            <v-btn color="error" text dark @click.prevent="emitDelete">
              Delete
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="buyDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="$store.state.userBalance >= 0"
            icon
            v-bind="attrs"
            v-on="on"
            color="info"
          >
            <v-icon color="info"> mdi-arrow-down </v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline error" primary-title>
            Buy Item
          </v-card-title>

          <v-card-text>
            <v-text-field
              class="ma-6"
              v-model="quantityToBuy"
              label="Quantity To Buy"
              outlined
              dense
              type="number"
              min="5"
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" outlined text @click="buyDialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info" text dark @click.prevent="emitBuy"> Buy </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="sellDialog" width="500">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="parseInt(item.quantity) > 0"
            icon
            v-bind="attrs"
            v-on="on"
            color="success"
          >
            <v-icon color="success"> mdi-arrow-up </v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-title class="headline error" primary-title>
            Sell Item
          </v-card-title>

          <v-card-text>
            <v-text-field
              class="ma-6"
              v-model="quantityToSell"
              label="Quantity To Sell"
              outlined
              dense
              type="number"
              min="5"
            ></v-text-field>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn color="primary" outlined text @click="sellDialog = false">
              Cancel
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="success" text dark @click.prevent="emitSell">
              Sell
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
      deleteDialog: false,
      buyDialog: false,
      quantityToBuy: 0,
      sellDialog: false,
      quantityToSell: 0
    };
  },
  computed: {
    itemStatus() {
      return this.item.status === '1' ? 'success' : 'error';
    }
  },
  methods: {
    emitSell() {
      this.$emit('sell-item', {
        itemId: this.item.id,
        quantityToSell: this.quantityToSell
      });
      this.quantityToSell = 0;
      this.sellDialog = false;
    },
    emitBuy() {
      this.$emit('buy-item', {
        itemId: this.item.id,
        quantityToBuy: this.quantityToBuy
      });
      this.quantityToBuy = 0;
      this.buyDialog = false;
    },
    emitDelete() {
      this.$emit('delete-item', this.item.id);
      this.deleteDialog = false;
    }
  }
};
</script>
