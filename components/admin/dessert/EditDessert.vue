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
                <v-text-field clearable label="Nom de la boisson" v-model="params.name"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Prix" v-model="params.price" suffix="€"></v-text-field>
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
          <v-btn color="blue darken-1" class="ma-2" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" class="ma-2" text @click="saveDessert">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "EditDessert",
  props: {
    dataDessert: Object
  },
  data() {
    return {
      dialog: false,
      params: {
        id: null,
        name: null,
        price: null,
        img: null
      }
    };
  },
  mounted() {
    this.getDatas();
  },
  methods: {
    async saveDessert() {
      try {
        this.params.price = Number(this.params.price);
        const response = await this.$axios.put(
          `https://server-api-pizzago.herokuapp.com/api/v1/admin/dessert/update`,
          this.params,
          {
            headers: {
              "x-access-token": localStorage.getItem("x-access-token")
            }
          }
        );
        this.params = response.data.result;
        this.$emit("updateDessert", this.params);
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
    getDatas() {
      this.params = {
        id: this.dataDessert.id,
        price: Number(this.dataDessert.price),
        name: this.dataDessert.name,
        img: this.dataDessert.img
      };
    }
  }
};
</script>

<style lang="scss" scoped></style>
