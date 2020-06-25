<template>
  <div class="d-flex flex-column flex-wrap test .rounded-xl">
        <div class="d-flex flex-column flex-wrap justify-space-around align-center max-width">
            <h1>Panier</h1>
            <div>
                <form>
                    <label for="promo">Code promo</label>
                    <div class="d-flex flex-row flex-wrap">
                        <input type="text">
                        <button>Valider</button>
                    </div>
                </form>
            </div>
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

export default {
    components: {
        TableCart
    },
    data() {
        return {
            tablePizza : ['Pizza', 'Taille', 'Quantité', 'Prix'], 
            tableBoisson : ['Boissons', 'Quantité', 'Prix'],
            tableDessert : ['Desserts', 'Quantité', 'Prix']
        }
    }
}
</script>

<style>
    .test {
        height: 100%;
        width: 23%;
        border: 3px solid black
    }

    .max-width {
        width: 100%;
    }
</style>