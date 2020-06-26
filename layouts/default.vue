<template>
  <v-app dark>
     <v-main>	
      <v-container fluid="true">	
        <Header />
        <nuxt />	
      </v-container>	
    </v-main>
  </v-app>
</template>

<script>
  import Header from '../components/Header';

export default {
  components : {
    Header,
  },
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    }
  }
}
</script>

<style>
  html, body, #__nuxt, #__layout, #app{
    margin: O;
    color: black;
    background-color: #F0F2F6;
    width: 100%;
    height: 100%;
  }
  .container {
    padding: 0 40px;
  }
</style>
