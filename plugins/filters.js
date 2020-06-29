import Vue from 'vue'

Vue.filter('euroSign', (value) => {
  return value + '€';
});
