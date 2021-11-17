<template>
  <div class="home">
    <h1>
      Welcome to the Funny Inventory System Click on the button below to get
      started
    </h1>
    <v-btn
      color="indigo lighten-2"
      dark
      block
      to="/inventory"
      class="font-weight-bold"
      x-large
    >
      TO THE INVENTORY!
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home'
};
</script>
