<template>
  <div class="d-flex flex-column flex-wrap cart-div .rounded-xl">
        <div class="d-flex flex-column flex-wrap justify-space-around align-center align-content-space-between max-width">
            <h1>Panier</h1>
            <form @submit="submitPromo">
                <label for="promo">Code promo</label>
                <div class="d-flex flex-row flex-wrap justify-space-around form">
                    <input type="text" required>
                    <button>Valider</button>
                </div>
            </form>
                <TableCart @totalPizza="totalPizza" :thead="tablePizza" :pizza="cart.contents" className=" d-flex flex-row flex-wrap justify-space-around max-width"/>
                <TableCart @totalDrink="totalDrink" :thead="tableBoisson" :drinks="cart.contents" className="d-flex flex-row flex-wrap justify-space-around max-width"/>
                <TableCart @totalDessert="totalDessert" :thead="tableDessert" :dessert="cart.contents" className="d-flex flex-row flex-wrap justify-space-around max-width"/>
            <div class="d-flex flex-row flex-wrap justify-space-around max-width">
                <p>Total :</p>
                <template v-if="promo">
                    <p>{{promo}}%</p>
                    <p>{{(totalPrice.total - ( totalPrice.total * (promo/100) ))}} €</p>
                    <p>{{totalPrice.total}} €</p>
                </template>
                <template v-else> 
                    <p>{{totalPrice.total}}€</p>
                </template>
            </div>
            <a class="buy-button" href="">Commander</a>
        </div>
    </div>  
</template>

<script>
import TableCart from './Table_Cart';
import axios from 'axios';

export default {
    components: {
        TableCart
    },
    props: {
        boolStorage: Boolean
    },
    data() {
        return {
            tablePizza : ['Pizza', 'Taille', 'Prix'], 
            tableBoisson : ['Boissons', 'Prix'],
            tableDessert : ['Desserts', 'Prix'],
            promo:null,
            cart: {},
            totalPrice:{pizza:0, drink: 0, dessert: 0, total:0}
        }
    },
    watch: {
        boolStorage() {
            const local = localStorage.getItem('datas');
            const stringToJSON = JSON.parse(local);
            return this.cart = stringToJSON
        }
    },
    methods: {
        async submitPromo(e) {
            e.preventDefault();
            if(e.target[0].value.trim() === "") return console.log('Veuillez remplir le champs');
            await this.checkPromo(e.target[0].value)
        },
        async checkPromo(namePromo) {
            const getPromo = await axios.get(`http://localhost:4000/api/v1/promo/name/${namePromo}`);
            const { result } = getPromo.data;
            if(result === "No Promo found for this Name") return console.log('pas de promo');
            this.promo = result.promoes[0].amount;
        },
        totalPizza(e) {
            this.totalPrice.pizza = e;
            this.totalPrice.total = this.totalPrice.pizza + this.totalPrice.drink + this.totalPrice.dessert; 
        },
        totalDrink(e) {
            this.totalPrice.drink = e;
            this.totalPrice.total = this.totalPrice.pizza + this.totalPrice.drink + this.totalPrice.dessert; 
        },
        totalDessert(e) {
            this.totalPrice.dessert = e;
            this.totalPrice.total = this.totalPrice.pizza + this.totalPrice.drink + this.totalPrice.dessert; 
        }
    }
}
</script>

<style>
    .cart-div {
        height: 100%;
        border: 1px solid #e0e0e0;
        background-color: white;
        border-radius: 30px;
    }

    .max-width {
        width: 100%;
        margin: 10% 0;
    }

    .form input {
        border: 1px solid #979797;
        border-radius: 3px;
        width: 72%
    }

    .form button {
        padding: 2px;
        background-color: #BA7070;
        color:white;
        border-radius: 3px;
    } 

    .buy-button {
        padding: 10px 50px;
        background-color: #BA7070;
        border-radius: 20px;
        text-decoration:none;
    }

    .buy-button a {
        color:white
    }
</style>