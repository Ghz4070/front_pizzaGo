<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon color="primary" dark v-bind="attrs" v-on="on" class="mt-5">
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Ajout d'une boisson</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="params.name" clearable label="Nom de la boisson"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="params.price" type="number" label="Prix" suffix="€"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field v-model="params.oz" label="Volume" suffix="cL"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
                      v-model="params.img"
                      label="Lien de votre image"
                      prepend-icon="mdi-camera"
                    ></v-text-field>
                  </template>
                  <span>
                    Transformez vos images grace
                    <b>imgbb.com</b> puis importez le lien ici
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="addDrink">Sauvegarder</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AddDrink",
  data: () => ({
    dialog: false,
    params: { price: null, name: null, oz: null, img: null }
  }),
  mounted() {
    this.params = { price: null, name: null, oz: null, img: null };
  },
  methods: {
    addDrink() {
      this.params.price = Number(this.params.price);
      this.params.oz = Number(this.params.oz);
      return this.$axios
        .post(`http://localhost:4000/api/v1/admin/drink/add`, this.params, {
          headers: {
            "x-access-token": localStorage.getItem("x-access-token")
          }
        })
        .then(res => {
          if (res.data.status == "success") {
            console.log(res);
            this.dialog = false;
          } else {
            console.log(res);
            console.log("not admin");
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
