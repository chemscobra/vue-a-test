<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>
      <router-link to="/">
        <v-img
          alt="Company Logo"
          class="shrink mr-2"
          contain
          :src="require('../assets/logo.svg')"
          transition="scale-transition"
          width="40"
        />
      </router-link>
    </v-toolbar-title>
    <v-spacer />
    <v-tabs
      v-model="activeTab"
      class="hidden-sm-and-down"
      color="white"
      icons-and-text
      right
      dense
      slider-size="0"
      align-with-title
    >
      <v-tab
        v-for="(item, index) in routeItems"
        :key="`tab-${index}`"
        :to="item.route"
        class="font-weight-bold"
      >
        {{ item.title }}
        <v-icon> {{ item.icon }} </v-icon>
      </v-tab>
    </v-tabs>
    <v-tab-item
      v-for="(item, index) in routeItems"
      :id="item.route"
      :key="`tab-item-${index}`"
      class="hidden-sm-and-down"
    >
      <router-view v-if="activeTab === item.route" />
    </v-tab-item>
    <v-spacer></v-spacer>
    <v-chip
      color="info"
      class="text-no-wrap font-weight-bold text-h5 mr-10 px-10"
      dark
      large
    >
      <v-avatar left>💰</v-avatar>
      {{ $store.state.userBalance }}
    </v-chip>
    <v-spacer></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      activeTab: '',
      routeItems: [
        {
          title: 'Home',
          route: '/',
          icon: 'mdi-home'
        },
        {
          title: 'Inventory',
          route: '/inventory',
          icon: 'mdi-storefront'
        }
      ]
    };
  }
};
</script>
