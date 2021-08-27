<template>
  <b-container>
    <h1>Home Page</h1>
  </b-container>
</template>

<script>
export default {
  name: "Vw-home.vue",
  components: {},
  methods: {},
  mounted() {
    this.$store.commit("umumi/sayfaBasligi", "Home Page");
  },
  created() {},
};
</script>

<style scoped>
</style>
