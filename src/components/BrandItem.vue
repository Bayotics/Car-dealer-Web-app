<template>
  <div class="column is-one-quarter" :style="{'min-height': '160px'}">
    <router-link style = "text-decoration: none;" :to="{name: 'PageTradeFindBrand',
     params: {brand: brand.name}}">
      <span>
        <figure class="image is-4by3 imageFade">
          <img class="is-rounded" :src="brand.image">
        </figure>
        <div class="subtitle m-t-xs bold">{{brand.name | capitalize}}</div>
      </span>
    </router-link>
  </div>
</template>

<script>
  export default {
    props: {
      brand: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style scoped>
  .is-rounded {
    border-radius: 10px !important;
  }
</style>