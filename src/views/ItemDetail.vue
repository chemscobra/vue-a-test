<template>
  <div>
    <VSkeletonLoader
      v-if="loading"
      min-width="500"
      max-width="500"
      type="card"
    />
    <AlertError v-else-if="error" :error="error" />
    <ItemDetailCard v-else :item="{ ...item, categoryName, categoryImgSrc }" />
  </div>
</template>

<script>
import { parseStringToSnakeCase } from '../utils/helpers';
import ItemDetailCard from '../components/ItemDetailCard.vue';
import AlertError from '../components/AlertError.vue';
export default {
  name: 'ItemDetail',
  components: {
    ItemDetailCard,
    AlertError
  },
  props: {
    itemId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      item: {},
      loading: false,
      error: null
    };
  },
  created() {
    this.fetchCategories();
    this.fetchItem(this.itemId);
  },
  computed: {
    categories() {
      return this.$store.state.categoryList || [];
    },
    categoryName() {
      return (
        this.categories.find(({ id }) => +id === +this.item.categoryId)?.name ||
        'unknown'
      );
    },
    categoryImgSrc() {
      const snakeCaseCategoryName = parseStringToSnakeCase(this.categoryName);
      try {
        return require(`../assets/category_icons/${snakeCaseCategoryName}.png`);
      } catch (e) {
        return require('../assets/category_icons/unknown.png');
      }
    }
  },
  methods: {
    fetchCategories() {
      if (!this.$store.state.categoryList) {
        this.loading = true;
        this.$store
          .dispatch('fetchCategories')
          .catch((err) => {
            this.error = err;
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    fetchItem(itemId) {
      this.loading = true;
      this.$API
        .getItem(itemId)
        .then(({ data }) => {
          this.item = data;
        })
        .catch((err) => {
          this.error = err;
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
