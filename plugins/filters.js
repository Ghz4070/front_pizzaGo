import Vue from 'vue'

Vue.filter('euroSign', (value) => {
  return value + '€';
});

Vue.filter('volumeSign', (value) => {
  return value + 'cL';
});
