<template>
  <v-row no-gutters>
    <v-col v-for="(dessert, index) in desserts" :key="dessert.id" cols="12" sm="4" md="4" lg="4">
      <v-card outlined class="ma-3 pa-3 card_pizza" max-width="400">
        <v-img height="200px" class="white--text align-end mbot15" :src="dessert.img"></v-img>

        <v-card-subtitle class="pb-0 pizza_name">
          {{
          dessert.name
          }}
        </v-card-subtitle>
        <v-card-text class="text--primary center">
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-on:input="updatePrice(index, dessert.quantity, dessert.price)"
                v-model="dessert.quantity"
                type="number"
                label="x1"
                value="1"
                solo
              ></v-text-field>
            </v-col>
            <v-col v-if="hackReload" cols="12" sm="6" md="6">
              <v-text-field disabled label :value="dessert.price + ' €'" solo></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-card-actions class="center">
          <v-btn
            v-on:click="addToCart(dessert)"
            @click="dessert_toast.snackbar = true"
            small
            class="ma-2"
            outlined
            color="indigo"
          >Ajouter</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <v-snackbar v-model="dessert_toast.snackbar">
      {{ dessert_toast.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="dessert_toast.snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      hackReload: true,
      dessert_toast: { snackbar: false, text: "Dessert ajouté au panier" },
      desserts: [],
      add: { quantity: 1 },
      model: {
        promo: null,
        total_price: 0,
        contents: {
          pizzas: [],
          desserts: [],
          drinks: []
        }
      }
    };
  },
  async mounted() {
    await this.getDrinks();
    this.formatDatas(this.desserts);
  },
  methods: {
    getDrinks() {
      return axios
        .get(`https://server-api-pizzago.herokuapp.com/api/v1/dessert`)
        .then(res => {
          this.desserts = res.data.result;
        })
        .catch(e => {
          console.log("catch");
        });
    },
    updatePrice(i, nb, price) {
      this.hackReload = false;
      let new_price;
      new_price = nb * price;
      this.desserts[i].price = new_price;
      this.hackReload = true;
    },
    formatDatas: function(desserts) {
      this.desserts = [];
      desserts.forEach(element => {
        let el = Object.assign(element, this.add);
        this.desserts = [...this.desserts, el];
      });
    },
    addToCart(dessert) {
      let cart = this.getUserCart();
      // adding as much desserts as the quantity sent
      for (let i = 0; i < dessert.quantity; i++) {
        cart.contents.desserts = [...cart.contents.desserts, dessert];
      }
      localStorage.setItem("datas", JSON.stringify(cart));
      this.$emit("changeLocalStorage");
      //this.setTotalPrice(cart);
    },
    setTotalPrice(cart) {
      let price = 0;
      cart.contents.desserts.forEach(element => {
        price += element.price;
      });
      cart.total_price = price;
      localStorage.setItem("datas", JSON.stringify(cart));
      this.$emit("changeLocalStorage");
    },
    getUserCart() {
      // check if data existing or not in current local storage
      return JSON.parse(localStorage.getItem("datas"))
        ? JSON.parse(localStorage.getItem("datas"))
        : this.model;
    }
  }
};
</script>

<style>
/* .v-sheet.v-card {
  border-radius: 30px;
} */
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
.v-card__subtitle {
  padding: 0px;
}
.mbot15 {
  padding-top: 15px;
}
</style>
