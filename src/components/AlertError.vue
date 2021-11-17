<template>
  <v-alert border="right" colored-border type="error" elevation="2" prominent>
    <h3>
      {{ error.toString() }}
    </h3>
  </v-alert>
</template>

<script>
export default {
  name: 'ItemListError',
  props: {
    error: {
      type: Object,
      required: true
    }
  }
};
</script>
