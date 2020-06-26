<template>
  <div class="d-flex flex-wrap flex-row justify-space-between align-center">
    <img src="~/static/PizzaGo_final.png" height="150" width="150">
    <nav class="navigation d-flex flex-row flex-wrap align-center">
        <template v-if="img">
            <nuxt-link to="">Commander</nuxt-link>
            <nuxt-link to="">Contact</nuxt-link>
            <img src="~/static/user.svg" height="30" width="30">
        </template>
        <template v-else>
            <nuxt-link to="">Connexion</nuxt-link>
            <nuxt-link to="">Inscription</nuxt-link>
            <nuxt-link to="">Commander</nuxt-link>
            <nuxt-link to="">Contact</nuxt-link>
        </template>
    </nav>
  </div>
</template>

<script>
export default {
    data() {
        return {
            img : ''
        }
    },
    mounted() {
        console.log(localStorage.getItem('x-access-token'))
        if(localStorage.getItem('x-access-token')){
            this.img = true
        }else {
            this.img = false
        }
    },
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

    .navigation a:hover {
        background-color: #979797; 
        color: white;
    }

</style>