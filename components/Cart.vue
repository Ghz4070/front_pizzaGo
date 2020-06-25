<template>
  <div class="d-flex flex-column flex-wrap justify-end test .rounded-xl">
      <h1>Panier</h1>
      <div>
          <form>
            <label for="promo">Code promo</label>
            <input type="text">
            <button>Valider</button>
          </form>
      </div>
      <div>
          <table>
            <thead>
                <tr>
                    <th>Pizza</th>
                    <th>Taille</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>name</td>
                    <td>taille</td>
                    <td>Quantité</td>
                    <td>prix</td>
                </tr>
            </tbody>
          </table>
      </div>
      <div>
         <TableCart :thead="tableBoisson" />
      </div>
      <div>
         
      </div>
      <div>
          <p>Total :</p>
          <p>le montant</p>
      </div>
      <a href="">Commander</a>
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
</style>