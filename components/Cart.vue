<template>
  <div class="d-flex flex-column flex-wrap cart-div .rounded-xl cart-container">
    <div
      class="d-flex flex-column flex-wrap justify-space-around align-center align-content-space-between max-width cursive-font"
    >
      <h1 class="cursive-font">Panier</h1>
      <form @submit="submitPromo">
        <label for="promo">Code promo</label>
        <div class="d-flex flex-row flex-wrap justify-space-around form">
          <input type="text" required />
          <button>Valider</button>
        </div>
      </form>
      <div class="hidden-mobile">
        <TableCart
          @totalPizza="totalPizza"
          @totalIngrediant="totalIngrediant"
          @ingrediantAdded="ingrediantAdded"
          @ingrediantRemove="ingrediantRemove"
          :Thead="tablePizza"
          :pizza="cart.contents"
          class="d-flex flex-row flex-wrap justify-space-around max-width"
        />
        <TableCart
          @totalDrink="totalDrink"
          :Thead="tableBoisson"
          :drinks="cart.contents"
          class="d-flex flex-row flex-wrap justify-space-around max-width"
        />
        <TableCart
          @totalDessert="totalDessert"
          :Thead="tableDessert"
          :dessert="cart.contents"
          class="d-flex flex-row flex-wrap justify-space-around max-width"
        />
      </div>
      <div class="hidden-mobile">
        <div class="d-flex flex-row flex-wrap justify-space-around max-width">
          <h3>Ingrédients ajoutés</h3>
          <p>{{cart.total}} €</p>
        </div>
      </div>
      <div class="hidden-mobile">
        <div class="d-flex flex-row flex-wrap justify-space-around max-width">
          <p>Total :</p>
          <template v-if="promo">
            <p>{{promo}}%</p>
            <p>{{(totalPrice.total - ( totalPrice.total * (promo/100) ) + cart.total)}} €</p>
            <p>{{totalPrice.total + cart.total}} €</p>
          </template>
          <template v-else>
            <p>{{totalPrice.total + cart.total}}€</p>
          </template>
        </div>
      </div>

      <v-dialog v-model="paiement" persistent max-width="550">
        <template v-slot:activator="{ on, attrs }">
          <a
            @click="loadStripe"
            class="buy-button center"
            v-bind="attrs"
            v-on="on"
          >Paiement - {{ promo ? (totalPrice.total - ( totalPrice.total * (promo/100) ) + cart.total) : totalPrice.total + cart.total}} €</a>
        </template>
        <v-card>
          <v-card-title class="headline">Paiement de votre commande</v-card-title>
          <v-card-text>
            <div>
              <h3>Paiement sécurisé</h3>

              <div id="card-element"></div>
              <div id="payment-request-button">
                <!-- A Stripe Element will be inserted here. -->
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="paiement = false">Annuler</v-btn>
            <v-btn color="green darken-1" text>Payer {{amount / 100}} €</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import TableCart from "./Table_Cart";
import axios from "axios";

