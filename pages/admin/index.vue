<template>
  <v-row>
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-tabs
          dark
          @change="changeTab(currentTab)"
          centered
          v-model="currentTab"
          background-color="deep-orange"
          color="deep-orange lighten-5"
          class="elevation-6"
          grow
        >
          <v-tab v-for="(item, index) in items" :key="index">{{ item.tab }}</v-tab>
        </v-tabs>
        <!-- User -->
        <div v-if="currentTab == 0">
          <Order />
        </div>
        <!-- User -->
        <div v-if="currentTab == 1">
          <User />
        </div>
        <!-- PIZZA -->
        <div v-if="currentTab == 2">
          <Pizza />
        </div>
        <!-- Boisson -->
        <div v-if="currentTab == 3">
          <Drink />
        </div>
        <!-- Dessert -->
        <div v-if="currentTab == 4">
          <Dessert />
        </div>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
import Pizza from "@/components/admin/pizza/Pizza";
import Drink from "@/components/admin/drink/Drink";
import Dessert from "@/components/admin/dessert/Dessert";
import User from "@/components/admin/user/User";
import Order from "@/components/admin/order/Order";

export default {
  components: {
    Pizza,
    Drink,
    Dessert,
    User,
    Order
  },
  data: function() {
    return {
      currentTab: 0,
      items: [
        { tab: "Commandes" },
        { tab: "Utilisateurs" },
        { tab: "Pizza" },
        { tab: "Boisson" },
        { tab: "Dessert" }
      ],
      boolCart: false
    };
  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
