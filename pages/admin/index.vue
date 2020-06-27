<template>
  <v-row>
    <v-container>
      <v-card class="mx-auto" outlined>
        <v-tabs
          class="tabs"
          @change="changeTab(currentTab)"
          centered
          v-model="currentTab"
          background-color="white"
          color="black"
        >
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>
        <!-- PIZZA -->
        <div v-if="currentTab == 0">
          <Pizza />
        </div>
        <!-- Boisson -->
        <div v-if="currentTab == 1">
          <!-- <Drink /> -->
        </div>
        <!-- Dessert -->
        <div v-if="currentTab == 2">
          <!-- <Dessert /> -->
        </div>
      </v-card>
    </v-container>
  </v-row>
</template>

<script>
import Pizza from "@/components/admin/pizza/Pizza";

export default {
  components: {
    Pizza
  },
  data: function() {
    return {
      currentTab: 0,
      items: [{ tab: "Pizza" }, { tab: "Boisson" }, { tab: "Dessert" }],
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
