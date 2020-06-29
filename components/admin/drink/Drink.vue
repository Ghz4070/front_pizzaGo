<template>
  <v-container fluid>
    <v-row>
      <!-- <AddDrink /> -->
    </v-row>
    <v-row dense>
      <v-col v-for="(drink, index) in drinks" :key="index" cols="12" sm="12" md="4">
        <div v-if="loading" class="center">
          <v-skeleton-loader
            class="mt-6"
            max-width="400"
            elevation="6"
            type="card"
            transition="scale-transition"
          ></v-skeleton-loader>
        </div>
        <div v-else>
          <v-card outlined class="ma-3 pa-3 card_pizza" elevation="6" max-width="400">
            <v-img
              :src="drink.img"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title>{{ drink.name }} {{ drink.oz | volumeSign}} - {{ drink.price | euroSign }}</v-card-title>
            </v-img>
            <v-card-actions>
              <v-spacer></v-spacer>

              <EditDrink :dataDrink="drink" />

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
import EditDrink from "./EditDrink";

export default {
  name: "Drink",
  components: {
    EditDrink
  },
  data: () => {
    return {
      loading: true,
      drinks: Object
    };
  },
  mounted() {
    this.getDrink();

    if (this.drinks != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 750);
    } else {
      alert("Erreur de chargement");
    }
  },
  methods: {
    async getDrink() {
      return await this.$axios
        .get("http://localhost:4000/api/v1/drink")
        .then(res => {
          this.drinks = res.data.result;
          // console.log(this.drinks);
        })
        .catch(e => {
          console.log("catch");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
