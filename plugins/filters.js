import Vue from 'vue'

Vue.filter('euroSign', (value) => {
  return value + '€';
});

Vue.filter('volumeSign', (value) => {
  return value + 'cL';
});

Vue.filter('formatDate', (value) => {
  const date = new Date(value).toLocaleDateString()
  return date;
});
