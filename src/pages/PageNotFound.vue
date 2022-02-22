<template>
  <div class="container">
    <ErrorView :title="'Sorry, this page doesn\'t exist'"
                style = "text-align: center"
               :status="'404'"
               :navigateToPage="'PageHome'"
               :navigateToText="'Go back to Home page'" />
  </div>
</template>

<script>
  import ErrorView from '@/components/ErrorView'
  export default {
    components: {
      ErrorView
    }
  }
</script>

<style scoped>
</style>