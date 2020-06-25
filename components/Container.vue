<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-container>

        <v-tabs class="tabs" @change="changeTab(currentTab)" centered v-model="currentTab" background-color="white" color="black">
          <v-tab  v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <!-- PIZZA -->
        <div v-if="currentTab == 0">
          <Pizza />
        </div>
        <!-- Boisson -->
        <div v-if="currentTab == 1">
          <Drink />
        </div>

        <!-- Dessert -->
        <div v-if="currentTab == 2">
          <Dessert />
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import Pizza from './Pizza';
import Drink from './Drink';
import Dessert from './Dessert';

export default {
  components : {
    Pizza,
    Dessert,
    Drink
  },
  data: function() {
    return {
      currentTab: 0,
      items: [
        { tab: "Pizza" },
        { tab: "Boisson" },
        { tab: "Dessert" }
      ]
    };
  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    },
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
div {
  font-family: "Pacifico", cursive;
}
</style>