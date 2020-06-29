<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on" @click="listCategories(dataPizza.category.id)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ dataPizza.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field clearable label="Nom de la pizza" :value="dataPizza.name"></v-text-field>
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
                  :value="dataPizza.composition.sauces.items"
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
                  :value="dataPizza.composition.viandes.items"
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
                  :value="dataPizza.composition.legumes.items"
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
                  :value="dataPizza.composition.fromages.items"
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
                  :value="dataPizza.composition.epices.items"
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
                  :hint="`${dataPizza.category.name}, ${dataPizza.category.id}`"
                  :items="allCategories"
                  :item-text="dataPizza.category.id"
                  :item-value="dataPizza.category.name"
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
  props: {
    dataPizza: Object
  },
  data: () => ({
    dialog: false,
    allCategories: Object,
  }),
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  },
  updated() {
    console.log(this.allCategories);
    // console.log(this.categoriesId);
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
    },
    listCategories(value) {
      // if(value == this.allCategories.id){
      //   this.items = this.allCategories.name
      //   console.log(this.items)
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
