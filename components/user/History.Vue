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
            <th class="text-left">Détails</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="orders.id">
            <td>{{ order.date | formatDate }}</td>
            <td>{{ order.price }} €</td>
            <td>{{ getLabelStatus(order.status) }}</td>
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
        .get("http://localhost:4000/api/v1/order/user/" + this.userId)
        .then(res => {
          this.orders = res.data.result.orders;
          console.log(res.data.result.orders);
        })
        .catch(e => {
          console.log("catch");
        });
    },
    getUserId() {
      const getToken = localStorage.getItem("x-access-token");
      return axios
        .get("http://localhost:4000/api/v1/user/checkuser", {
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
