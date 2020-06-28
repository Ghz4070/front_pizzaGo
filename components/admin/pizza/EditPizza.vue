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
          <span class="headline">{{ dataPizza.name }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row align="center">
              <v-col cols="12" sm="6">
                <v-text-field
                  outlined
                  dense
                  clearable
                  label="Nom de la pizza"
                  :value="dataPizza.name"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <SelectionIngredients />
              </v-col>

              <v-col cols="12">
                <v-select outlined dense :items="items" label="Outlined style"></v-select>
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
import SelectionIngredients from "@/components/admin/pizza/EditPizza/SelectionIngredients";

export default {
  name: "EditPizza",
  components: {
    SelectionIngredients
  },
  props: {
    dataPizza: Object,
    size: Object,
    category: Object
  },
  data: () => ({
    dialog: false,
    items: ["Foo", "Bar", "Fizz", "Buzz"]
  })
};
</script>

<style lang="scss" scoped>
</style>
