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
              <v-col cols="12" md="12">
                <v-text-field clearable label="Nom de la pizza" v-model="params.name"></v-text-field>
              </v-col>

              <v-col cols="12" md="12">
                <h3 class="mb-3">Ingredients</h3>
              </v-col>

              <v-col v-for="(ingredient) in ingredients" :key="ingredient.label" cols="12" md="12">
                <v-autocomplete
                  v-model="params.composition.sauces.items"
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
                  v-model="params.composition.viandes.items"
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
                  v-model="params.composition.legumes.items"
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
                  v-model="params.composition.fromages.items"
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
                  v-model="params.composition.epices.items"
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
                      v-model="params.img"
                      v-bind="attrs"
                      v-on="on"
                      clearable
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
                  :items="allCategories"
                  v-model="params.category"
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
          <v-btn color="blue darken-1" class="ma-2" text @click="dialog = false">Annuler</v-btn>
          <v-btn color="blue darken-1" class="ma-2" text @click="editPizza()">Sauvegarder</v-btn>
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
    allCategories: [],
    idCategories: undefined,
    params: {
      id: null,
      categoryId: null,
      name: null,
      img: null,
      composition: {
        epices: { items: [] },
        sauces: { items: [] },
        viandes: { items: [] },
        fromages: { items: [] },
        legumes: { items: [] }
      }
    }
  }),
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  },
  mounted() {
    this.getAllCategories();
    this.getDatas();
  },
  methods: {
    getAllCategories() {
      return axios
        .get("http://localhost:4000/api/v1/category")
        .then(res => {
          res.data.result.forEach(element => {
            this.allCategories = [...this.allCategories, element.name];
          });
        })
        .catch(e => {
          console.log("catch");
        });
    },
    editPizza() {
      this.params.categoryId = this.dataPizza.category.id; // changer le name par son id
      console.log(this.params)
      return this.$axios
        .put(`http://localhost:4000/api/v1/admin/pizza/update`, this.params, {
          headers: {
            "x-access-token": localStorage.getItem('x-access-token')
          }
        })
        .then(res => {
          if (res.data.status == "success") {
            this.dialog = false;
          } else {
            console.log("erreur");
            console.log(res);
          }
        })
        .catch(e => {
          console.log("catch");
        });
    },
    getDatas() {
      console.log(this.dataPizza.composition);
      this.params = {
        id: this.dataPizza.id,
        categoryId: this.dataPizza.category.name,
        name: this.dataPizza.name,
        img: this.dataPizza.img,
        composition: {
          epices: { items: this.dataPizza.composition.epices.items },
          sauces: { items: this.dataPizza.composition.sauces.items },
          viandes: { items: this.dataPizza.composition.viandes.items },
          fromages: { items: this.dataPizza.composition.fromages.items },
          legumes: { items: this.dataPizza.composition.legumes.items }
        }
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
