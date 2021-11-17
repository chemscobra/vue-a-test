<template>
  <v-card class="mx-auto my-12" max-width="500">
    <v-img height="250" contain :src="item.categoryImgSrc"></v-img>

    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-text>
      <v-chip color="teal" dark>{{ item.categoryName }}</v-chip>
    </v-card-text>

    <v-card-text>
      <h2 class="my-2">Price (Tax Excluded): ${{ item.priceTaxExcluded }}</h2>

      <div>
        {{ item.description }}
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title
      >Quantity: {{ +item.quantity || 'OUT OF STOCK' }}</v-card-title
    >
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
