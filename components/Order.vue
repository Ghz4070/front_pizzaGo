<template>
  <v-row>
    <v-col cols="12" sm="12" md="9">
      <v-card class="mx-auto container-card" outlined>
        <v-row justify="space-between">
          <v-col md="6" sm="6">
            <p class="localisation-info">
              Les Menus de votre
              <br />
              <b>PizzGo {{ localisation }}</b>
            </p>
          </v-col>
          <v-col md="6" sm="6">
            <a v-on:click="getPosition()" class="localisation-info right">
              <img width="20px" src="~/static/position.png" />Changer de
              PizzaGo
            </a>
          </v-col>
        </v-row>
        <v-tabs
          class="tabs pacifico-font"
          @change="changeTab(currentTab)"
          centered
          v-model="currentTab"
          background-color="white"
          color="black"
        >
          <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
        </v-tabs>

        <div class="resume">
          <h2>La carte</h2>Retrouvez au menu vos pizzas, desserts, boissons, mais également nos
          menus et nos offres qui arrivent prochainement.
        </div>

        <!-- PIZZA -->
        <div v-if="currentTab == 0">
          <Pizza @changeLocalStorage="changeLocalStorage" />
        </div>
        <!-- Boisson -->
        <div v-if="currentTab == 1">
          <Drink @changeLocalStorage="changeLocalStorage" />
        </div>

        <!-- Dessert -->
        <div v-if="currentTab == 2">
          <Dessert @changeLocalStorage="changeLocalStorage" />
        </div>
      </v-card>
    </v-col>
    <v-col cols="12" sm="12" md="3">
      <Cart :boolStorage="boolCart" />
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
import Pizza from "./Pizza";
import Drink from "./Drink";
import Dessert from "./Dessert";
import Cart from "./Cart";

export default {
  components: {
    Pizza,
    Dessert,
    Drink,
    Cart
  },
  data: function() {
    return {
      localisation: "Aubervilliers",
      currentTab: 0,
      items: [{ tab: "Pizza" }, { tab: "Boisson" }, { tab: "Dessert" }],
      boolCart: false
    };
  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    },
    changeLocalStorage() {
      this.boolCart = true;
      setTimeout(() => (this.boolCart = false), 1000);
    },
    getPosition() {
      return axios
        .get(`https://ipinfo.io?token=83a55ee23815fd`, {
          headers: {
            "Content-Type": "jsonp"
          }
        })
        .then(res => {
          if (res.status == 200) this.localisation = res.data.city;
        })
        .catch(e => {
          console.log("catch");
        });
    }
  }
};
</script>

<style>
.v-sheet.v-card.container-card {
  border-radius: 30px !important;
}
.resume {
  font-size: 18px;
  font-family: cursive;
  text-align: center;
  margin: 10px 35px;
}
.resume h2 {
  margin-bottom: 25px;
}
.localisation-info {
  font-family: cursive;
  font-size: 16px;
  margin-left: 25px;
}
.localisation-info img {
  position: relative;
  top: 2px;
}

.localisation-info.right {
  display: block;
  float: right;
  width: 50%;
  color: #895c5c;
}

@media only screen and (max-device-width: 640px) {
  .localisation-info.right {
    display: block;
    float: right;
    width: 75%;
    color: #895c5c;
  }
  .localisation-info {
    font-family: cursive;
    font-size: 14px;
    margin-left: 10px;
  }
  .resume {
    font-size: 16px;
  }
}
</style>
