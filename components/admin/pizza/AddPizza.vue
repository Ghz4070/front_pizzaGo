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
          <span class="headline">Ajout d'une pizza</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field clearable label="Nom de la pizza"></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <h3 class="mb-3">Ingredients</h3>
              </v-col>

              <v-col v-for="(ingredient) in ingredients" :key="ingredient.label" cols="12" md="12">
                <v-autocomplete
                  :items="ingredient.sauces.items"
                  dense
                  clearable
                  chips
                  :label="ingredient.sauces.label"
                  multiple
                ></v-autocomplete>
              </v-col>

              <v-col v-for="(ingredient) in ingredients" :key="ingredient.label" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.viandes.items"
                  dense
                  clearable
                  chips
                  :label="ingredient.viandes.label"
                  multiple
                ></v-autocomplete>
              </v-col>

              <v-col v-for="(ingredient) in ingredients" :key="ingredient.label" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.legumes.items"
                  dense
                  clearable
                  chips
                  :label="ingredient.legumes.label"
                  multiple
                ></v-autocomplete>
              </v-col>

              <v-col v-for="(ingredient, index) in ingredients" :key="index" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.fromages.items"
                  dense
                  clearable
                  chips
                  :label="ingredient.fromages.label"
                  multiple
                ></v-autocomplete>
              </v-col>

              <v-col v-for="(ingredient) in ingredients" :key="ingredient.label" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.epices.items"
                  dense
                  clearable
                  chips
                  :label="ingredient.epices.label"
                  multiple
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-bind="attrs"
                      v-on="on"
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
              <v-col cols="12" md="6">
                <!-- https://vuetifyjs.com/en/components/selects/#api : la doc -->
                <v-select
                  :hint="`${allCategories.name}, ${allCategories.id}`"
                  :items="allCategories"
                  :item-text="allCategories.id"
                  :item-value="allCategories.name"
                  persistent-hint
                  return-object
                  single-line
                  label="Categories"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import axios from "axios";

export default {
  name: "AddPizza",
  data: () => ({
    dialog: false,
    allCategories: Object
  }),
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  },
  async mounted() {
    await this.getAllCategories();
  },
  methods: {
    getAllCategories() {
      return axios
        .get("http://localhost:4000/api/v1/category")
        .then(res => {
          this.allCategories = res.data.result;
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
