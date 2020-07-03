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
          @deletePizzaCart="deletePizza"
          :Thead="tablePizza"
          :pizza="cart.contents"
          class="d-flex flex-row flex-wrap justify-space-around max-width"
        />
        <TableCart
          @totalDrink="totalDrink"
          @deleteDrinkCart="deleteDrink"
          :Thead="tableBoisson"
          :drinks="cart.contents"
          class="d-flex flex-row flex-wrap justify-space-around max-width"
        />
        <TableCart
          @totalDessert="totalDessert"
          @deleteDessertCart="deleteDessert"
          :Thead="tableDessert"
          :dessert="cart.contents"
          class="d-flex flex-row flex-wrap justify-space-around max-width"
        />
      </div>
      <div class="hidden-mobile">
        <div class="d-flex flex-row flex-wrap justify-space-around max-width">
          <p>Ingrédients ajoutés: {{ cart.total.ingrediant }} €</p>
        </div>
      </div>
      <div class="hidden-mobile">
        <div class="d-flex flex-row flex-wrap justify-space-around max-width">
          <p>Total :</p>
          <template v-if="promo">
            <p>{{ cart.total.total }} € -</p>
            <p>{{ promo }}%</p>
            <p>{{ cart.total.total - cart.total.total * (promo / 100) }} €</p>
          </template>
          <template v-else>
            <p>{{ cart.total.total }} €</p>
          </template>
        </div>
      </div>

      <v-dialog v-if="userLogged" v-model="paiement" persistent max-width="550">
        <template v-slot:activator="{ on, attrs }">
          <a @click="loadStripe" class="buy-button center" v-bind="attrs" v-on="on">
            Paiement -
            {{
            promo
            ? cart.total.total - cart.total.total * (promo / 100)
            : cart.total.total
            }}
            €
          </a>
        </template>

        <v-card>
          <v-card-title class="headline">Paiement de votre commande</v-card-title>
          <v-card-text>
            <div class="pay-logo">
              <img src="http://i76.imgup.net/accepted_c22e0.png" />
              <h3>Paiement sécurisé</h3>
            </div>
            <div v-if="!checkPay">
              <br />

              <div id="card-element"></div>
              <div id="payment-request-button">
                <!-- A Stripe Element will be inserted here. -->
              </div>
            </div>
            <!-- load spinner -->
            <div v-if="checkPay" class="center">
              <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="paiement = false">Annuler</v-btn>
            <v-btn color="green darken-1" @click="saveOrder" text>Payer {{ amount }} €</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <a v-if="!userLogged"
        >Veuillez-vous connectez pour procéder au paiement !</a
      >
    </div>
    <v-snackbar v-model="pay_toast.snackbar">
      {{ pay_toast.text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="pay_toast.snackbar = false">X</v-btn>
      </template>
    </v-snackbar>
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
      getToken: "",
      userLogged: false,
      checkPay: false,
      pay_toast: { snackbar: false, text: "" },
      tablePizza: ["Pizza", "Taille", "Prix"],
      tableBoisson: ["Boissons", "Prix"],
      tableDessert: ["Desserts", "Prix"],
      idPromo: "",
      promo: null,
      cart: {
        content: {},
        total: { pizza: 0, drink: 0, dessert: 0, ingrediant: 0, total: 0 }
      },
      totalPrice: { pizza: 0, drink: 0, dessert: 0, ingrediant: 0, total: 0 },
      paiement: false,
      stripeAPIToken: "pk_test_QrgGFFIn2rjHnwgwvakXU0dn00FhK9IbmE",
      stripeSKToken: "sk_test_FFo2d2NIa2uOtzD2k88dDrYm00iLED5prj",
      stripe: "",
      elements: "",
      card: "",
      amount: 0
    };
  },
  watch: {
    boolStorage() {

      const local = localStorage.getItem("datas");
      let stringToJSON = JSON.parse(local);
      stringToJSON = {
        ...stringToJSON,
        total: this.totalPrice,
        promo: this.promo
      };

      let countTotal = 0;

      for (let element of stringToJSON.contents.pizzas) {
        if (element.ingrediantAdded) {
          const {
            viande,
            sauce,
            legume,
            fromage,
            epice
          } = element.ingrediantAdded;
          countTotal =
            countTotal +
            viande.length +
            sauce.length +
            legume.length +
            fromage.length +
            epice.length;
        }
      }
      this.totalIngrediant(countTotal);

      localStorage.setItem("datas", JSON.stringify(stringToJSON));
      return (this.cart = stringToJSON);
    }
  },
  async mounted() {
    this.getToken = await localStorage.getItem("x-access-token");
    this.checkUserLogged();
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
      const checkPrice = this.promo
        ? Number(this.cart.total.total) -
          Number(this.cart.total.total) * (this.promo / 100)
        : Number(this.cart.total.total);
      console.log(this.amount);
      this.amount = checkPrice;
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

    async checkUserLogged() {
      if (this.getToken) {
        console.log("dedans");
        const check = await axios.get(
          "https://server-api-pizzago.herokuapp.com/api/v1/user/checkuser",
          { headers: { "x-access-token": this.getToken } }
        );
        if (check.data.role.length > 0) {
          this.userLogged = true;
        }
      }
    },
    async saveOrder() {
      this.checkPay = true;
      const idUser = await this.getIdUserCurrent();
      const local = localStorage.getItem("datas");
      const JSONtoLocalstorage = JSON.parse(local);
      const params = {
        price: this.promo
          ? this.cart.total.total - this.cart.total.total * (this.promo / 100)
          : this.cart.total.total,
        status: 1,
        userId: idUser,
        content: JSONtoLocalstorage
      };

      return axios
        .post(`https://server-api-pizzago.herokuapp.com/api/v1/order/add`, params)
        .then(res => {
          if (res.data.status == "success") {
            setTimeout(() => {
              localStorage.removeItem("datas");
              this.checkPay = false;
              this.pay_toast.text = "Paiement réaliser avec succées.";
              this.pay_toast.snackbar = true;
              this.paiement = false;
              this.$router.go();
            }, 2500);
          } else {
            setTimeout(() => {
              this.checkPay = false;
              this.pay_toast.text = "Erreur veuillez réessayer.";
              this.pay_toast.snackbar = true;
              console.log("error");
            }, 2500);
          }
        })
        .catch(e => {
          this.checkPay = false;
          this.pay_toast.text =
            "Service monentanément indisponnible, veuillez réessayer.";
          this.pay_toast.snackbar = true;
          console.log("catch");
        });
    },

    async submitPromo(e) {
      e.preventDefault();
      if (e.target[0].value.trim() === "")
        return console.log("Veuillez remplir le champs");
      await this.checkPromo(e.target[0].value);
    },

    async getIdUserCurrent() {
      const getToken = localStorage.getItem("x-access-token");
      const check = await axios.get(
        "https://server-api-pizzago.herokuapp.com/api/v1/user/checkuser",
        { headers: { "x-access-token": getToken } }
      );
      return check.data.id;
    },

    async checkPromo(namePromo) {
      const getPromo = await axios.get(
        `https://server-api-pizzago.herokuapp.com/api/v1/promo/name/${namePromo}`
      );
      const { result } = getPromo.data;
      console.log(result)
      if (result === "No Promo found for this Name") return;
      this.promo = result.promoes[0].amount;
      this.cart.promo = this.promo;
      this.idPromo = result.promoes[0].id;
      if (this.cart.contents) {
        const local = localStorage.getItem("datas");
        let stringToJSON = JSON.parse(local);
        stringToJSON = {
          ...stringToJSON,
          promo: this.cart.promo,
          idPromo: this.idPromo
        };
        localStorage.setItem("datas", JSON.stringify(stringToJSON));
      }
      this.getIdUserCurrent();
    },
    totalIngrediant(e) {
      this.totalPrice.ingrediant = Number(e);
      this.totalPrice.total =
        Number(this.totalPrice.pizza) +
        Number(this.totalPrice.drink) +
        Number(this.totalPrice.dessert) +
        Number(this.totalPrice.ingrediant);
    },
    totalPizza(e) {
      this.totalPrice.pizza = Number(e);
      this.totalPrice.total =
        Number(this.totalPrice.pizza) +
        Number(this.totalPrice.drink) +
        this.totalPrice.dessert +
        this.totalPrice.ingrediant;
    },
    totalDrink(e) {
      this.totalPrice.drink = Number(e);
      this.totalPrice.total =
        this.totalPrice.pizza +
        this.totalPrice.drink +
        this.totalPrice.dessert +
        this.totalPrice.ingrediant;
    },
    totalDessert(e) {
      this.totalPrice.dessert = Number(e);
      this.totalPrice.total =
        this.totalPrice.pizza +
        this.totalPrice.drink +
        this.totalPrice.dessert +
        this.totalPrice.ingrediant;
    },
    ingrediantAdded(ingrediantObject, total) {
      const { id } = ingrediantObject;
      this.cart.contents.pizzas[id].ingrediantAdded = ingrediantObject;
      this.totalPrice.ingrediant = total;

      const newJson = {
        contents: this.cart.contents,
        promo: this.promo,
        total: this.totalPrice,
        idPromo: this.idPromo
      };
      const JSONtostring = JSON.stringify(newJson);
      localStorage.setItem("datas", JSONtostring);
    },
    ingrediantRemove(ingrediantRemove, total) {
      const { id } = ingrediantRemove;
      this.cart.contents.pizzas[id].ingrediantRemove = ingrediantRemove;
      this.totalPrice.ingrediant = total;
      const newJson = {
        contents: this.cart.contents,
        promo: this.promo,
        total: this.totalPrice,
        idPromo: this.idPromo
      };

      const JSONtostring = JSON.stringify(newJson);
      localStorage.setItem("datas", JSONtostring);
    },
    deletePizza(key) {
      this.cart.contents.pizzas.splice(key, 1);
      this.totalIngrediantAllPizza();
      this.getTotalPizza();

      this.updateLocalStorage();
    },
    deleteDrink(key) {
      this.cart.contents.drinks.splice(key, 1);
      this.getTotalDrink();
      this.updateLocalStorage();
    },
    deleteDessert(key) {
      this.cart.contents.desserts.splice(key, 1);
      this.getTotalDessert();
      this.updateLocalStorage();
    },
    updateLocalStorage() {
      const newLocalStorage = {
        contents: this.cart.contents,
        promo: this.promo,
        total: this.totalPrice,
        idPromo: this.idPromo
      };

      const JSONtostring = JSON.stringify(newLocalStorage);
      localStorage.setItem("datas", JSONtostring);
    },
    getTotalPizza() {
      let pizzaTotal = 0;
      for (let element of this.cart.contents.pizzas) {
        pizzaTotal = Number(pizzaTotal) + Number(element.price);
      }
      this.totalPizza(pizzaTotal);
    },
    getTotalDrink() {
      let drinkTotal = 0;
      for (let element of this.cart.contents.drinks) {
        drinkTotal = drinkTotal + element.price;
      }
      this.totalDrink(drinkTotal);
    },
    getTotalDessert() {
      let dessertTotal = 0;
      for (let element of this.cart.contents.desserts) {
        dessertTotal = dessertTotal + element.price;
      }
      this.totalDessert(dessertTotal);
    },
    totalIngrediantAllPizza() {
      let countTotal = 0;

      for (let element of this.cart.contents.pizzas) {
        if (element.ingrediantAdded) {
          const {
            viande,
            sauce,
            legume,
            fromage,
            epice
          } = element.ingrediantAdded;
          countTotal =
            countTotal +
            viande.length +
            sauce.length +
            legume.length +
            fromage.length +
            epice.length;
        }
      }
      this.totalIngrediant(countTotal);
    },
    totalIngrediantByPizza(contents) {
      let countTotal = 0;

      for (let element of contents.pizzas) {
        if (element.ingrediantAdded) {
          const {
            viande,
            sauce,
            legume,
            fromage,
            epice
          } = element.ingrediantAdded;
          countTotal =
            countTotal +
            viande.length +
            sauce.length +
            legume.length +
            fromage.length +
            epice.length;
        }
      }
      this.totalIngrediant(countTotal);
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
