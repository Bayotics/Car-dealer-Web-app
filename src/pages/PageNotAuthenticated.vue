<template>
  <div class="container">
    <ErrorView :title="'You are not authorized to view this page. Please login'"
               :status="'401'"
               :navigateToPage="'PageLogin'"
               :navigateToText="'Navigate to Login Page'" />
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