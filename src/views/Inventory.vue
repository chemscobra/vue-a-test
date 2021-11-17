<template>
  <div class="inventory">
    <ItemListSkeleton class="mt-20" v-if="loading" />
    <AlertError v-else-if="error" :error="error" />
    <div v-else>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="info"
          class="mb-4 font-weight-bold"
          large
          @click.prevent="itemFormDialog = true"
        >
          <v-icon>mdi-plus</v-icon>
          NEW ITEM
        </v-btn>
      </v-card-actions>
      <ItemList :items="itemList" @open-dialog="itemFormDialog = true" />
    </div>
    <ItemForm v-model="itemFormDialog" />
  </div>
</template>

<script>
import ItemList from '../components/ItemList.vue';
import ItemListSkeleton from '../components/ItemListSkeleton.vue';
import AlertError from '../components/AlertError.vue';
import ItemForm from '../components/forms/ItemForm.vue';

export default {
  name: 'Inventory',
  components: {
    ItemList,
    ItemListSkeleton,
    AlertError,
    ItemForm
  },
  data() {
    return {
      loading: false,
      error: null
      // dialog: false
    };
  },
  created() {
    this.fetchCategories();
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
    },
    fetchCategories() {
      this.$store.dispatch('fetchCategories').catch((err) => {
        this.error = err;
      });
    }
  },
  computed: {
    itemList() {
      return this.$store.state.itemList;
    },
    itemFormDialog: {
      get() {
        return this.$store.state.itemFormDialog;
      },
      set(value) {
        this.$store.commit('setItemFormDialog', value);
      }
    }
  }
};
</script>
