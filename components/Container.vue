<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" sm="12" v-for="category in categories" :key="category.id">
            <div class="category">Catégorie : {{ category.name }}</div>
            <v-col v-for="pizza in pizzas" :key="pizza.id" cols="12" sm="4">
              <v-card
                v-if="category.name == pizza.category.name"
                outlined=""
                class="ma-3 pa-3 card_pizza"
                max-width="400"
              >
                <v-img
                  height="200px"
                  class="white--text align-end"
                  src="https://camionapizzaangouleme.files.wordpress.com/2018/02/pizza-free-png-image.png?w=1200"
                ></v-img>

                <v-card-subtitle class="pb-0 pizza_name">{{ pizza.name }}</v-card-subtitle>

                <v-card-text class="text--primary center">
                  <v-select v-model="size[1]" :items="size" label="Taille"></v-select>

                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field type="number" label="x1" value="1" solo></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field disabled label="" value="20 €" solo></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions class="center">
                  <v-btn small class="ma-2" outlined color="indigo">Ajouter</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      pizzas: null,
      categories: null,
      size: ["S", "M", "L", "XL"]
    };
  },
  mounted() {
    this.getCategories();
    this.getPizzas();
  },
  methods: {
    getPizzas() {
      return axios
        .get(`http://localhost:4000/api/v1/pizza`)
        .then(res => {
          this.pizzas = res.data.result;
          console.log(this.pizzas);
        })
        .catch(e => {
          console.log("catch");
          error({ statusCode: 404, message: "Pizza non trouvé" });
        });
    },
    getCategories() {
      return axios
        .get(`http://localhost:4000/api/v1/category`)
        .then(res => {
          this.categories = res.data.result;
          console.log(this.categories);
        })
        .catch(e => {
          console.log("catch");
          error({ statusCode: 404, message: "Catégorie non trouvé" });
        });
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
div {
  font-family: "Pacifico", cursive;
}
.center {
  text-align: center;
  display: block !important;
}
.category {
  font-size: 2em;
}
.v-image__image--cover {
  background-size: contain;
}
.pizza_name {
  text-align: center;
  font-size: 20px;
}
.v-card__text{
  padding: 0 16px;
}
.v-card__actions {
    padding: 0;
}
.card_pizza {
  border: 0 !important;
}
</style>