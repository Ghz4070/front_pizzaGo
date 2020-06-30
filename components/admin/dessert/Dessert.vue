<template>
  <v-container fluid>
    <v-row>
      <AddDessert />
    </v-row>
    <v-row dense>
      <v-col
        v-for="(dessert, index) in desserts"
        :key="index"
        cols="12"
        xl="3"
        lg="4"
        md="6"
        sm="12"
        align="center"
      >
        <v-skeleton-loader
          v-if="loading"
          class="mt-6"
          max-width="400"
          elevation="6"
          type="card"
          transition="scale-transition"
        ></v-skeleton-loader>

        <v-hover v-else>
          <template v-slot="{ hover }">
            <v-card
              outlined
              class="ma-3 pa-3 card_pizza transition-swing"
              :class="`elevation-${hover ? 24 : 6}`"
              max-width="400"
            >
              <v-img
                :src="dessert.img"
                class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                height="200px"
              >
                <v-card-title>{{ dessert.name }} {{ dessert.price | euroSign }}</v-card-title>
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>

                <EditDessert :dataDessert="dessert" />

                <v-btn icon class="ml-3" @click="deleteDessert(dessert.id)">
                  <v-icon>mdi-trash-can</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import EditDessert from "./EditDessert";
import AddDessert from "./AddDessert";

export default {
  name: "Dessert",
  components: {
    EditDessert,
    AddDessert
  },
  data: () => {
    return {
      loading: true,
      desserts: Object
    };
  },
  updated() {
    setTimeout(() => {
      this.getDessert();
    }, 2500);
  },
  mounted() {
    this.getDessert();

    if (this.desserts != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
      alert("Erreur de chargement");
    }
  },
  methods: {
    async getDessert() {
      try {
        const response = await this.$axios.get(
          "http://localhost:4000/api/v1/dessert"
        );
        console.log(response.data.result);
        return (this.desserts = response.data.result);
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDessert(id) {
      try {
        const response = await this.$axios.delete(
          `http://localhost:4000/api/v1/admin/dessert/delete/${id}`,
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        );

        return response.status;
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
