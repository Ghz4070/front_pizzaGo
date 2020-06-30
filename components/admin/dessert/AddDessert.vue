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
          <span class="headline">Ajout d'un dessert</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field clearable label="Nom du dessert"></v-text-field>
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field label="Prix" suffix="€"></v-text-field>
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
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" class="ma-2" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" class="ma-2" text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "AddDessert",
  data: () => ({
    dialog: false
  })
};
</script>

<style lang="scss" scoped>
</style>
