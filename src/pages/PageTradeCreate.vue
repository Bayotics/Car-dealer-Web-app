<template>
  <div class="trade-create-page">
    <AppHero />
    <section class="section">
      <div class="container">
        <TradeCreateWizard @tradeConfirmed="createTrade"/>
      </div>
    </section>
  </div>
</template>

<script>
  import TradeCreateWizard from '@/components/TradeCreate/TradeCreateWizard'
  export default {
    components: {
      TradeCreateWizard
    },
    computed: {
      categories () {
        return this.$store.state.categories.items
      },
      prices(){
        return this.$store.state.prices.items
      },
      brands(){
        return this.$store.state.brands.items
      }
    },
    created () {
      if (this.categories.length === 0) {
        this.$store.dispatch('categories/fetchCategories')
      }
      if(this.prices.length === 0){
        this.$store.dispatch('prices/fetchPrices')
      }
      if(this.brands.length === 0){
        this.$store.dispatch('brands/fetchBrands')
      }
    },
    methods: {
      createTrade (tradeToCreate) {
        this.$store.dispatch('trades/createTrade', tradeToCreate)
          .then(createdTrade => {
            this.$router.push(`/trades/${createdTrade._id}`)
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>
  .trade-create-page {
    min-height: 100vh;
  }
</style>