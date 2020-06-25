<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-container>

        <v-tabs class="tabs" @change="changeTab(currentTab)" centered v-model="currentTab" background-color="white" color="black">
          <v-tab  v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <!-- PIZZA -->
        <v-row v-if="currentTab == 0" no-gutters>
          <v-col cols="12" sm="12" v-for="category in categories" :key="category.id">
            <div class="category">Catégorie : {{ category.name }}</div>
            <v-col v-for="(pizza, index) in pizzas" :key="pizza.id" cols="12" sm="4">
              <v-card
                v-if="category.name == pizza.category.name"
                outlined
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
                  <v-select
                    :change="updatePrice(index,pizza.quantity, pizza.price, pizza.size)"
                    v-model="pizza.size"
                    :items="size"
                    label="Taille"
                  ></v-select>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        @change="updatePrice(index,pizza.quantity, pizza.price, pizza.size)"
                        v-model="pizza.quantity"
                        type="number"
                        label="x1"
                        value="1"
                        solo
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field disabled label :value="pizza.price+ ' €'" solo></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-card-actions class="center">
                  <v-btn
                    v-on:click="addToCart(pizza)"
                    small
                    class="ma-2"
                    outlined
                    color="indigo"
                  >Ajouter</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-col>
        </v-row>

        <!-- Boisson -->
        <div v-if="currentTab == 1" class="">
          Boisson work !
        </div>

        <!-- Ingredient -->
        <div v-if="currentTab == 2">
          Ingredient Work !
        </div>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: function() {
    return {
      currentTab: 0,
      pizzas: [],
      categories: null,
      size: ["S", "M", "L", "XL"],
      add: { quantity: 1, size: "M", price: "10" },
      items: [
        { tab: "Pizza", content: "1" },
        { tab: "Boisson", content: "2" },
        { tab: "Dessert", content: "3" }
      ]
    };
  },
  async mounted() {
    await this.getCategories();
    await this.getPizzas();
    this.formatDatas(this.pizzas);
  },
  methods: {
    getPizzas() {
      return axios
        .get(`http://localhost:4000/api/v1/pizza`)
        .then(res => {
          this.pizzas = res.data.result;
        })
        .catch(e => {
          console.log("catch");
        });
    },
    updatePrice(i, nb, price, size) {
      let new_price;
      switch (size) {
        case "S":
          new_price = nb * 8;
          break;
        case "M":
          new_price = nb * 10;
          break;
        case "L":
          new_price = nb * 12;
          break;
        case "XL":
          new_price = nb * 15;
          break;
        default:
          break;
      }
      this.pizzas[i].price = new_price;
    },
    formatDatas: function(pizzas) {
      this.pizzas = [];
      pizzas.forEach(element => {
        let el = Object.assign(element, this.add);
        this.pizzas = [...this.pizzas, el];
      });
    },
    getCategories() {
      return axios
        .get(`http://localhost:4000/api/v1/category`)
        .then(res => {
          this.categories = res.data.result;
        })
        .catch(e => {
          console.log("catch");
        });
    },
    changeTab(val) {
      this.currentTab = val;
      console.log(val);
    },
    addToCart(pizza) {
      console.log(pizza);
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
div {
  font-family: "Pacifico", cursive;
}
.v-sheet.v-card {
  border-radius: 30px;
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
.v-card__text {
  padding: 0 16px;
}
.v-card__actions {
  padding: 0;
}
.card_pizza {
  border: 0 !important;
}
.tabs {
  padding-bottom: 30px;
}
</style>