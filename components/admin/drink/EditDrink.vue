<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ params.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field v-model="params.name" clearable label="Nom de la boisson"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Prix" type="number" v-model="params.price" suffix="€"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Volume" v-model="params.oz" suffix="cL"></v-text-field>
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
          <v-btn color="blue darken-1" text @click="saveDrink">Sauvegarder</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "EditDrink",
  props: {
    dataDrink: Object
  },
  data: () => ({
    dialog: false,
    params: { id : null, price: null, name: null, oz: null, img: null }
  }),
  mounted() {
    this.getDatas();
  },
  methods: {
    saveDrink() {
      return this.$axios
        .put(`http://localhost:4000/api/v1/admin/drink/update`, this.params, {
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
    },
    getDatas() {
      this.params = {
        id: this.dataDrink.id,
        price: Number(this.dataDrink.price),
        name: this.dataDrink.name,
        oz: this.dataDrink.oz,
        img: this.dataDrink.img
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
