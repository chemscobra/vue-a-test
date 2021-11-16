<template>
  <v-app>
    <TheAppBarVue />
    <v-main>
      <centered>
        <router-view />
      </centered>
    </v-main>
  </v-app>
</template>

<script>
import Centered from './components/layouts/Centered.vue';
import TheAppBarVue from './components/TheAppBar.vue';
export default {
  name: 'App',
  components: {
    Centered,
    TheAppBarVue
  },
  data: () => ({
    //
  })
};
</script>
