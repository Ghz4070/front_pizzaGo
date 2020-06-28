<template>
    <div :class="className">
        <table>
            <thead>
                <tr>
                    <td v-for="(title, index) in Thead" :key="index">{{title}}</td>
                </tr>
            </thead>
            <tbody>
                <template v-if="pizza && Thead[0] === 'Pizza' ">
                    <template v-for="(element, key) in pizza.pizzas">
                        <tr :key="key">
                            <td :key="element.name">{{element.name}}</td>
                            <td :key="element.size">{{element.size}}</td>
                            <td :key="element.price">{{element.price}} €</td>
                            <td @click="getId(key)">Modifier</td>
                            <v-dialog
                                v-model="dialog"
                                max-width="390"
                            >
                                <v-card class="pt-3 pr-3 pb-3 pl-3">
                                    <v-card-title class="headline">Ingrédiant</v-card-title>
                                    <div class="d-flex flex-row flex-wrap" id="sauce">
                                        <v-select
                                            v-model="currentSelect.sauce"
                                            label="Sauces" 
                                            :items="ingredients.ingredients.sauces.items"
                                        />
                                        <button @click="addIngrediant">Ajouter</button>
                                    </div>
                                    <div class="d-flex flex-row flex-wrap" id="viande">
                                        <v-select
                                            v-model="currentSelect.viande"
                                            label="Viandes" 
                                            :items="ingredients.ingredients.viandes.items"
                                        />
                                        <button @click="addIngrediant">Ajouter</button>
                                    </div>
                                    <div class="d-flex flex-row flex-wrap" id="legume">
                                        <v-select
                                            v-model="currentSelect.legume"
                                            label="Légumes" 
                                            :items="ingredients.ingredients.legumes.items"
                                        />
                                        <button @click="addIngrediant">Ajouter</button>
                                    </div>
                                    <div class="d-flex flex-row flex-wrap" id="fromage">
                                        <v-select
                                            v-model="currentSelect.fromage"
                                            label="Fromages" 
                                            :items="ingredients.ingredients.fromages.items"
                                        />
                                        <button @click="addIngrediant">Ajouter</button>
                                    </div>
                                    <div class="d-flex flex-row flex-wrap" id="epice">
                                        <v-select
                                            v-model="currentSelect.epice"
                                            label="Epices" 
                                            :items="ingredients.ingredients.epices.items"
                                        />
                                        <button @click="addIngrediant">Ajouter</button>
                                    </div>

                                    <v-card-actions>
                                    <v-spacer></v-spacer>

                                    <v-btn
                                        color="green darken-1"
                                        text
                                        @click="getAddIngrediant(key)"
                                    >
                                        Valider
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </tr>
                    </template>
                </template>
                <template v-if="drinks && Thead[0] === 'Boissons'">
                    <template v-for="(element, key) in drinks.drinks">
                        <tr :key="key">
                            <td :key="element.name">{{element.name}}</td>
                            <td :key="element.price">{{element.price}} €</td>
                        </tr>
                    </template>
                </template>
                <template v-if="dessert && Thead[0] === 'Desserts'">
                    <template v-for="(element, key) in dessert.desserts">
                        <tr :key="key">
                            <td :key="element.name">{{element.name}}</td>
                            <td :key="element.price">{{element.price}} €</td>
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
            totalPricePizza : null,
            dialog: false,
            currentSelect : {
                id: '',
                sauce : '',
                viande: '',
                legume: '',
                fromage: '',
                epice: ''
            },
            ingrediantSelected: {
                id:'',
                sauce : [],
                viande: [],
                legume: [],
                fromage: [],
                epice: []
            }
        }
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
    },
    methods: {
        getTotalPricePizza() {
            let pizzaTotal = 0;
            for(let element of this.pizza.pizzas){
                pizzaTotal = pizzaTotal + element.price;
            }
            this.$emit("totalPizza",pizzaTotal);
        },
        getTotalPriceDrink() {
            let drinkTotal = 0;
            for(let element of this.drinks.drinks){
                drinkTotal = drinkTotal + element.price;
            }
            this.$emit("totalDrink", drinkTotal);
        },
        getTotalPriceDessert() {
            let dessertTotal = 0;
            for(let element of this.dessert.desserts){
                dessertTotal = dessertTotal + element.price;
            }
            this.$emit("totalDessert", dessertTotal);
        },
        getId(e){
            this.currentSelect.id = e;
            this.dialog = true;
        }
        ,
        addIngrediant(e){
            if(!this.ingrediantSelected.id) this.ingrediantSelected.id = this.currentSelect.id;
            switch (e.path[1].id) {
                case 'sauce':
                    this.ingrediantSelected.sauce.push(this.currentSelect.sauce)
                    break;
                case 'viande':
                    this.ingrediantSelected.viande.push(this.currentSelect.viande)
                    break;
                case 'legume':
                    this.ingrediantSelected.legume.push(this.currentSelect.legume)
                    break;
                case 'fromage':
                    this.ingrediantSelected.fromage.push(this.currentSelect.fromage)
                    break;
                case 'epice':
                    this.ingrediantSelected.epice.push(this.currentSelect.epice)
                    break;
                default:
                    break;
            }
        },
        getAddIngrediant() {
            this.$emit("ingrediantAdded",this.ingrediantSelected);
            this.dialog = false;
        }
    },
    computed: {
        ingredients() {
            return this.$store.state.ingredients
        }
    }
}
</script>

<style>
</style>