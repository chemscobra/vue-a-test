<template>
  <div>
    <h2>This is the item detail page {{ itemId }}</h2>
  </div>
</template>

<script>
export default {
  name: 'ItemDetail',
  props: {
    itemId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      show: false
    };
  }
};
</script>
