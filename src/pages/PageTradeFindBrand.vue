<template>
  <div>
    <div class="lookup-prebody">
      <AppHero />
      <div class="trade-lookup-wrap">
        <div class="trade-lookup centered">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <input v-model="searchedLocation"
                       @keyup.enter="fetchTrades"
                       type="text"
                       class="input"
                       placeholder="New York">
              </div>
              <div v-if="searchedLocation && trades && trades.length > 0" class="level-item">
                <span>Trades in {{trades[0].location}}</span>
              </div>
              <div v-if="brand" class="level-item">
                <button @click="cancelBrand" class="button is-danger">{{brand}} X</button>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <button class="button is-medium m-r-sm">Trades</button>
                <button class="button is-medium">Calendar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="pageLoader_isDataLoaded" class="container">
      <section class="section page-find">
        <div v-if="trades && trades.length > 0" class="columns cover is-multiline">
          <div v-for="trade of trades" :key="trade._id" class="column is-one-third" :style="{'min-height': '160px'}">
            <router-link :to="'/trades/' + trade._id" class="trade-card-find"
               href="#"
               :style="{'background-image': `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${trade.image})`}">
              <div class="trade-card-find-content">
                <div class="trade-card-find-content-date is-pulled-right">
                  <span class="month">{{trade.startDate | formatDate('MMM')}}</span>
                  <span class="day">{{trade.startDate | formatDate('D')}}</span>
                </div>
                <div class="trade-card-find-content-info">
                  <p class="title is-4 no-padding is-marginless m-b-xs">{{trade.title}}</p>
                  <span class="tag is-success m-b-xs">{{trade.brand.name | capitalize}}</span>
                  <p class="subtitle is-7">{{trade.location}}</p>
                </div>
                <div class="trade-card-find-interest">
                  <p class="subtitle is-7">{{trade.joinedPeopleCount}}</p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
        <div v-else>
          <span class="tag is-warning is-large">No trades found :( You might try to change search criteria (:</span>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import pageLoader from '@/mixins/pageLoader'
  export default {
    props: {
      brand: {
        required: false,
        type: String
      }
    },
    mixins: [pageLoader],
    data () {
      return {
        searchedLocation: this.$store.getters['meta/location'],
        filter: {}
      }
    },
    computed: {
      trades () {
        return this.$store.state.trades.items
      }
    },
    created () {
      this.fetchTrades()
    },
    methods: {
      fetchTrades () {
        if (this.searchedLocation) {
          this.filter['location'] = this.searchedLocation.toLowerCase().replace(/[\s,]+/g,'').trim()
        }
        if (this.brand) {
          this.filter['brand'] = this.brand
        }
        this.pageLoader_isDataLoaded = false
        this.$store.dispatch('trades/fetchTrades', {filter: this.filter})
          .then(() => {
            this.pageLoader_resolveData()
          })
          .catch(err => {
            this.pageLoader_resolveData()
            console.log(err)
          })
      },
      cancelBrand () {
        this.$router.push({name: 'PageTradeFind'})
      }
    }
  }
</script>

<style scoped>
  .page-find {
    margin-top: 50px;
  }
  .trade-card-find {
    width: 100%;
    height: 180px;
    position: relative;
    display: block;
    border-radius: 3px;
    text-decoration: none;
    box-shadow: 0 0 1px rgba(0,0,0,.05);
    background-clip: content-box;
    background-size: cover;
    background-position: 50% 20%;
    border: 1px solid rgba(0,0,0,.12);
    -webkit-tap-highlight-color: transparent;
  }
    .trade-card-find-interest {
      position: absolute;
      bottom: 12px;
      right: 12px;
    }
      .trade-card-find p {
        font-weight: bold;
      }
    
    .title {
      color: white;
    }
    .subtitle {
      color: white;
    }
    .trade-card-find-content {
        margin: 10px;
        width: 70px;
        text-align: center;
        border-radius: 50%;
        }
      .trade-card-find-date {
        margin: 10px;
        width: 70px;
        text-align: center;
        border-radius: 50%;
      }
        .day {
          display: block;
          font-size: 21px;
          color: white;
          font-weight: bold;
        }
        .month {
          display: block;
          color: #ff5050;
          font-weight: bold;
          font-size: 23px;
          margin-bottom: -5px;
        }
      .trade-card-find-content-info {
        position: absolute;
        bottom: 0;
        left: 0;
        padding: 15px;
        width: 100%;
      }
  .text-overlay-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .lookup-prebody {
    position: relative;
  }
  .trade-lookup {
    width: 960px;
    margin: 0 auto;
    background-color: #1a2238;
    padding: 20px;
    color: white;
  }
  .trade-lookup-wrap {
    width: 100%;
    z-index: 2;
    position: absolute;
    top: auto;
    bottom: -42px;
  }
</style>