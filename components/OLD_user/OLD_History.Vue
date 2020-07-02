<template>
  <v-card>
    <v-card-title class="headline">Mes commandes</v-card-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Date</th>
            <th class="text-left">Prix</th>
            <th class="text-left">Status</th>
            <th class="text-left">Promo</th>
            <th class="text-left">Commandes</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="orders.id">
            <td>{{ order.date | formatDate }}</td>
            <td>{{ order.price }} €</td>
            <td>{{ getLabelStatus(order.status) }}</td>
            <td>{{ order.promo ? order.promo.amount + "€" : "---" }}</td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <img
                    src="~/static/eye.png"
                    height="25"
                    width="25"
                    v-bind="attrs"
                    v-on="on"
                  />
                </template>
                <span v-for="pizza in order.content.contents.pizzas">
                  {{ pizza.name }} - </span
                ><br />
                <span v-for="drink in order.content.contents.drinks">
                  {{ drink.name }} - </span
                ><br />
                <span v-for="dessert in order.content.contents.desserts">
                  {{ dessert.name }} -
                </span>
              </v-tooltip>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      orders: null,
      userId: null
    };
  },
  mounted() {
    this.getUserId();
  },
  computed: {
    status() {
      return this.$store.state.order.status;
    }
  },
  methods: {
    getLabelStatus(status) {
      let t = "";
      this.status.forEach(element => {
        element.id == status ? (t = element.label) : "";
      });
      return t;
    },
    getOrders() {
      return axios
        .get("https://server-api-pizzago.herokuapp.com/api/v1/order/user/" + this.userId)
        .then(res => {
          this.orders = res.data.result.orders;
        })
        .catch(e => {
          console.log("catch");
        });
    },
    getUserId() {
      const getToken = localStorage.getItem("x-access-token");
      return axios
        .get("https://server-api-pizzago.herokuapp.com/api/v1/user/checkuser", {
          headers: { "x-access-token": getToken }
        })
        .then(res => {
          this.userId = res.data.id;
          this.getOrders();
        })
        .catch(e => {
          console.log("catch");
        });
    }
  }
};
</script>

<style></style>
