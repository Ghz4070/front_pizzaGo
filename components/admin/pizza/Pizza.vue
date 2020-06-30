<template>
  <v-container fluid>
    <v-row>
      <AddPizza />
    </v-row>
    <v-row>
      <v-col
        v-for="(pizza, index) in pizzas"
        :key="index"
        cols="12"
        xl="3"
        lg="4"
        md="6"
        sm="12"
        align="center"
      >
        <v-skeleton-loader
          v-if="loading"
          class="mt-6"
          max-width="400"
          elevation="6"
          type="card"
          transition="scale-transition"
        ></v-skeleton-loader>

        <v-hover v-else>
          <template v-slot="{ hover }">
            <v-card
              outlined
              class="ma-3 pa-3 card_pizza transition-swing"
              :class="`elevation-${hover ? 24 : 6}`"
              max-width="400"
            >
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

                <EditPizza :dataPizza="pizza" />

                <v-btn icon class="ml-3" @click="deletePizza(pizza.id)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AddPizza from "@/components/admin/pizza/AddPizza";
import EditPizza from "@/components/admin/pizza/EditPizza";
import axios from "axios";

export default {
  name: "Pizza",
  components: {
    AddPizza,
    EditPizza
  },
  data: () => {
    return {
      pizzas: [],
      loading: true
    };
  },
  async mounted() {
    await this.getPizzas();

    if (this.pizzas != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 750);
    } else {
      alert("Erreur de chargement");
    }
  },
  methods: {
    getPizzas() {
      return axios
        .get("http://localhost:4000/api/v1/pizza")
        .then(res => {
          this.pizzas = res.data.result;
          console.log(pizzas);
        })
        .catch(e => {
          console.log("catch");
        });
    },
    deletePizza(id) {
      this.$axios
        .delete(`http://localhost:4000/api/v1/admin/pizza/delete/${id}`, {
          headers: {
            "x-access-token":
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjpbIlJPTEVfVVNFUiIsIlJPTEVfQURNSU4iXSwiZW1haWwiOiJpLmdoZXphbEBlY29sZS1pcHNzaS5uZXQiLCJpZCI6ImNrYnpxdW51MzAxeDQwOTI4NDFteGwxdjgiLCJpYXQiOjE1OTM0Njg0NDUsImV4cCI6MTU5MzU1NDg0NX0.xj2Ylaa82KMNYdgl8nWD4Tca6nmkVqRc1QMxAeU0Bv4"
          }
        })
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
