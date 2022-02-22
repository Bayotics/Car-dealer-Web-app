<template>
  <div class="trade-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
            {{trade.startDate | formatDate}}
          </h2>
          <div class="field">
            <input v-model="trade.title"
                   class="title input w-50"
                   type="text">
          </div>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <img class="is-rounded" :src="tradeCreator.avatar">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  Created by <strong>{{tradeCreator.name}}</strong>
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="is-pulled-right">
          <button @click="updateTradeHandler"
                  class="button is-success is-large">Update</button>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-3">
            <aside class="is-medium menu">
              <div class="trade-side-box">
                <div class="trade-side-box-date m-b-sm">
                  <p><b>Time</b></p>
                  <datepicker
                    @input="setDate"
                    :value="trade.startDate"
                    :disabledDates="disabledDates"
                    :input-class="'input'"></datepicker>
                    <div class="field m-t-md">
                    <vue-timepicker v-model="trade.timeFrom"
                                    @change="changeTime($event, 'timeFrom')"
                                    :minute-interval="10"></vue-timepicker>
                  </div>
                  <div class="field">
                    <vue-timepicker v-model="trade.timeTo"
                                    @change="changeTime($event, 'timeTo')"
                                    :minute-interval="10"></vue-timepicker>
                  </div>
                </div>
                <div class="trade-side-box-place m-b-sm">
                  <p><b>Choose Category</b></p>
                  <div class="field">
                    <div class="select">
                      <select v-model="trade.category">
                        <option v-for="category of categories"
                                :value="category"
                                :key="category.id">{{category.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="trade-side-box-place m-b-sm">
                  <p><b>Choose Brand</b></p>
                  <div class="field">
                    <div class="select">
                      <select v-model="trade.brand">
                        <option v-for="brand of brands"
                                :value="brand"
                                :key="brand.id">{{brand.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="trade-side-box-place m-b-sm">
                  <p><b>Choose Price</b></p>
                  <div class="field">
                    <div class="select">
                      <select v-model="trade.Price">
                        <option v-for="price of prices"
                                :value="price"
                                :key="price.id">{{price.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="trade-side-box-place m-b-sm">
                  <p><b>How to find us</b></p>
                  <div class="field">
                    <input v-model="trade.location"
                           class="input"
                           type="text">
                  </div>
                </div>
                <div class="trade-side-box-more-info">
                  <p><b>Additional Info</b></p>
                  <div class="field">
                    <textarea v-model="trade.shortInfo"
                              class="textarea"
                              rows="5"></textarea>
                  </div>
                </div>
              </div>
              <div class="trade-side-box-map">
                <img src="https://cnet2.cbsistatic.com/img/H_zPLL8-QTZOLxJvgHQ1Jkz0EgY=/830x467/2013/07/10/f0bcef02-67c2-11e3-a665-14feb5ca9861/maps_routemap.png" class="venueMap-mapImg span--100" alt="Location image of trade venue">
              </div>
            </aside>
          </div>
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <h3 class="title is-3">About the Trade</h3>
              <textarea v-model="trade.description"
                        class="textarea"
                        rows="5"></textarea>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import Datepicker from 'vuejs-datepicker'
  import VueTimepicker from 'vue2-timepicker'
  import {mapActions} from 'vuex'
  import moment from 'moment'
  export default {
    components: {
      Datepicker,
      VueTimepicker
    },
    props: {
      tradeId: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        disabledDates: {
          customPredictor: function (date) {
            const today = new Date()
            const yesterday = today.setDate(today.getDate() - 1)
            return date < yesterday
          }
        }
      }
    },
    computed: {
      trade () {
        const trade = this.$store.state.trades.item
        if (this.hasValue(trade)) {
          const timeTo = this.parseTime(trade.timeTo)
          const timeFrom = this.parseTime(trade.timeFrom)
          return {...trade, timeFrom, timeTo}
        }
        return {}
      },
      categories () {
        return this.$store.state.categories.items
      },
      prices(){
        return this.$store.state.prices.items
      },
      brands(){
        return this.$store.state.brands.items
      },
      tradeCreator () {
        return this.trade.tradeCreator || {}
      },
      authUser () {
        return this.$store.state.auth.user
      }
    },
    created () {
      this.fetchTradeByIdHandler()
      this.fetchCategories()
      this.fetchPrices()
      this.fetchBrands()
    },
    methods: {
      ...mapActions('trades', ['fetchTradeById', 'updateTrade']),
      ...mapActions('categories', ['fetchCategories']),
      ...mapActions('brands', ['fetchBrands']),
      ...mapActions('prices', ['fetchPrices']),
      fetchTradeByIdHandler () {
        this.fetchTradeById(this.tradeId)
          .then(trade => {
            if (trade.tradeCreator._id !== this.authUser._id) {
              this.$router.push({path: '/not-authorized'})
            }
          })
          .catch(err => console.log(err))
      },
      updateTradeHandler () {
        this.updateTrade(this.trade)
          .then(() => {
            this.$toasted.success('Trade Succesfuly Updated!', {duration: 3000})
          })
          .catch(err => console.log(err))
      },
      parseTime (time) {
        const [HH, mm] = time
        return {HH, mm}
      },
      setDate (date) {
        this.trade.startDate = moment(date).format()
      },
      changeTime ({data}, field) {
        const minutes = data.mm || '00'
        const hours = data.HH || '00'
        this.trade[field] = hours + ':' + minutes
      },
      hasValue (trade) {
        const tradeLength = Object.keys(trade).length
        return tradeLength && tradeLength > 0
      }
    }
  }
</script>
<style scoped>

.w-50 {
  width: 50%;
}

.tag.is-warning {
  opacity: 0.5;
}

.trade-detail-page {
  background-color: #f5f5f5;

}
  .hero-body {
    background-color: white;
    border: 1px solid rgba(46,62,72,.12);
    color: white;

    background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1531263060782-b024de9b9793?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
  }

      hero-body p, h1, h2, strong {
        color: white;
      }

  .trade-side-box {
    background-color: white;
    border-radius: 10px;
    font-size: 16px;
    padding: 15px;
  }

pre,
.message {
  max-width: 960px;
}

.v-center {
  align-items: center;
}

li {margin: 10px}

.hero.is-primary {
background: linear-gradient(to top right, #524ad0 10%, #D099FA);
}

.box {
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
}

.box span.icon {
  float: right;
  font-size: 1.7em;
  padding: 2rem 2rem 0 0;
}

.is-large.fab {
  font-size: 7em;
}

.is-large.fas {
  font-size: 5em;
  margin-left: 0.2em;
}

.media-content {overflow: hidden;}

.menu-list li a:hover {
  background: #d9d9d9;
}

.token.number {
  display: inline;
  padding: inherit;
  font-size: inherit;
  line-height: inherit;
  text-align: inherit;
  vertical-align: inherit;
  border-radius: inherit;
  font-weight: inherit;
  white-space: inherit;
  background: inherit;
  margin: inherit;
}
.footer {background-color: white;}
</style>