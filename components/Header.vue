<template>
  <div class="d-flex flex-wrap flex-row justify-space-between align-center">
    <img src="~/static/PizzaGo_final.png" height="150" width="150">
    <nav class="navigation">
        <nuxt-link to="">Connexion</nuxt-link>
        <nuxt-link to="">Inscription</nuxt-link>
        <nuxt-link to="">Commander</nuxt-link>
        <nuxt-link to="">Contact</nuxt-link>
    </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>

    .navigation a {
        padding: 10px 10px;
        margin: 0px 10px;
        text-decoration: none;
        color: black;
        border: 1px solid #979797;
        border-radius: 10px;
        background-color: white; 
    }

</style>