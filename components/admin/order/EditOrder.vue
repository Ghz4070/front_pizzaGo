<template>
  <div :key="dataOrders.id">
    <v-skeleton-loader
      v-if="loading"
      class="mt-6"
      elevation="6"
      type="list-item-avatar-two-line"
      transition="scale-transition"
    ></v-skeleton-loader>
    <v-expansion-panels v-else popout inset multiple focusable hover>
      <v-expansion-panel>
        <v-expansion-panel-header>Client : {{ dataOrders.user.firstname }} | date de commande : {{ dataOrders.date | formatDate}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select v-model="params.status" :items="items" label="Status"></v-select>
              </v-col>
            </v-row>
          </v-container>
          <v-row align="end" justify="end">
            <v-btn outlined color="green" class="ma-1" @click="saveOrder()">Sauvegarder</v-btn>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
export default {
  name: "EditOrder",
  props: {
    dataOrders: Object
  },
  data() {
    return {
      loading: true,
      items: [], // mounted : Fill in the table
      statusId: null,
      params: {
        id: "",
        status: ""
      }
    };
  },
  mounted() {
    this.getDatas();
    console.log(this.getDatas());
    // permet d'iterer un tableau
    for (let key in this.status) {
      this.items = [...this.items, this.status[key].label];
    }
    // insert in this.params.status the label of the current status
    // this.params.status = this.items[this.dataOrders.status - 1];
    if (this.dataOrders != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
      alert("Erreur de chargement");
    }
  },
  methods: {
    async saveOrder() {
      await this.getDatas();

      try {
        const response = await this.$axios.put(
          `http://localhost:4000/api/v1/admin/order/update`,
          this.params,
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        );
        this.$emit("updateOrder", response.data.result);
      } catch (error) {
        console.log(error);
        console.log("not admin");
      }
    },
    formatStatus() {
      // item peux directement aller chercher l'index
      const statusId = this.status.filter(item => {
        // this.params.status -> v-model recup la data
        if (item.label == this.params.status) {
          return (this.statusId = item.id);
        }
      });
    },
    getDatas() {
      this.formatStatus();

      this.params = {
        id: this.dataOrders.id,
        price: this.dataOrders.price,
        status: this.statusId,
        userId: this.dataOrders.user.id,
        content: this.dataOrders.content,
        promoId: this.dataOrders.promo.id
      };

      return this.params;
    }
  },
  computed: {
    status() {
      return this.$store.state.order.status;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
