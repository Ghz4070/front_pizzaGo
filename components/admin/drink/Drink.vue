<template>
  <v-container fluid>
    <v-row>
      <!-- <AddDrink /> -->
    </v-row>
    <v-row dense>
      <v-col v-for="(pizza, index) in pizzas" :key="index" cols="12" sm="12" md="4">
        <div v-if="loading" class="center">
          <v-skeleton-loader
            class="mx-auto"
            max-width="400"
            elevation="6"
            type="card"
            transition="scale-transition"
          ></v-skeleton-loader>
        </div>
        <div v-else>
          <v-card outlined class="ma-3 pa-3 card_pizza" elevation="6" max-width="400">
            <v-img
              :src="pizza.img"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="pizza.name"></v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <EditPizza :dataPizza="pizza" /> -->
              <v-btn icon class="ml-3">
                <v-icon>mdi-trash-can</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Drink",
  // components: {
  //   AddDrink,
  //   EditDrink
  // },
  data: () => {
    return {
      loading: true
    };
  },
  mounted() {
    if (this.pizzas != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 750);
    } else {
      alert("Erreur de chargement");
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
