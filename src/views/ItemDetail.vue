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
import { stringSentenceToSnakeCase } from '../utils/helpers';
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
  async mounted() {
    this.loading = true;
    await this.fetchCategories();
    await this.fetchItem(this.itemId);
    this.loading = false;
  },
  computed: {
    categories() {
      return this.$store.state.categoryList;
    },
    categoryName() {
      return (
        this.categories.find(({ id }) => +id === +this.item.categoryId)?.name ||
        'unknown'
      );
    },
    categoryImgSrc() {
      const snakeCaseCategoryName = stringSentenceToSnakeCase(
        this.categoryName
      );
      try {
        return require(`../assets/category_icons/${snakeCaseCategoryName}.png`);
      } catch (e) {
        return require('../assets/category_icons/unknown.png');
      }
    }
  },
  methods: {
    async fetchCategories() {
      if (this.$store.state.categoryList.length) return;
      try {
        await this.$store.dispatch('fetchCategories');
      } catch (error) {
        this.error = error;
      }
    },
    async fetchItem(itemId) {
      try {
        const { data } = await this.$API.getItem(itemId);
        this.item = data;
      } catch (error) {
        this.error = error;
      }
    }
  }
};
</script>
