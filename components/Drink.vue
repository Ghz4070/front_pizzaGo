<template>
  <v-row  no-gutters>
          <v-col cols="12" sm="12" >
            <div class="category">Boissons</div>
            <v-col v-for="(drink, index) in drinks" :key="drink.id" cols="12" sm="4">
              <v-card
                outlined
                class="ma-3 pa-3 card_pizza"
                max-width="400"
              >
                <v-img
                  height="200px"
                  class="white--text align-end"
                  src="https://img2.freepng.fr/20180927/ju/kisspng-coca-cola-car-product-design-5baca128a41f25.6167852015380401046723.jpg"
                ></v-img>

                <v-card-subtitle class="pb-0 pizza_name">{{ drink.name }}</v-card-subtitle>

                <v-card-text class="text--primary center">
                  <!-- <v-select
                    :change="updatePrice(index,pizza.quantity, pizza.price, pizza.size)"
                    v-model="pizza.size"
                    :items="size"
                    label="Taille"
                  ></v-select>
                  <v-row>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field
                        v-model="drink.quantity"
                        type="number"
                        label="x1"
                        value="1"
                        solo
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="6">
                      <v-text-field disabled label :value="drink.price+ ' €'" solo></v-text-field>
                    </v-col>
                  </v-row> -->
                </v-card-text>

                <v-card-actions class="center">
                  <v-btn
                    v-on:click="addToCart(drink)"
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
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      drinks: [],
      model: {
        promo: null,
        total_price:null,
        contents: {
          pizzas: [],
          drinks: [],
          desserts: []
        }
      }
    };
  },
  async mounted() {
    await this.getDrinks();
    this.formatDatas(this.drinks);
  },
  methods: {
    getDrinks() {
      return axios
        .get(`http://localhost:4000/api/v1/drink`)
        .then(res => {
          this.drinks = res.data.result;
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
      this.drink[i].price = new_price;
    },
    formatDatas: function(drinks) {
      this.drinks = [];
      drinks.forEach(element => {
        let el = Object.assign(element, this.add);
        this.drinks = [...this.drinks, el];
      });
    },
    addToCart(pizza) {
      let cart = this.getUserCart();
      // adding as much pizza as the quantity sent
      for(let i = 0; i<pizza.quantity; i++) {
        cart.contents.pizzas = [...cart.contents.pizzas, pizza];
      };
      this.setTotalPrice(cart);
    },
    setTotalPrice(cart) {
      let price = 0;
      cart.contents.pizzas.forEach(element => {
        price += element.price
      });
      console.log(price);
      cart.total_price = price;
      localStorage.setItem('datas',JSON.stringify(cart));
    },
    getUserCart() {
      // check if data existing or not in current local storage
      return  JSON.parse(localStorage.getItem('datas')) ? JSON.parse(localStorage.getItem('datas')) : this.model;
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
  font-size: 26px;
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
.v-card__subtitle {
  padding: 0px;
}
</style>