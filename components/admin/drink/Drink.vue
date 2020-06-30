<template>
  <v-container fluid>
    <v-row>
      <AddDrink />
    </v-row>
    <v-row dense>
      <v-col v-for="(drink, index) in drinks" :key="index" cols="12" xl="3" lg="4" md="6" sm="12" align="center">
        <v-skeleton-loader v-if="loading" class="mt-6" max-width="400"
          elevation="6" type="card" transition="scale-transition">
        </v-skeleton-loader>

        <v-hover v-else>
          <template v-slot="{ hover }">
            <v-card outlined class="ma-3 pa-3 card_pizza transition-swing" :class="`elevation-${hover ? 24 : 6}`" max-width="400">
              <v-img
                :src="drink.img" class="white--text align-end"
                gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px" >
                <v-card-title>{{ drink.name }} {{ drink.oz | volumeSign}} - {{ drink.price | euroSign }}</v-card-title>
              </v-img>
              <v-card-actions>
                <v-spacer></v-spacer>

                <EditDrink :dataDrink="drink" />

                <v-btn @click="deleteDrink(drink.id)" icon class="ml-3">
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
import EditDrink from "./EditDrink";
import AddDrink from "./AddDrink";

export default {
  name: "Drink",
  components: {
    EditDrink,
    AddDrink
  },
  data: () => {
    return {
      loading: true,
      drinks: Object
    };
  },
  mounted() {
    this.getDrink();

    if (this.drinks != 0) {
      setTimeout(() => {
        this.loading = false;
      }, 500);
    } else {
      alert("Erreur de chargement");
    }
  },
  updated() {
    setTimeout(() => {
      this.getDrink();
    }, 2500);
  },
  methods: {
    async getDrink() {
      return await this.$axios
        .get("http://localhost:4000/api/v1/drink")
        .then(res => {
          this.drinks = res.data.result;
        })
        .catch(e => {
          console.log("catch");
        });
    },
    deleteDrink(id) {
    return this.$axios
        .delete(`http://localhost:4000/api/v1/admin/drink/delete/${id}`, {
          headers: {
            'x-access-token': localStorage.getItem('x-access-token')
          }
        })
        .then(res => {
          if(res.data.status == "success") {
            console.log(res)
            this.getDrink();
          } else {
            console.log("not admin")
          }
        })
        .catch(e => {
          console.log("catch");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
