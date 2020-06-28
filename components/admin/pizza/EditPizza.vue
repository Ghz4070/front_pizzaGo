<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon dark v-bind="attrs" v-on="on">
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
              <v-cols cols="12" md="6">
                <v-text-field outlined dense label="Nom de la pizza" :value="dataPizza.name"></v-text-field>
              </v-cols>
            </v-row>

            <v-row>
              <v-cols cols="12" md="6">
                <h3 class="mb-3">Ingredients</h3>
              </v-cols>
            </v-row>

            <v-row>
              <v-cols v-for="(ingredient, index) in ingredients" :key="index" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.sauces.items"
                  outlined
                  dense
                  clearable
                  chips
                  small-chips
                  :label="ingredient.sauces.label"
                  multiple
                ></v-autocomplete>
              </v-cols>

              <v-cols v-for="(ingredient, index) in ingredients" :key="index" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.viandes.items"
                  outlined
                  dense
                  clearable
                  chips
                  small-chips
                  :label="ingredient.viandes.label"
                  multiple
                ></v-autocomplete>
              </v-cols>
            </v-row>

            <v-row>
              <v-cols v-for="(ingredient, index) in ingredients" :key="index" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.legumes.items"
                  outlined
                  dense
                  clearable
                  chips
                  small-chips
                  :label="ingredient.legumes.label"
                  multiple
                ></v-autocomplete>
              </v-cols>

              <v-cols v-for="(ingredient, index) in ingredients" :key="index" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.fromages.items"
                  outlined
                  dense
                  clearable
                  chips
                  small-chips
                  :label="ingredient.fromages.label"
                  multiple
                ></v-autocomplete>
              </v-cols>
            </v-row>

            <v-row>
              <v-cols v-for="(ingredient, index) in ingredients" :key="index" cols="12" md="6">
                <v-autocomplete
                  :items="ingredient.epices.items"
                  outlined
                  dense
                  clearable
                  chips
                  small-chips
                  :label="ingredient.epices.label"
                  multiple
                ></v-autocomplete>
              </v-cols>
              
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
export default {
  props: {
    dataPizza: Object,
    // sizes: Object,
    categories: Object
  },
  data: () => ({
    dialog: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"]
  }),
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  },
  mounted () {
    console.log(this.categories);
  },
};
</script>

<style lang="scss" scoped>
</style>
