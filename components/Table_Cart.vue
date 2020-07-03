<template>
  <div :class="className">
    <table>
      <thead>
        <tr>
          <td v-for="(title, index) in Thead" :key="index">{{ title }}</td>
        </tr>
      </thead>
      <tbody>
        <template v-if="pizza && Thead[0] === 'Pizza'">
          <template v-for="(element, key) in pizza.pizzas">
            <tr :key="key">
              <td
                @click="() => deletePizzaCart(key)"
                class="border-element-cart"
                :key="element.name"
              >{{ element.name }}</td>
              <td :key="element.size">{{ element.size }}</td>
              <td :key="element.price">{{ element.price }} €</td>
              <td style="cursor:pointer" @click="getId(key)">Modifier</td>
              <v-dialog v-model="dialog" max-width="390">
                <v-card class="pt-3 pr-3 pb-3 pl-3">
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        Enlever les ingrédients de
                        base
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div class="d-flex flex-wrap flex-row">
                          <v-switch v-model="switchSauce" class="ma-1" label="Sauce" />
                          <v-switch v-model="switchViande" class="ma-1" label="Viande" />
                          <v-switch v-model="switchFromage" class="ma-1" label="Fromage" />
                          <v-switch v-model="switchLegume" class="ma-1" label="Légume" />
                          <v-switch v-model="switchEpice" class="ma-1" label="Epice" />
                        </div>
                        <div id="switchSauce" v-if="switchSauce">
                          <div>
                            <div
                              :key="index"
                              v-for="(element, index) in pizza.pizzas[key]
                                .composition.sauces.items"
                            >
                              <v-chip
                                :key="index"
                                @click="e => addOrRemoveIngrediant(e, key)"
                                style="cursor:pointer"
                                class="ma-2"
                                :color="
                                  checkSelectedIngredient(element)
                                    ? 'green'
                                    : 'red'
                                "
                                text-color="white"
                                @click:close="chip2 = false"
                              >{{ element }}</v-chip>
                            </div>
                          </div>
                        </div>
                        <div id="switchViande" v-if="switchViande">
                          <div>
                            <div
                              :key="index"
                              v-for="(element, index) in pizza.pizzas[key]
                                .composition.viandes.items"
                            >
                              <v-chip
                                :key="index"
                                @click="e => addOrRemoveIngrediant(e, key)"
                                style="cursor:pointer"
                                class="ma-2"
                                :color="
                                  checkSelectedIngredient(element)
                                    ? 'green'
                                    : 'red'
                                "
                                text-color="white"
                                @click:close="chip2 = false"
                              >{{ element }}</v-chip>
                            </div>
                          </div>
                        </div>
                        <div id="switchFromage" v-if="switchFromage">
                          <div>
                            <div
                              :key="index"
                              v-for="(element, index) in pizza.pizzas[key]
                                .composition.fromages.items"
                            >
                              <v-chip
                                :key="index"
                                @click="e => addOrRemoveIngrediant(e, key)"
                                style="cursor:pointer"
                                class="ma-2"
                                :color="
                                  checkSelectedIngredient(element)
                                    ? 'green'
                                    : 'red'
                                "
                                text-color="white"
                                @click:close="chip2 = false"
                              >{{ element }}</v-chip>
                            </div>
                          </div>
                        </div>
                        <div id="switchLegume" v-if="switchLegume">
                          <div>
                            <div
                              :key="index"
                              v-for="(element, index) in pizza.pizzas[key]
                                .composition.legumes.items"
                            >
                              <v-chip
                                :key="index"
                                @click="e => addOrRemoveIngrediant(e, key)"
                                style="cursor:pointer"
                                class="ma-2"
                                :color="
                                  checkSelectedIngredient(element)
                                    ? 'green'
                                    : 'red'
                                "
                                text-color="white"
                                @click:close="chip2 = false"
                              >{{ element }}</v-chip>
                            </div>
                          </div>
                        </div>
                        <div id="switchEpice" v-if="switchEpice">
                          <div>
                            <div
                              :key="index"
                              v-for="(element, index) in pizza.pizzas[key]
                                .composition.epices.items"
                            >
                              <v-chip
                                :key="index"
                                @click="e => addOrRemoveIngrediant(e, key)"
                                style="cursor:pointer"
                                class="ma-2"
                                :color="
                                  checkSelectedIngredient(element)
                                    ? 'green'
                                    : 'red'
                                "
                                text-color="white"
                                @click:close="chip2 = false"
                              >{{ element }}</v-chip>
                            </div>
                          </div>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                    <v-expansion-panel>
                      <v-expansion-panel-header>
                        L'ingrédient supplémentaire à
                        1€
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <div class="d-flex flex-row flex-wrap justify-space-around" id="sauce">
                          <v-select
                            v-model="currentSelect.sauce"
                            label="Sauces"
                            :items="ingredients.ingredients.sauces.items"
                          />
                          <button @click="addIngrediant">Ajouter</button>
                          <br />
                          <template
                            v-if="
                              pizza.pizzas[currentSelect.id] &&
                                pizza.pizzas[currentSelect.id].ingrediantAdded
                            "
                          >
                            <p
                              :id="id"
                              class="ingrediant-add"
                              v-for="(sauce, id) in pizza.pizzas[
                                currentSelect.id
                              ].ingrediantAdded.sauce"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ sauce }}</p>
                          </template>
                          <template v-else>
                            <p
                              :id="id"
                              class="ingrediant-add"
                              v-for="(sauce, id) in ingrediantSelected.sauce"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ sauce }}</p>
                          </template>
                        </div>
                        <div class="d-flex flex-row flex-wrap justify-space-around" id="viande">
                          <v-select
                            v-model="currentSelect.viande"
                            label="Viandes"
                            :items="ingredients.ingredients.viandes.items"
                          />
                          <button @click="addIngrediant">Ajouter</button>
                          <br />
                          <template
                            v-if="
                              pizza.pizzas[currentSelect.id] &&
                                pizza.pizzas[currentSelect.id].ingrediantAdded
                            "
                          >
                            <p
                              class="ingrediant-add"
                              v-for="(viande, id) in pizza.pizzas[
                                currentSelect.id
                              ].ingrediantAdded.viande"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ viande }}</p>
                          </template>
                          <template v-else>
                            <p
                              class="ingrediant-add"
                              v-for="(viande, id) in ingrediantSelected.viande"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ viande }}</p>
                          </template>
                        </div>

                        <div class="d-flex flex-row flex-wrap justify-space-around" id="legume">
                          <v-select
                            v-model="currentSelect.legume"
                            label="Légumes"
                            :items="ingredients.ingredients.legumes.items"
                          />
                          <button @click="addIngrediant">Ajouter</button>
                          <br />
                          <template
                            v-if="
                              pizza.pizzas[currentSelect.id] &&
                                pizza.pizzas[currentSelect.id].ingrediantAdded
                            "
                          >
                            <p
                              :id="id"
                              class="ingrediant-add"
                              v-for="(legume, id) in pizza.pizzas[
                                currentSelect.id
                              ].ingrediantAdded.legume"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ legume }}</p>
                          </template>
                          <template v-else>
                            <p
                              :id="id"
                              class="ingrediant-add"
                              v-for="(legume, id) in ingrediantSelected.legume"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ legume }}</p>
                          </template>
                        </div>

                        <div class="d-flex flex-row flex-wrap justify-space-around" id="fromage">
                          <v-select
                            v-model="currentSelect.fromage"
                            label="Fromages"
                            :items="ingredients.ingredients.fromages.items"
                          />
                          <button @click="addIngrediant">Ajouter</button>
                          <br />
                          <template
                            v-if="
                              pizza.pizzas[currentSelect.id] &&
                                pizza.pizzas[currentSelect.id].ingrediantAdded
                            "
                          >
                            <p
                              class="ingrediant-add"
                              v-for="(fromage, id) in pizza.pizzas[
                                currentSelect.id
                              ].ingrediantAdded.fromage"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ fromage }}</p>
                          </template>
                          <template v-else>
                            <p
                              class="ingrediant-add"
                              v-for="(fromage,
                              id) in ingrediantSelected.fromage"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ fromage }}</p>
                          </template>
                        </div>

                        <div class="d-flex flex-row flex-wrap justify-space-around" id="epice">
                          <v-select
                            v-model="currentSelect.epice"
                            label="Epices"
                            :items="ingredients.ingredients.epices.items"
                          />
                          <button @click="addIngrediant">Ajouter</button>
                          <br />
                          <template
                            v-if="
                              pizza.pizzas[currentSelect.id] &&
                                pizza.pizzas[currentSelect.id].ingrediantAdded
                            "
                          >
                            <p
                              class="ingrediant-add"
                              v-for="(epice, id) in pizza.pizzas[
                                currentSelect.id
                              ].ingrediantAdded.epice"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ epice }}</p>
                          </template>
                          <template v-else>
                            <p
                              class="ingrediant-add"
                              v-for="(epice, id) in ingrediantSelected.epice"
                              :key="id"
                              @click="e => deleteIngrediant(e, id)"
                            >{{ epice }}</p>
                          </template>
                        </div>

                        <v-card-actions>
                          <v-spacer></v-spacer>

                          <v-btn color="green darken-1" text @click="getAddIngrediant(key)">Valider</v-btn>
                        </v-card-actions>
                        <v-snackbar v-model="addIngrediant_alert.snackbar">
                          {{ addIngrediant_alert.text }}
                          <template v-slot:action="{ attrs }">
                            <v-btn
                              color="pink"
                              text
                              v-bind="attrs"
                              @click="addIngrediant.snackbar = false"
                            >X</v-btn>
                          </template>
                        </v-snackbar>
                        <v-snackbar v-model="deleteIngrediant_alert.snackbar">
                          {{ deleteIngrediant_alert.text }}
                          <template v-slot:action="{ attrs }">
                            <v-btn
                              color="pink"
                              text
                              v-bind="attrs"
                              @click="deleteIngrediant.snackbar = false"
                            >X</v-btn>
                          </template>
                        </v-snackbar>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
                </v-card>
                <v-snackbar v-model="errorIngrediant.snackbar">
                  {{ errorIngrediant.text }}
                  <template v-slot:action="{ attrs }">
                    <v-btn
                      color="pink"
                      text
                      v-bind="attrs"
                      @click="errorIngrediant.snackbar = false"
                    >X</v-btn>
                  </template>
                </v-snackbar>
              </v-dialog>
            </tr>
          </template>
        </template>
        <template v-if="drinks && Thead[0] === 'Boissons'">
          <template v-for="(element, key) in drinks.drinks">
            <tr :key="key">
              <td
                @click="() => deleteDrinkCart(key)"
                class="border-element-cart"
                :key="element.name"
              >{{ element.name }}</td>
              <td :key="element.price">{{ element.price }} €</td>
            </tr>
          </template>
        </template>
        <template v-if="dessert && Thead[0] === 'Desserts'">
          <template v-for="(element, key) in dessert.desserts">
            <tr :key="key">
              <td
                @click="() => deleteDessertCart(key)"
                class="border-element-cart"
                :key="element.name"
              >{{ element.name }}</td>
              <td :key="element.price">{{ element.price }} €</td>
            </tr>
          </template>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPricePizza: null,
      dialog: false,
      errorIngrediant: {
        snackbar: false,
        text: "Vous pouvez pas ajouter plus d'ingrédiant"
      },
      currentSelect: {
        id: "",
        sauce: "",
        viande: "",
        legume: "",
        fromage: "",
        epice: ""
      },
      ingrediantSelected: {
        id: "",
        sauce: [],
        viande: [],
        legume: [],
        fromage: [],
        epice: [],
        total: 0
      },
      ingrediantRemove: {
        id: "",
        sauce: [],
        viande: [],
        legume: [],
        fromage: [],
        epice: []
      },
      cssDynamique: {
        sauce: {},
        viande: {},
        legume: {},
        fromage: {},
        epice: {}
      },
      switchSauce: false,
      switchViande: false,
      switchFromage: false,
      switchLegume: false,
      switchEpice: false,
      addIngrediant_alert: {
        snackbar: false,
        text: "L'ingrédient a bien été ajouté"
      },
      deleteIngrediant_alert: {
        snackbar: false,
        text: "L'ingrédient a bien été supprimé"
      }
    };
  },
  watch: {
    pizza() {
      this.getTotalPricePizza();
    },
    drinks() {
      this.getTotalPriceDrink();
    },
    dessert() {
      this.getTotalPriceDessert();
    }
  },
  props: {
    Thead: Array,
    className: String,
    pizza: Object,
    drinks: Object,
    dessert: Object,
    props: Number
  },
  methods: {
    getTotalPricePizza() {
      let pizzaTotal = 0;
      for (let element of this.pizza.pizzas) {
        pizzaTotal = pizzaTotal + element.price;
      }
      this.$emit("totalPizza", pizzaTotal);
    },
    getTotalIngrediant() {
      let ingrediantTotal = 0;

      for (let element of this.pizza.pizzas) {
        if (element.ingrediantAdded) {
          const {
            epice,
            fromage,
            legume,
            sauce,
            viande
          } = element.ingrediantAdded;
          ingrediantTotal =
            ingrediantTotal +
            epice.length +
            fromage.length +
            legume.length +
            sauce.length +
            viande.length;
        }
      }

      this.$emit("totalIngrediant", ingrediantTotal);
    },
    getTotalPriceDrink() {
      let drinkTotal = 0;
      for (let element of this.drinks.drinks) {
        drinkTotal = drinkTotal + element.price;
      }
      this.$emit("totalDrink", drinkTotal);
    },
    getTotalPriceDessert() {
      let dessertTotal = 0;
      for (let element of this.dessert.desserts) {
        dessertTotal = dessertTotal + element.price;
      }
      this.$emit("totalDessert", dessertTotal);
    },
    getId(e) {
      this.currentSelect.id = e;
      if (this.pizza.pizzas[e].ingrediantAdded !== undefined) {
        this.ingrediantSelected = this.pizza.pizzas[e].ingrediantAdded;
      } else {
        this.ingrediantSelected = {
          id: "",
          sauce: [],
          viande: [],
          legume: [],
          fromage: [],
          epice: [],
          total: 0
        };
      }
      this.dialog = true;
    },
    addIngrediant(e) {
      this.ingrediantSelected.id = this.currentSelect.id;
      const totalLength =
        this.lengthIngrediantSelected() -
        this.lengthIngrediantRemove(this.currentSelect.id);
      if (totalLength < 6) {
        switch (e.path[1].id) {
          case "sauce":
            if (this.currentSelect.sauce === "") break;
            this.ingrediantSelected.sauce.push(this.currentSelect.sauce);
            const totalIngrediantSauce = this.totalIngrediantAllPizza();
            this.$emit(
              "ingrediantAdded",
              this.ingrediantSelected,
              totalIngrediantSauce
            );
            this.currentSelect.sauce = "";
            this.addIngrediant_alert.snackbar = true;
            break;
          case "viande":
            if (this.currentSelect.viande === "") break;
            this.ingrediantSelected.viande.push(this.currentSelect.viande);
            const totalIngrediantViande = this.totalIngrediantAllPizza();
            this.$emit(
              "ingrediantAdded",
              this.ingrediantSelected,
              totalIngrediantViande
            );
            this.currentSelect.viande = "";
            this.addIngrediant_alert.snackbar = true;
            break;
          case "legume":
            if (this.currentSelect.legume === "") break;
            this.ingrediantSelected.legume.push(this.currentSelect.legume);
            const totalIngrediantLegume = this.totalIngrediantAllPizza();
            this.$emit(
              "ingrediantAdded",
              this.ingrediantSelected,
              totalIngrediantLegume
            );
            this.currentSelect.legume = "";
            this.addIngrediant_alert.snackbar = true;
            break;
          case "fromage":
            if (this.currentSelect.fromage === "") break;
            this.ingrediantSelected.fromage.push(this.currentSelect.fromage);
            const totalIngrediantFromage = this.totalIngrediantAllPizza();
            this.$emit(
              "ingrediantAdded",
              this.ingrediantSelected,
              totalIngrediantFromage
            );
            this.currentSelect.fromage = "";
            this.addIngrediant_alert.snackbar = true;
            break;
          case "epice":
            if (this.currentSelect.epice === "") break;
            this.ingrediantSelected.epice.push(this.currentSelect.epice);
            const totalIngrediantEpice = this.totalIngrediantAllPizza();
            this.$emit(
              "ingrediantAdded",
              this.ingrediantSelected,
              totalIngrediantEpice
            );
            this.currentSelect.epice = "";
            this.addIngrediant_alert.snackbar = true;
            break;
          default:
            break;
        }
      } else {
        this.currentSelect[e.path[1].id] = "";
        this.errorIngrediant.snackbar = true;
      }
    },
    getAddIngrediant() {
      if (this.lengthIngrediantSelected() !== 0) {
        const totalIngrediant = this.totalIngrediantAllPizza();
        this.$emit("ingrediantAdded", this.ingrediantSelected, totalIngrediant);
      }

      this.dialog = false;
    },
    deleteIngrediant(event, key) {
      switch (event.path[1].id) {
        case "sauce":
          this.ingrediantSelected.sauce.splice(key, 1);
          const totalIngrediantSauce = this.totalIngrediantAllPizza();
          this.$emit(
            "ingrediantAdded",
            this.ingrediantSelected,
            totalIngrediantSauce
          );
          this.deleteIngrediant_alert.snackbar = true;
          break;
        case "viande":
          this.ingrediantSelected.viande.splice(key, 1);
          const totalIngrediantViande = this.totalIngrediantAllPizza();
          this.$emit(
            "ingrediantAdded",
            this.ingrediantSelected,
            totalIngrediantViande
          );
          this.deleteIngrediant_alert.snackbar = true;
          break;
        case "legume":
          this.ingrediantSelected.legume.splice(key, 1);
          const totalIngrediantLegume = this.totalIngrediantAllPizza();
          this.$emit(
            "ingrediantAdded",
            this.ingrediantSelected,
            totalIngrediantLegume
          );
          this.deleteIngrediant_alert.snackbar = true;
          break;
        case "fromage":
          this.ingrediantSelected.fromage.splice(key, 1);
          const totalIngrediantFromage = this.totalIngrediantAllPizza();
          this.$emit(
            "ingrediantAdded",
            this.ingrediantSelected,
            totalIngrediantFromage
          );
          this.deleteIngrediant_alert.snackbar = true;
          break;
        case "epice":
          this.ingrediantSelected.epice.splice(key, 1);
          const totalIngrediantEpice = this.totalIngrediantAllPizza();
          this.$emit(
            "ingrediantAdded",
            this.ingrediantSelected,
            totalIngrediantEpice
          );
          this.deleteIngrediant_alert.snackbar = true;
          break;

        default:
          break;
      }
    },
    checkLengthArrayIngrediant(key) {
      let check = false;
      if (this.pizza.pizzas[key].ingrediantAdded !== undefined) {
        if (this.pizza.pizzas[key].ingrediantAdded.sauce.length > 0)
          check = true;
        if (this.pizza.pizzas[key].ingrediantAdded.epice.length > 0)
          check = true;
        if (this.pizza.pizzas[key].ingrediantAdded.legume.length > 0)
          check = true;
        if (this.pizza.pizzas[key].ingrediantAdded.fromage.length > 0)
          check = true;
        if (this.pizza.pizzas[key].ingrediantAdded.viande.length > 0)
          check = true;
        return check;
      } else {
        return check;
      }
    },
    lengthIngrediantSelected() {
      let count = 0;

      count = count + this.ingrediantSelected.sauce.length;
      count = count + this.ingrediantSelected.epice.length;
      count = count + this.ingrediantSelected.legume.length;
      count = count + this.ingrediantSelected.fromage.length;
      count = count + this.ingrediantSelected.viande.length;
      return count;
    },
    lengthIngrediantRemove(position) {
      let count = 0;
      if (this.pizza.pizzas[position].ingrediantRemove) {
        count =
          count + this.pizza.pizzas[position].ingrediantRemove.sauce.length;
        count =
          count + this.pizza.pizzas[position].ingrediantRemove.epice.length;
        count =
          count + this.pizza.pizzas[position].ingrediantRemove.legume.length;
        count =
          count + this.pizza.pizzas[position].ingrediantRemove.fromage.length;
        count =
          count + this.pizza.pizzas[position].ingrediantRemove.viande.length;
      }
      return count;
    },
    checkSelectedIngredient(name) {
      let check = false;
      for (var key in this.ingrediantRemove) {
        let ingredient = this.ingrediantRemove[key];
        if (Array.isArray(ingredient)) {
          ingredient.forEach(el => {
            name == ingredient ? (check = true) : "";
          });
        }
      }
      return check;
    },
    addOrRemoveIngrediant(event, key) {
      if (!this.ingrediantRemove.id) this.ingrediantRemove.id = key;
      switch (event.path[4].id) {
        case "switchSauce":
          if (this.pizza.pizzas[key].ingrediantRemove !== undefined) {
            //this.changeCSS(event, key)
            const findElement = this.pizza.pizzas[
              key
            ].ingrediantRemove.sauce.find(
              element => element === event.path[0].innerHTML
            );
            if (findElement === undefined) {
              this.ingrediantRemove.sauce.push(event.path[0].innerHTML);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            } else {
              const positionElement = this.ingrediantRemove.sauce.indexOf(
                event.path[0].id
              );
              this.ingrediantRemove.sauce.splice(positionElement, 1);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            }
          } else {
            this.ingrediantRemove.sauce.push(event.path[0].innerHTML);
            this.$emit(
              "ingrediantRemove",
              this.ingrediantRemove,
              this.totalIngrediantAllPizza()
            );
          }
          this.totalIngrediantAllPizza();
          break;
        case "switchViande":
          if (this.pizza.pizzas[key].ingrediantRemove !== undefined) {
            //this.changeCSS(event, key)
            const findElement = this.pizza.pizzas[
              key
            ].ingrediantRemove.viande.find(
              element => element === event.path[0].innerHTML
            );
            if (findElement === undefined) {
              this.ingrediantRemove.viande.push(event.path[0].innerHTML);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            } else {
              const positionElement = this.ingrediantRemove.viande.indexOf(
                event.path[0].id
              );
              this.ingrediantRemove.viande.splice(positionElement, 1);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            }
          } else {
            this.ingrediantRemove.viande.push(event.path[0].innerHTML);
            this.$emit(
              "ingrediantRemove",
              this.ingrediantRemove,
              this.totalIngrediantAllPizza()
            );
          }
          break;
        case "switchLegume":
          if (this.pizza.pizzas[key].ingrediantRemove !== undefined) {
            const findElement = this.pizza.pizzas[
              key
            ].ingrediantRemove.legume.find(
              element => element === event.path[0].innerHTML
            );
            if (findElement === undefined) {
              this.ingrediantRemove.legume.push(event.path[0].innerHTML);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            } else {
              const positionElement = this.ingrediantRemove.legume.indexOf(
                event.path[0].id
              );
              this.ingrediantRemove.legume.splice(positionElement, 1);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            }
          } else {
            this.ingrediantRemove.legume.push(event.path[0].innerHTML);
            this.$emit(
              "ingrediantRemove",
              this.ingrediantRemove,
              this.totalIngrediantAllPizza()
            );
          }

          break;
        case "switchFromage":
          if (this.pizza.pizzas[key].ingrediantRemove !== undefined) {
            const findElement = this.pizza.pizzas[
              key
            ].ingrediantRemove.fromage.find(
              element => element === event.path[0].innerHTML
            );
            if (findElement === undefined) {
              this.ingrediantRemove.fromage.push(event.path[0].innerHTML);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            } else {
              const positionElement = this.ingrediantRemove.fromage.indexOf(
                event.path[0].id
              );
              this.ingrediantRemove.fromage.splice(positionElement, 1);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            }
          } else {
            this.ingrediantRemove.fromage.push(event.path[0].innerHTML);
            this.$emit(
              "ingrediantRemove",
              this.ingrediantRemove,
              this.totalIngrediantAllPizza()
            );
          }
          break;
        case "switchEpice":
          if (this.pizza.pizzas[key].ingrediantRemove !== undefined) {
            const findElement = this.pizza.pizzas[
              key
            ].ingrediantRemove.epice.find(
              element => element === event.path[0].innerHTML
            );
            if (findElement === undefined) {
              this.ingrediantRemove.epice.push(event.path[0].innerHTML);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            } else {
              const positionElement = this.ingrediantRemove.epice.indexOf(
                event.path[0].id
              );
              this.ingrediantRemove.epice.splice(positionElement, 1);
              this.$emit(
                "ingrediantRemove",
                this.ingrediantRemove,
                this.totalIngrediantAllPizza()
              );
            }
          } else {
            this.ingrediantRemove.epice.push(event.path[0].innerHTML);
            this.$emit(
              "ingrediantRemove",
              this.ingrediantRemove,
              this.totalIngrediantAllPizza()
            );
          }

          break;

        default:
          break;
      }
    },
    totalIngrediantAllPizza() {
      let countTotal = 0;

      for (let element of this.pizza.pizzas) {
        if (element.ingrediantAdded) {
          const {
            viande,
            sauce,
            legume,
            fromage,
            epice
          } = element.ingrediantAdded;
          countTotal =
            countTotal +
            viande.length +
            sauce.length +
            legume.length +
            fromage.length +
            epice.length;
        }
      }
      return countTotal;
    },
    changeCSS(event, key) {
      const getNameDiv = event.path[4].id;
      const ingrediantDelete = this.pizza.pizzas[key].ingrediantRemove;
      const contentSpan = event.path[0].innerHTML;

      switch (getNameDiv) {
        case "switchSauce":
          const findElementSauce = ingrediantDelete.sauce.indexOf(contentSpan);
          if (findElementSauce !== -1) {
            //event.path[0].style.color="green";
            //this.cssDynamique.sauce[key].addIngrediant = true
          } else {
            //event.path[0].style.color="red";
            //this.cssDynamique.sauce[key].deleteIngrediant = false
          }
          break;

        case "switchViande":
          const findElementViande = ingrediantDelete.viande.indexOf(
            contentSpan
          );
          if (findElementViande !== -1) {
            /* event.path[0].style.color="green";
            this.cssDynamique.sauce[key] = "green" */
          } else {
            /* event.path[0].style.color="red";
            this.cssDynamique.sauce[key] = "red" */
          }
          break;

        default:
          break;
      }
    },
    deletePizzaCart(key) {
      this.$emit("deletePizzaCart", key);
    },
    deleteDrinkCart(key) {
      this.$emit("deleteDrinkCart", key);
    },
    deleteDessertCart(key) {
      this.$emit("deleteDessertCart", key);
    }
  },
  computed: {
    ingredients() {
      return this.$store.state.ingredients;
    }
  }
};
</script>

<style>
.ingrediant-add {
  margin: 2px 5px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 3px;
}

.ingrediant-add:hover {
  cursor: pointer;
  color: white;
  background-color: black;
}

.addElement {
  color: green;
}

.deleteElement {
  color: red;
}

.border-element-cart:hover {
  border: 1px solid black;
  border-radius: 10px;
}
</style>
