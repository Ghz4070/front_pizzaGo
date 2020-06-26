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
                        <tr>
                            <td :key="key">{{element.name}}</td>
                            <td :key="key">{{element.size}}</td>
                            <td :key="key">{{element.quantity}}</td>
                            <td :key="key">{{element.price}}</td>
                        </tr>
                    </template>
                </template>
                <template v-if="drinks && Thead[0] === 'Boissons'">
                    <template v-for="(element, key) in drinks.drinks">
                        <tr>
                            <td :key="key">{{element.name}}</td>
                            <td :key="key">{{element.quantity}}</td>
                            <td :key="key">{{element.price}}</td>
                        </tr>
                    </template>
                </template>
                <template v-if="dessert && Thead[0] === 'Desserts'">
                    <template v-for="(element, key) in dessert.desserts">
                        <tr>
                            <td :key="key">{{element.name}}</td>
                            <td :key="key">{{element.quantity}}</td>
                            <td :key="key">{{element.price}}</td>
                        </tr>
                    </template>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    props: {
        Thead: Array,
        className: String,
        pizza: Object,
        drinks: Object,
        dessert: Object,
    },
}
</script>

<style>
</style>