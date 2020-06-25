<template>
  <div class="d-flex flex-column flex-wrap test .rounded-xl">
        <div class="d-flex flex-column flex-wrap justify-space-around align-center max-width">
            <h1>Panier</h1>
            <form @submit="submitPromo">
                <label for="promo">Code promo</label>
                <div class="d-flex flex-row flex-wrap">
                    <input type="text" required>
                    <button>Valider</button>
                </div>
            </form>
                <TableCart :thead="tablePizza" className=" d-flex flex-row flex-wrap justify-space-around max-width"/>
                <TableCart :thead="tableBoisson" className="d-flex flex-row flex-wrap justify-space-around max-width"/>
                <TableCart :thead="tableDessert" className="d-flex flex-row flex-wrap justify-space-around max-width"/>
            <div class="d-flex flex-row flex-wrap justify-space-around max-width">
                <p>Total :</p>
                <p>le montant</p>
            </div>
            <a href="">Commander</a>
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
            tablePizza : ['Pizza', 'Taille', 'Quantité', 'Prix'], 
            tableBoisson : ['Boissons', 'Quantité', 'Prix'],
            tableDessert : ['Desserts', 'Quantité', 'Prix'],
            promo:null,
            cart: {}
        }
    },
    watch() {
        const local = localStorage.getItem('datas');
        const stringToJSON = JSON.parse(local);
        this.cart= stringToJSON;
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
        }
    }
}
</script>

<style>
    .test {
        height: 100%;
        width: 23%;
        border: 1px solid black;
        background-color: white;
    }

    .max-width {
        width: 100%;
    }
</style>