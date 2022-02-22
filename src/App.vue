<template>
  <div v-if= "isAuthResolved && isLocationResolved" id="app">
    
    <div class="page-wrapper">
      <TheNavbar />
      <router-view :key="$route.path" />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from '@/components/shared/TheNavbar'
import TheFooter from '@/components/shared/TheFooter'
export default {
  name: 'app',
  components: {
    TheNavbar,
    TheFooter
  },
  computed: {
    isAuthResolved () {
      return this.$store.state.auth.isAuthResolved
    },
    isLocationResolved () {
      return this.$store.state.meta.isLocationResolved
    }
  },
  created () {
    this.$store.dispatch('meta/fetchMetaData')
  }
}
</script>

<style>
@import 'assets/css/spacing.css';
@import 'assets/css/bootstrap.min.css';
@import 'assets/css/templatemo.css';
@import 'assets/css/custom.css';
@import 'assets/css/fontawesome.min.css';
@import '~bulma/bulma.sass';
@import '~bootstrap/dist/css/bootstrap.css';
@import '~bootstrap-vue/dist/bootstrap-vue.css';
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,500;1,400&display=swap');



/* @import 'node_modules/bootstrap/scss/bootstrap.scss';
@import 'node_modules/bootstrap-vue/src/index.scss'; */
#app {
  font-family: 'Poppins',sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.page-wrapper {
  min-height: 55vh;
  font-family: -webkit-pictograph;
}
.bold {
  font-weight: bold;
}
.cover {
  background-size: cover;
  /*background-position: center;*/
  background-repeat: no-repeat;
  background-attachment: fixed;
}
.hero {
  position: relative;
}
.hero-body {
  padding: 3rem 1.5rem;
}
.hero-bg {
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1585503418537-88331351ad99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyJTIwZGVhbGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
}
</style>