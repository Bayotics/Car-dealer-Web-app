<template>
  <div class="column is-one-third">
    <!-- <router-link :to="'/trades/' + trade._id" class="card large"> -->
    <div class="card large">
      <router-link style = "text-decoration: none;" :to="{name: 'PageTradeDetail', params: {id: trade._id}}" class="card-trade-link" >  
        <div class="card-image ">
          <figure class="image is-4by3">
              <div class = "is-hoverable">
                <img :src="trade.image"  alt="Image">
              </div>
          </figure> 
            <h1 style = "text-align: center" class="title is-4 no-padding is-marginless">{{trade.title}}</h1>

        </div>
        <div class="card-content">
          <div class="level m-b-md">
            <div class="media-left">
              <div class="level-item has-text-centered">
                <div>
                  <p class="title">{{trade.createdAt | formatDate('MMM')}}</p>
                  <p class="title">{{trade.createdAt | formatDate('D')}}</p>
                </div> 
              </div>
            </div>
            <div class="media-content">
                    <b><h5 style = ""  class= "">₦{{trade.priceTag | numberWithSpaces}}</h5></b>
                <span class="tag"  style = "color: white; background-color: #209cee">{{trade.brand.name | capitalize}}</span>

                <p class="subtitle is-7">{{trade.location}}</p>
            </div>
          </div>
          <div class="content">
              {{trade.description}}
              <div class="background-icon"><span class="icon-barcode"></span></div>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      trade: {
        required: true,
        type: Object
      }
    }
  }
</script>

<style scoped>
  .card-trade-link {
    color: black;
  }

  .is-hoverable {
    transition: 5.3s;
}
    .is-hoverable :hover {
      -webkit-box-shadow: 2px 4px 15px -2px rgb(19, 18, 18);
      -moz-box-shadow: 2px 4px 15px -2px rgb(15, 15, 15);
      box-shadow: 2px 4px 15px -2px rgb(15, 15, 15);
    }
</style>