<template>
  <v-app dark>
    <div>
      <Header />
    </div>
     <v-content>	
      <v-container>	
        <nuxt />	
      </v-container>	
    </v-content>
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
