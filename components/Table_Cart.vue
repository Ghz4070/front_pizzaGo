<template>
  <table>
      <thead>
          <tr v-for="(title, index) in THead" :key="index">
              <td>{{title}}</td>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>test</td>
          </tr>
      </tbody>
  </table>
</template>

<script>
export default {
    props: {
        Thead: Array
    },
}
</script>

<style>

</style>