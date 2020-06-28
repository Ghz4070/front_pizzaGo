<template>
  <div class="d-flex flex-column flex-wrap cart-div .rounded-xl cart-container">
        <div class="d-flex flex-column flex-wrap justify-space-around align-center align-content-space-between max-width cursive-font">
            <h1 class="cursive-font">Panier</h1>
            <form @submit="submitPromo">
                <label for="promo">Code promo</label>
                <div class="d-flex flex-row flex-wrap justify-space-around form">
                    <input type="text" required>
                    <button>Valider</button>
                </div>
            </form>
                <TableCart @totalPizza="totalPizza" @ingrediantAdded="ingrediantAdded" @ingrediantRemove="ingrediantRemove" :Thead="tablePizza" :pizza="cart.contents" className=" d-flex flex-row flex-wrap justify-space-around max-width"/>
                <TableCart @totalDrink="totalDrink" :Thead="tableBoisson" :drinks="cart.contents" className="d-flex flex-row flex-wrap justify-space-around max-width"/>
                <TableCart @totalDessert="totalDessert" :Thead="tableDessert" :dessert="cart.contents" className="d-flex flex-row flex-wrap justify-space-around max-width"/>
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
            <a class="buy-button center" href="">Payer - {{ promo ? (totalPrice.total - ( totalPrice.total * (promo/100) )) : totalPrice.total }} €</a>
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
        },
        ingrediantAdded(ingrediantObject) {
            const { id } = ingrediantObject;
            this.cart.contents.pizzas[id].ingrediantAdded = ingrediantObject; 
            
            const newJson = {
                contents: this.cart.contents
            }
            
            const JSONtostring = JSON.stringify(newJson);
            localStorage.setItem('datas', JSONtostring);
        },
        ingrediantRemove(ingrediantRemove) {
            const { id } = ingrediantRemove;
            this.cart.contents.pizzas[id].ingrediantRemove = ingrediantRemove;

            const newJson = {
                contents: this.cart.contents
            }
            
            const JSONtostring = JSON.stringify(newJson);
            localStorage.setItem('datas', JSONtostring);
        }
    }
}
</script>

<style>
h1.cursive-font {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    background-color: white;
    width: inherit;
    text-align: center;
}
.cart-container {
    position:fixed;
}
.cart-div {
    height: calc(80% - 173px) !important;
    overflow-y:auto;
    overflow-x:hidden;
}
table {
  margin-left: 5px;
  width: 100%;
}
    .cart-div {
        height: 100%;
        border: 1px solid #e0e0e0;
        background-color: white;
        border-radius: 30px;
    }

    .max-width {
        width: 100%;
        padding: 0px 0px 30px 0px;
    }

    .form input {
        border: 1px solid #979797;
        border-radius: 3px;
  width: 72%;
    }

    .form button {
        padding: 2px;
  background-color: #ba7070;
  color: white;
        border-radius: 3px;
    } 

    .buy-button {
        padding: 10px 50px;
        background-color: #ba70709c;
        border-radius: 20px;
        text-decoration: none;
        border: 1px solid #906767;
        position: fixed;
        bottom: 200px;
    }

    .buy-button:hover {
        background-color: white;
        color: #ba7070;
        border: 1px solid #ba7070;
    }

    .buy-button a {
  color: white;
}

a.buy-button {
  color: white;
  text-decoration: none;
}
thead {
  line-height: 40px;
    }

</style>