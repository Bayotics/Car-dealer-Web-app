<template>
  <body>
    <div v-if= "pageLoader_isDataLoaded" id = "mainDiv">
        <div id="template-mo-zay-hero-carousel"  data-bs-ride="carousel">
                <div class="" id = "carousel-one">
                    <div class="modal fade bg-white" id="templatemo_search" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg" role="document">
                            <div class="w-100 pt-1 mb-5 text-right">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <form action="" method="get" class="modal-content modal-body border-0 p-0">
                                <div class="input-group mb-2">
                                    <input type="text" class="form-control" id="inputModalSearch" name="q" placeholder="Search ...">
                                    <button type="submit" class="input-group-text bg-success text-light">
                                        <i class="fa fa-fw fa-search text-white"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="container">
                        <div class="row p-5">
                            <div class="col-lg-6 mb-0 d-flex align-items-center">
                                <div class="text-align-left align-self-center">
                                    <h1 id = "main-title" class=""><b>CADILAR</b> Inc.</h1>
                                    <h3 class="h2">Sell your car in <i> 30 minutes!</i> </h3>
                                    <p style = " font-size: 20px; margin-top: 50px; color: white;">
                                         we listen to our customers and deliver a top tier service that allows users to feel the pride,
                                         respect and trust of everyone at our company. 
                                         We focus on guiding employees to create high-standard services and deliver excellent results
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class = "align-items-center" >
                        <router-link style = "text-decoration: none; color: white;" :to="{name: 'PageTradeFind'}">
                        <button type="button" style = "color: white; background-color: #209cee; font-size: 21px;"
                         class="btn btn-info btn-lg">   FIND YOUR CAR NOW!</button>
                        </router-link>
                    </div>
                </div>
        </div>
        <!-- End Banner Hero -->
        <div class = "container" id = "sales">
           <section class="section">
        <div class = "container">
      <div class="m-b-lg">
        <h1 class="title is-inline">Recent Posts 
          <span v-if="ipLocation"> in {{ipLocation}}</span>
        </h1>
        <router-link style = "text-decoration: none;" v-if="user" :to="{name: 'PageTradeCreate'}" class="button is-info is-pulled-right m-r-sm">Sell</router-link>
        <router-link style = "text-decoration: none; color: white;" :to="{name: 'PageTradeFind'}"
                     class="button is-info is-pulled-right m-r-sm">
                   Buy
        </router-link>
      </div>
        </div>
      <div class="row columns is-multiline">
        <TradeItem v-for="trade in trades"  
                    :key="trade._id"
                    :trade="trade" />
      </div>
      </section>
            <section class="section">
        <div>
          <h1 class="title">Categories</h1>
          <div class="columns cover is-multiline is-mobile">
            <CategoryItem v-for="category in categories"
                          :key="category._id"
                          :category="category" />
          </div>
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Price</h1>
          <div class="columns cover is-multiline is-mobile">
            <PriceItem v-for="price in prices"
                          :key="price._id"
                          :price="price" />
          </div>
        </div>
      </section>
      <section class="section">
        <div>
          <h1 class="title">Brands</h1>
          <div class="columns cover is-multiline is-mobile">
            <BrandItem v-for="brand in brands"
                          :key="brand._id"
                          :brand="brand" />
          </div>
        </div>
      </section>
        </div>
        <section class="container py-5">
            <div class="row text-center pt-3">
                <div class="col-lg-6 m-auto">
                    <h1 class="h1">Vendors of The Week</h1>
                    <p>
                        Vendors are selected based on overall customer ratings (Coming soon)
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 col-md-4 p-5 mt-3">
                    <a href="#"><img style="height: 300px; width: 300px;" src="https://media.istockphoto.com/photos/panda-bear-face-isolated-on-white-background-picture-id1154796517?b=1&k=20&m=1154796517&s=170667a&w=0&h=jQ8wa-0Gc0ROtRllyBWUVGvHhhIqx7r8KKX-YpOAjI4=" class="img-responsive rounded-circle img-fluid border"></a>
                    <h5 class="text-center mt-3 mb-3">Good will Motors</h5>
                    <p class="text-center"><a class="btn" style ="background-color: #209cee" >View Profile</a></p>

                    <ul class="list-unstyled d-flex" style = "place-content: center;">
                                    <li class = "text-center">
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                    </li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 p-5 mt-3">
                    <a href="#"><img style = "height: 300px; width: 300px;" src="https://images.unsplash.com/photo-1612940960267-4549a58fb257?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWFsJTIwcG9ydHJhaXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" class="rounded-circle img-fluid border"></a>
                    <h2 class="h5 text-center mt-3 mb-3">Okunola Moshood</h2>
                    <p class="text-center"><a class="btn" style = "background-color:#209cee">View Profile</a></p>
                    <ul class="list-unstyled d-flex" style = "place-content: center;">
                                    <li>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                    </li>
                    </ul>
                </div>
                <div class="col-12 col-md-4 p-5 mt-3">
                    <a href="#"><img style = "height: 300px; width: 300px;" src="https://media.istockphoto.com/photos/closeup-portrait-of-funny-ginger-cat-wearing-sunglasses-isolated-on-picture-id1188445864?b=1&k=20&m=1188445864&s=170667a&w=0&h=ykbgM-be6AMYYp1NqqQVTrvxXV7_lyLK4H0S0dlVBlk=" class="rounded-circle img-responsive img-fluid border"></a>
                    <h2 class="h5 text-center mt-3 mb-3">Saleem Autos</h2>
                    <p class="text-center"><a class="btn" style = "background-color: #209cee">View Profile</a></p>
                      <ul class="list-unstyled d-flex" style = "place-content: center;">
                                    <li>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-warning fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                        <i class="text-muted fa fa-star"></i>
                                    </li>
                     </ul>
                </div>
            </div>
        </section>
        <section class="bg-light">
            
        </section>
          </div>
  </body>
