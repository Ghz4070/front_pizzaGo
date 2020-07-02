<template>
  <v-row>
    <v-col
      v-bind:class="{ hidden: pizzas.length < 0 }"
      cols="12"
      sm="12"
      md="12"
      v-for="category in categories"
      :key="category.id"
    >
      <div class="category pacifico-font">{{ category.name }}</div>
      <v-divider style="margin:0 15px"></v-divider>
      <!-- load spinner -->
      <div v-if="pizzas.length == 0" class="center">
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
      </div>
      <v-row>
        <v-col
          v-for="(pizza, index) in pizzas"
          :key="pizza.id"
          v-bind:class="{ hidden: category.name != pizza.category.name }"
          cols="12"
          sm="4"
        >
          <v-card outlined class="ma-3 pa-3 card_pizza" max-width="400">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-img
                  v-bind="attrs"
                  v-on="on"
                  height="200px"
                  class="white--text align-end"
                  :src="pizza.img"
                ></v-img>
              </template>
              Sauce : <span v-for="compo in pizza.composition.sauces.items" :key="compo.label">{{ compo + ' ' }}</span>
              <br />
              Fromages :<span v-for="compo in pizza.composition.fromages.items" :key="compo.label"> {{ compo+ ' ' }}</span>
              <br />
              Viandes :<span v-for="compo in pizza.composition.viandes.items" :key="compo.label"> {{ compo+ ' ' }}</span>
              <br />
              Legumes :<span v-for="compo in pizza.composition.legumes.items" :key="compo.label"> {{ compo+ ' ' }}</span>
              <br />
              Epices :<span v-for="compo in pizza.composition.epices.items" :key="compo.label"> {{ compo+ ' ' }}</span>
            </v-tooltip>

            <v-card-subtitle class="pb-0 pizza_name pacifico-font">{{ pizza.name }}</v-card-subtitle>

            <v-card-text class="text--primary center">
              <v-select
                :change="updatePrice(index,pizza.quantity, pizza.price, pizza.size)"
                v-model="pizza.size"
                :items="size"
                label="Taille"
              ></v-select>
              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field v-model="pizza.quantity" type="number" label="x1" value="1" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field disabled label :value="pizza.price+ ' €'" solo></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions class="center">
              <v-btn
                v-on:click="addToCart(pizza)"
                @click="pizza_toast.snackbar = true"
                small
                class="ma-2"
                outlined
                color="indigo"
              >Ajouter</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-col>
    <v-snackbar v-model="pizza_toast.snackbar">
      {{ pizza_toast.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="pizza_toast.snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      pizza_toast: { snackbar: false, text: "Pizza ajouté au panier" },
      pizzas: [],
      categories: null,
      size: ["S", "M", "L", "XL"],
      add: { quantity: 1, size: "M", price: "10" },
      model: {
        contents: {
          pizzas: [],
          drinks: [],
          desserts: []
        }
      }
    };
  },
  async mounted() {
    await this.getCategories();
    await this.getPizzas();
    this.displayItemOnCart();
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
      console.log(this.pizzas);
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
    addToCart(pizza) {
      let cart = this.getUserCart();
      // adding as much pizza as the quantity sent
      for (let i = 0; i < pizza.quantity; i++) {
        cart.contents.pizzas = [...cart.contents.pizzas, pizza];
      }
      localStorage.setItem("datas", JSON.stringify(cart));
      this.$emit("changeLocalStorage");
      //this.setTotalPrice(cart);
    },
    setTotalPrice(cart) {
      let price = 0;
      cart.contents.pizzas.forEach(element => {
        price += element.price;
      });
      console.log(price);
      cart.total_price = price;
      localStorage.setItem("datas", JSON.stringify(cart));
      this.$emit("changeLocalStorage");
    },
    getUserCart() {
      // check if data existing or not in current local storage
      return JSON.parse(localStorage.getItem("datas"))
        ? JSON.parse(localStorage.getItem("datas"))
        : this.model;
    },
    displayItemOnCart() {
      let content = this.getUserCart();
      let pizzas = content.contents.pizzas.length;
      let drinks = content.contents.drinks.length;
      let desserts = content.contents.desserts.length;
      if (pizzas > 0 || desserts > 0 || drinks > 0)
        this.$emit("changeLocalStorage");
    }
  }
};
</script>

<style>
.center {
  text-align: center;
  display: block !important;
  margin-left: auto;
  margin-right: auto;
}
.category {
  margin-left: 10px;
  font-size: 26px;
  font-family: cursive;
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
.v-card__subtitle {
  padding: 0px;
}
.v-progress-circular {
  margin: 1rem;
}
.hidden {
  display: none;
}
</style>