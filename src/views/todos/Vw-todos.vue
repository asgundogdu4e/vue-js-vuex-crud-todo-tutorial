<template>
  <b-container>
    <Cmptodos></Cmptodos>
  </b-container>
</template>

<script>
import Cmptodos from "./../../components/todos/Cmp-todos.vue";
export default {
  name: "Vw-todos.vue",
  components: { Cmptodos },
  methods: {},
  mounted() {
    this.$store.commit("umumi/sayfaBasligi", "");
  },
  created() {},
};
</script>

<style scoped>
</style>
