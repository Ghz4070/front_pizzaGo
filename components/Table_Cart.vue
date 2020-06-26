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
            totalPricePizza : null
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
        }
    }
}
</script>

<style>
</style>