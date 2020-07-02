<template>
<div>
  <v-tabs class="tabs cursor-font" @change="changeTab(currentTab)" centered v-model="currentTab" background-color="white" color="black">
        <v-tab v-for="item in items" :key="item.tab">{{ item.tab }}</v-tab>
    </v-tabs>
    <div v-if="currentTab == 0">
        <Profile />
    </div>
    <div v-if="currentTab == 1">
        <History />
    </div>
</div>
</template>

<script>
import Profile from './Profile';
import History from './History';


export default {
    components : {
    Profile,
    History
  },
  data: function() {
    return {
      localisation: "Aubervilliers",
      currentTab: 0,
      items: [
        { tab: "Profile" },
        { tab: "Historique Commande" },
      ],
      boolCart : false,
    };
  },
  methods: {
    changeTab(val) {
      this.currentTab = val;
    }
  }
  
};
</script>

<style>
</style>