<template>
  <v-container fluid>
    <v-row>
      <v-col v-for="(order, index) in orders" :key="index" cols="12" xl="4" lg="6" md="6" sm="12">
        <EditOrder :dataOrders="order" @updateOrder="updateOrder" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditOrder from "./EditOrder";

export default {
  components: {
    EditOrder
  },
  data() {
    return {
      orders: Object
    };
  },
  mounted() {
    this.getOrder();
  },
  methods: {
    async getOrder() {
      try {
        const response = await this.$axios.get(
          "http://localhost:4000/api/v1/admin/order",
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        );
        return (this.orders = response.data.result);
      } catch (error) {
        console.log(error);
      }
    },
    updateOrder(value) {
      // couple key value
      for (let key in this.orders) {
        // search the key in array and compare
        if (this.orders[key].status === value.status) {
          this.orders[key] = value;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
