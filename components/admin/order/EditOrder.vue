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
        <v-expansion-panel-header disable-icon-rotate>
          Client : {{ dataOrders.user.firstname }} | date de commande :
          {{ dataOrders.date | formatDate }}
          <template
            v-if="this.params != 1"
            v-slot:actions
          >
            <v-icon color="teal">mdi-check</v-icon>
          </template>
          <template v-else v-slot:actions>
            <v-icon color="error">mdi-alert-circle</v-icon>
          </template>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-container>
            <v-row>
              <v-col
                v-for="(pizza, index) in dataOrders.content.contents.pizzas"
                :key="index"
                cols="12"
                xl="6"
              >
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-hover>
                      <template v-slot="{ hover }">
                        <v-card
                          v-bind="attrs"
                          v-on="on"
                          outlined
                          class="ma-3 pa-3 card_pizza transition-swing"
                          :class="`elevation-${hover ? 24 : 6}`"
                          max-width="400px"
                        >
                          <v-img
                            :src="pizza.img"
                            class="white--text align-end"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="100px"
                          >
                            <v-card-title v-text="pizza.name"></v-card-title>
                          </v-img>
                        </v-card>
                      </template>
                    </v-hover>
                  </template>
                  Sauce :
                  <span
                    v-for="compo in pizza.composition.sauces.items"
                    :key="compo.label"
                  >{{ compo + " " }}</span>
                  <br />Fromages :
                  <span
                    v-for="compo in pizza.composition.fromages.items"
                    :key="compo.label"
                  >{{ compo + " " }}</span>
                  <br />Viandes :
                  <span
                    v-for="compo in pizza.composition.viandes.items"
                    :key="compo.label"
                  >{{ compo + " " }}</span>
                  <br />Legumes :
                  <span
                    v-for="compo in pizza.composition.legumes.items"
                    :key="compo.label"
                  >{{ compo + " " }}</span>
                  <br />Epices :
                  <span
                    v-for="compo in pizza.composition.epices.items"
                    :key="compo.label"
                  >{{ compo + " " }}</span>
                </v-tooltip>

                <v-card-actions>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-col>
              <v-col cols="12" xl="12">
                <span>Prix : {{ dataOrders.price | euroSign }}</span>
              </v-col>
              <v-col cols="12" xl="12">
                <span>Status : {{ params.status }}</span>
              </v-col>
              <v-col cols="12" xl="12">
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
    // permet d'iterer un tableau
    for (let key in this.status) {
      this.items = [...this.items, this.status[key].label];
    }

    // insert in this.params.status the label of the current status
    this.params.status = this.items[this.dataOrders.status - 1];

    if (this.dataOrders != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
    }
  },
  methods: {
    saveOrder() {
      this.getDatas();
      this.$axios
        .put(`http://localhost:4000/api/v1/admin/order/update`, this.params, {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token")
          }
        })
        .then(res => {
          // https://server-api-pizzago.herokuapp.com/
          // console.log(res.data.result);
          this.params.status = this.status[res.data.result.status - 1].label;
          // console.log(this.params.status);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getDatas() {
      // item peux directement aller chercher l'index
      this.statusId = this.status.find(
        item => item.label == this.params.status
      ).id;

      this.params = {
        id: this.dataOrders.id,
        price: this.dataOrders.price,
        status: this.statusId,
        userId: this.dataOrders.user.id,
        content: this.dataOrders.content
      };
    }
  },
  computed: {
    status() {
      return this.$store.state.order.status;
    }
  }
};
</script>

<style lang="scss" scoped></style>