export default {
  components: {
    TableCart
  },
  props: {
    boolStorage: Boolean
  },
  data() {
    return {
      tablePizza: ["Pizza", "Taille", "Prix"],
      tableBoisson: ["Boissons", "Prix"],
      tableDessert: ["Desserts", "Prix"],
      promo: null,
      cart: { content: {}, total: 0 },
      totalPrice: { pizza: 0, drink: 0, dessert: 0, ingrediant: 0, total: 0 },
      paiement: false,
      stripeAPIToken: "pk_test_QrgGFFIn2rjHnwgwvakXU0dn00FhK9IbmE",
      stripeSKToken: "sk_test_FFo2d2NIa2uOtzD2k88dDrYm00iLED5prj",
      stripe: "",
      elements: "",
      card: "",
      amount: 250
    };
  },
  watch: {
    boolStorage() {
      const local = localStorage.getItem("datas");
      const stringToJSON = JSON.parse(local);

      return (this.cart = stringToJSON);
    }
  },
  methods: {
    // START METHOD FOR STRIPE //
    loadStripe() {
      this.includeStripe(
        "js.stripe.com/v3/",
        function() {
          this.configureStripe();
        }.bind(this)
      );
    },
    configureStripe() {
      this.stripe = Stripe(this.stripeAPIToken);
      this.elements = this.stripe.elements();
      this.card = this.elements.create("card");
      this.card.mount("#card-element");
    },
    includeStripe(URL, callback) {
      let documentTag = document,
        tag = "script",
        object = documentTag.createElement(tag),
        scriptTag = documentTag.getElementsByTagName(tag)[0];
      object.src = "//" + URL;
      object.setAttribute("defer", "defer");
      if (callback) {
        object.addEventListener(
          "load",
          function(e) {
            callback(null, e);
          },
          false
        );
      }
      scriptTag.parentNode.insertBefore(object, scriptTag);
    },

    // END METHOD FOR STRIPE //

    saveOrder(charge) {
      const params = {
        price: null,
        status: null,
        user: null,
        content: null,
        promo: null,
        charge: charge
      };
      return axios
        .post(`http://localhost:4000/api/v1/order/add`, params)
        .then(res => {
          if (res.data.status == "success") {
            console.log(res);
          } else {
            console.log("error");
          }
        })
        .catch(e => {
          console.log("catch");
        });
    },

    async submitPromo(e) {
      e.preventDefault();
      if (e.target[0].value.trim() === "")
        return console.log("Veuillez remplir le champs");
      await this.checkPromo(e.target[0].value);
    },
    async checkPromo(namePromo) {
      const getPromo = await axios.get(
        `http://localhost:4000/api/v1/promo/name/${namePromo}`
      );
      const { result } = getPromo.data;
      if (result === "No Promo found for this Name")
        return console.log("pas de promo");
      this.promo = result.promoes[0].amount;
    },
    totalIngrediant(e) {
      console.log(e);
      this.totalPrice.ingrediant = e;
      this.totalPrice.total =
        this.totalPrice.pizza +
        this.totalPrice.drink +
        this.totalPrice.dessert +
        this.totalPrice.ingrediant;
    },
    totalPizza(e) {
      this.totalPrice.pizza = e;
      this.totalPrice.total =
        this.totalPrice.pizza +
        this.totalPrice.drink +
        this.totalPrice.dessert +
        this.totalPrice.ingrediant;
    },
    totalDrink(e) {
      this.totalPrice.drink = e;
      this.totalPrice.total =
        this.totalPrice.pizza +
        this.totalPrice.drink +
        this.totalPrice.dessert +
        this.totalPrice.ingrediant;
    },
    totalDessert(e) {
      this.totalPrice.dessert = e;
      this.totalPrice.total =
        this.totalPrice.pizza +
        this.totalPrice.drink +
        this.totalPrice.dessert +
        this.totalPrice.ingrediant;
    },
    ingrediantAdded(ingrediantObject, total) {
      const { id } = ingrediantObject;

      this.cart.contents.pizzas[id].ingrediantAdded = ingrediantObject;
      const newJson = {
        contents: this.cart.contents,
        total: total
      };

      const JSONtostring = JSON.stringify(newJson);
      localStorage.setItem("datas", JSONtostring);
      this.cart.total = total;
    },
    ingrediantRemove(ingrediantRemove, total) {
      const { id } = ingrediantRemove;
      this.cart.contents.pizzas[id].ingrediantRemove = ingrediantRemove;

      const newJson = {
        contents: this.cart.contents,
        total: total
      };

      const JSONtostring = JSON.stringify(newJson);
      localStorage.setItem("datas", JSONtostring);
      this.cart.total;
    }
  }
};
</script>

<style>
h1.cursive-font {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background-color: white;
  width: inherit;
  text-align: center;
}
.cart-container {
  position: fixed;
}
.cart-div {
  height: calc(80% - 173px) !important;
  overflow-y: auto;
  overflow-x: hidden;
}
table {
  margin-left: 5px;
  width: 100%;
}
.cart-div {
  height: 100%;
  border: 1px solid #e0e0e0;
  background-color: white;
  border-radius: 30px;
}

.max-width {
  width: 100%;
  padding: 0px 0px 30px 0px;
}

.form input {
  border: 1px solid #979797;
  border-radius: 3px;
  width: 72%;
}

.form button {
  padding: 2px;
  background-color: #ba7070;
  color: white;
  border-radius: 3px;
}

.buy-button {
  padding: 10px 50px;
  background-color: #ba70709c;
  border-radius: 20px;
  text-decoration: none;
  border: 1px solid #906767;
  position: fixed;
  bottom: 200px;
}

.buy-button:hover {
  background-color: white;
  color: #ba7070;
  border: 1px solid #ba7070;
}

.buy-button a {
  color: white;
}

a.buy-button {
  color: white;
  text-decoration: none;
}
thead {
  line-height: 40px;
}
.StripeElement {
  box-sizing: border-box;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
@media only screen and (max-device-width: 640px) {
  .cart-container {
    position: fixed;
    bottom: 4px;
    margin-right: 25px;
    margin-left: 25px;
  }
  .buy-button {
    padding: 4px 30px;
    bottom: 20px;
  }
  .cart-div {
    height: calc(50% - 230px) !important;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>