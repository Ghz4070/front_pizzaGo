<template>
  <div id="SelectionIngredients">
    <h3 class="mb-2">Ingrdients</h3>
    <div v-for="(ingredient, index) in ingredients" :key="index">

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
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectionIngredients",
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
