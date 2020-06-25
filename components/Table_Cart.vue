<template>
  <table>
      <thead>
          <tr>
              <td v-for="(title, index) in Thead" :key="index">{{title}}</td>
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