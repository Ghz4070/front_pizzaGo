<template>
  <v-row>
    <v-col cols="12" sm="12" md="9">
    <v-card class="mx-auto" outlined>

        <v-tabs class="tabs" @change="changeTab(currentTab)" centered v-model="currentTab" background-color="white" color="black">
          <v-tab  v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <!-- PIZZA -->
        <div v-if="currentTab == 0">
          <Pizza @changeLocalStorage="changeLocalStorage"/>
        </div>
        <!-- Boisson -->
        <div v-if="currentTab == 1">
          <Drink @changeLocalStorage="changeLocalStorage"/>
        </div>

        <!-- Dessert -->
        <div v-if="currentTab == 2">
          <Dessert @changeLocalStorage="changeLocalStorage"/>
        </div>
    </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="3">
      <Cart :boolStorage="boolCart"/>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import Pizza from './Pizza';
import Drink from './Drink';
import Dessert from './Dessert';
import Cart from './Cart';

export default {
  components : {
    Pizza,
    Dessert,
    Drink,
    Cart
  },
  data: function() {
    return {
      currentTab: 0,
      items: [
        { tab: "Pizza" },
        { tab: "Boisson" },
        { tab: "Dessert" }
      ],
      boolCart : false,
    };
  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    },
    changeLocalStorage() {
      this.boolCart = true;
      setTimeout(() => this.boolCart = false, 1000);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
div {
  font-family: "Pacifico", cursive;
}
</style>