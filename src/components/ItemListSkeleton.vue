<template>
  <v-row dense>
    <v-col v-for="index in 10" :key="`sk-${index}`" cols="12" sm="6" md="4">
      <v-skeleton-loader
        min-width="200"
        max-height="100"
        type="card"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
</template>