</template>

<script>
   import CategoryItem from '@/components/CategoryItem'
   import BrandItem from '@/components/BrandItem'
   import PriceItem from '@/components/PriceItem'
  import TradeItem from '@/components/TradeItem'
  import { mapActions, mapState, mapGetters } from 'vuex'
  import pageLoader from '@/mixins/pageLoader'
  import { processLocation } from '@/helpers'

  export default {
    components: {
      CategoryItem,
      TradeItem,
      BrandItem,
      PriceItem
    },
    mixins: [pageLoader],
    computed: {
      ...mapGetters({
        'user': 'auth/authUser',
        'ipLocation': 'meta/location'
      }),
      ...mapState({
        trades: state => state.trades.items,
        categories: state => state.categories.items,
        prices: state => state.prices.items,
        brands: state => state.brands.items

      })
    },
    created () {
      const filter = {}
      if (this.ipLocation) {
        filter['location'] = processLocation(this.ipLocation) 
      }

      Promise.all([this.fetchTrades({filter}), this.fetchCategories(), this.fetchPrices(), this.fetchBrands()])
        .then(() => this.pageLoader_resolveData())
        .catch((err) => {
          console.error(err)
          this.pageLoader_resolveData()
        })
    },
    methods: {
      ...mapActions('trades', ['fetchTrades']),
      ...mapActions('categories', ['fetchCategories']),
      ...mapActions('prices', ['fetchPrices']),
      ...mapActions('brands', ['fetchBrands'])
    }
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,500;1,400&display=swap');

#main-title{
    color:white;
}
#mainDiv{
    background-color: #e5e5e9
}

#carousel-one{
    background-image: url('./assets/img/new-car-banner.jpg');
    color: white;
    background-repeat: no-repeat;
    background-size: cover;
    height: 900px;
}
.mb-0 {
    padding-top: 100px;
}
.btn{
    line-height: 2.5;
    display: block;
    margin: auto;
    font-size: 20px;
    width: 250px;
    background: center;

}
.navbar{
    /* height: 30px; */
    display: contents;
}
</style>