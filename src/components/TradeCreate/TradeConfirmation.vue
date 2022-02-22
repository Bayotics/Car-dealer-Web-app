<template>
  <div>
    <h1 class="title m-b-sm">Please confirm entered data</h1>

    <div class="content">
      <div >
        <span class="result-title">
        Location
        </span>
        <p>{{tradeToCreate.location}}</p>
      </div>
      <div>
        <span class="result-title">
        Title
        </span>
        <p>{{tradeToCreate.title}}</p>
      </div>
      <div>
        <span class="result-title">
        Category
        </span>
        <p>{{tradeToCreate.category.name}}</p>
      </div>
      <div>
       <span class="result-title">
        Brand
        </span>
        <p>{{tradeToCreate.brand.name}}</p> 
      </div>
      <div>
         <span class="result-title">
        Price
        </span>
        <p>{{tradeToCreate.price.name}}</p> 
      </div>
       <div>
         <span class="result-title">
        WhatsApp number
        </span>
        <p>{{tradeToCreate.whatsApp}}</p> 
      </div>
      <div>
         <span class="result-title">
        PriceTag
        </span>
        <p>{{tradeToCreate.priceTag}}</p> 
      </div>
      <div>
        <span class="result-title">
        Image
        </span>
        <p>{{tradeToCreate.image}}</p>
      </div>
      <div>
        <span class="result-title">
        Short Info
        </span>
        <p>{{tradeToCreate.shortInfo}}</p>
      </div>
      <div>
        <span class="result-title">
        Description
        </span>
        <p>{{tradeToCreate.description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tradeToCreate: {
        required: true,
        type: Object
      }
    },
    validations: {}
  }
</script>

<style scoped>
  .result-title {
    font-size: 29px;
    font-weight: bold;
  }

  .result-title + p {
    font-size: 20px;
  }
</style>