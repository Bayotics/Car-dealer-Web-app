<template>
  <div class="columns" style = "background-color:  rgb(242, 243, 245);">
    <div class="container profile">
      <div class="main main-raised" style = "margin-bottom: 100px; margin-top:100px; text-align: center;">
      <div class="profile-content" style = "height:500px; padding-top: 20px;">
          <div class="container">
              <div class="row">
                  <div class="col-md-6 ml-auto mr-auto">
                      <div class="profile">
                          <div class="avatar">
                              <img :src="user.avatar" style = "height: 150px; width: 150px;" alt="Circle Image" class="img-raised rounded-circle img-fluid">
                          </div>
                          <div class="name">
                              <span class="title is-bold">{{user.name}}</span>
                              <UserUpdateModal :authUser="user"
                              @userSubmitted="updateUser" />
                              <br/>
                              <a href="#pablo" class="btn btn-just-icon btn-link btn-dribbble"><i class="fa fa-dribbble"></i></a>
                              <a href="#pablo" class="btn btn-just-icon btn-link btn-twitter"><i class="fa fa-twitter"></i></a>
                              <a href="#pablo" class="btn btn-just-icon btn-link btn-pinterest"><i class="fa fa-pinterest"></i></a>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="description text-center">
                <p class="tagline">
                   {{user.info}}
                </p>                                
              </div>
              <div class="row">
                  <div class="col-md-6 ml-auto mr-auto">
                      <div class="profile-tabs">
                        <ul class="nav nav-pills nav-pills-icons justify-content-center" role="tablist">
                          <li class="nav-item">
                              <a @click= "activeTab = 'trades'"
                              :class="{isActive: activeTab === 'trades'}"
                                class="nav-link active" role="tab" data-toggle="tab">
                                <p class="stat-val">{{tradesCount}}</p>
                                <p class="stat-key">Trades</p>
                              </a>
                          </li>
                          <li class="nav-item">
                              <a @click="activeTab = 'threads'"
                                :class="{isActive: activeTab === 'threads'}"
                                class="nav-link active" role="tab" data-toggle="tab">
                                <p class="stat-val">{{threadsCount}}</p>
                                <p class="stat-key">Comments</p>
                              </a>
                          </li>
                          <li class="nav-item">
                                <a @click="activeTab = 'posts'"
                                :class="{isActive: activeTab === 'posts'}"
                                class="nav-link active" role="tab" data-toggle="tab">
                                <p class="stat-val">{{postsCount}}</p>
                                <p class="stat-key">Replies</p>
                              </a>
                          </li>
                        </ul>
                </div>
              </div>
          </div>                       
          </div>
      </div>
  </div>
      <div v-if="activeTab === 'trades'" class="columns is-mobile is-multiline">
        <template v-if="trades && trades.length > 0">
          <div v-for="trade in trades" :key="trade._id" class="column is-3-tablet is-6-mobile">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img :src="trade.image"/>
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <p class="title is-4">{{trade.title}}</p>
                    <p class="subtitle is-6">
                      <span class="tag is-dark subtitle">{{trade.category.name | capitalize}}</span>
                    </p>
                  </div>
                </div>
                <div class="content">
                  <p>
                    {{trade.shortInfo}}
                  </p>
                </div>
              </div>
              <footer class="card-footer">
                <!-- <router-link :to="{name: 'PagetradeEdit', params: {tradeId: trade._id}}" class="card-footer-item">Edit</router-link> -->
                <a @click.prevent="($event) => showDeleteTradeWarning($event, trade._id)"
                   class="card-footer-item delete-item">Delete</a>
              </footer>
            </div>
            <br/>
          </div>
        </template>
        <div v-else class="stats-error">
          No trades currently created :(
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'threads' -->
      <div v-if="activeTab === 'threads'" class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over threads -->
        <template v-if="threads && threads.length > 0">
          <div v-for="thread in threads" :key="thread._id" class="column is-3-tablet is-6-mobile">
          <!-- THREADS -->
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <!-- TODO: Display thread thread title -->
                    <p class="title is-4">{{thread.title}}</p>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item">Share</a>
                <a class="card-footer-item">Delete</a>
              </footer>
            </div>
            <br/>
          </div>
        </template>
        <div v-else class="stats-error">
           No Threads currently created :(
        </div>
      </div>
      <!-- TODO: Display this div when activeTab === 'posts' -->
      <div v-if="activeTab === 'posts'" class="columns is-mobile is-multiline">
        <!-- TODO: Iterate over posts -->
        <template v-if="posts && posts.length > 0">
          <div v-for="post in posts" :key="post._id" class="column is-3-tablet is-6-mobile">
          <!-- POSTS -->
            <div class="card">
              <div class="card-content">
                <div class="media">
                  <div class="media-content">
                    <!-- TODO: Display post text -->
                    <p class="title is-4">{{post.text}}</p>
                  </div>
                </div>
              </div>
              <footer class="card-footer">
                <a class="card-footer-item">Share</a>
                <a class="card-footer-item">Delete</a>
              </footer>
            </div>
            <br/>
          </div>
        </template>
        <div v-else class="stats-error">
          No posts currently created :(
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import UserUpdateModal from '@/components/UserUpdateModal'
  import { mapState } from 'vuex'
  export default {
    components: {
      UserUpdateModal
    },
    data () {
      return {
        activeTab: 'trades'
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user,
        trades: state => state.stats.trades.data,
        threads: state => state.stats.threads.data,
        posts: state => state.stats.posts.data,
        tradesCount: state => state.stats.trades.count,
        threadsCount: state => state.stats.threads.count,
        postsCount: state => state.stats.posts.count
      })
    },
    created () {
      this.$store.dispatch('stats/fetchUserStats')
        .then(stats => console.log(stats))
    },
    methods: {
      updateUser ({user, done}) {
        this.$store.dispatch('auth/updateUser', user)
          .then(() => {
            this.$toasted.success('Profile Successfuly Updated', {duration: 3000})
            done()
          })
          .catch(err => {
            console.log(err)
            done()
          })
      },
      showDeleteTradeWarning(e, tradeId) {
        e.stopPropagation()
        const isConfirm = confirm('Are you sure you want to delete this trade???')

        if (isConfirm) {
          this.$store.dispatch('trades/deleteTrade', tradeId)
            .then(id => this.$store.dispatch('stats/updateStats', id))
            .catch(err => console.log(err))
        }
      }
    }
  }
</script>

<style scoped>
  body {
    background: #F5F7FA
  }

  .stats-error {
    font-size: 40px;
    font-weight: bold;
    margin-top: 30px;
  }

  .delete-item {
    color: red;
  }

  .stats-tab {
    border-bottom: 2px solid transparent;
    transition: 0.5s;
  }

  .stats-tab:hover {
    cursor: pointer;
    border-bottom: 2px solid black;
  }

  .stats-tab.isActive {
    border-bottom: 2px solid black;
  }

  .stat-val {
    font-size: 3em;
    padding-top: 20px;
    font-weight: bold;
  }

  .stat-key {
    font-size: 1.4em;
    font-weight: 200
  }

  .section.profile-heading .column.is-2-tablet.has-text-centered + .has-text-centered {
    border-left: 1px dotted rgba(0, 0, 0, .2);
  }

  .container.profile {
    margin-top: 1%;
  }

  .control.is-pulled-left span.select {
    margin-right: 5px;
    border-radius: 2px;
  }

  .modal-card .content h1 {
    padding: 40px 10px 10px;
    border-bottom: 1px solid #dadada
  }

  .container.profile .profile-options .tabs ul li.link a {
    margin-bottom: 20px;
    padding: 20px;
    background-color: #F1F1F1;
  }
  .navbar {
    border: 0;
    border-radius: 3px;
    padding: .625rem 0;
    margin-bottom: 20px;
    color: #555;
    background-color: #fff!important;
    box-shadow: 0 4px 18px 0 rgba(0,0,0,.12), 0 7px 10px -5px rgba(0,0,0,.15) !important;
    z-index: 1000 !important;
    transition: all 150ms ease 0s;
    
}

.navbar.navbar-transparent {
    z-index: 1030;
    background-color: transparent!important;
    box-shadow: none !important;
    padding-top: 25px;
    color: #fff;
}

.navbar .navbar-brand {
    position: relative;
    color: inherit;
    height: 50px;
    font-size: 1.125rem;
    line-height: 30px;
    padding: .625rem 0;
    font-weight: 300;
    -webkit-font-smoothing: antialiased;
}

.navbar .navbar-nav .nav-item .nav-link:not(.btn) .material-icons {
    margin-top: -7px;
    top: 3px;
    position: relative;
    margin-right: 3px;
}

.navbar .navbar-nav .nav-item .nav-link .material-icons {
    font-size: 1.25rem;
    max-width: 24px;
    margin-top: -1.1em;
}

.navbar .navbar-nav .nav-item .nav-link .fa, .navbar .navbar-nav .nav-item .nav-link .material-icons {
    font-size: 1.25rem;
    max-width: 24px;
    margin-top: 0px;
}

.navbar .navbar-nav .nav-item .nav-link {
    position: relative;
    color: inherit;
    padding: .9375rem;
    font-weight: 400;
    font-size: 12px;
    border-radius: 3px;
    line-height: 20px;
}

a .material-icons {
    vertical-align: middle;
}

.fixed-top {
    position: fixed;
    z-index: 1030;
    left: 0;
    right: 0;
}

.profile-page .page-header {
    height: 380px;
    background-position:center;
}

.page-header {
    height: 100vh;
    background-size: cover;
    margin: 0;
    padding: 0;
    border: 0;
    display: flex;
    align-items: center;
}

.header-filter:after, .header-filter:before {
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    left: 0;
    top: 0;
    content: "";
}

.header-filter::before {
    background: rgba(0,0,0,.5);
}

.main-raised {
    margin: -60px 30px 0;
    border-radius: 6px;
    box-shadow: 0 16px 24px 2px rgba(0,0,0,.14), 0 6px 30px 5px rgba(0,0,0,.12), 0 8px 10px -5px rgba(0,0,0,.2);
}

.main {
    background: #FFF;
    position: relative;
    z-index: 3;
}

.profile-page .profile {
    text-align: center;
}

.profile-page .profile img {
    max-width: 160px;
    width: 100%;
    margin: 0 auto;
    -webkit-transform: translate3d(0,-50%,0);
    -moz-transform: translate3d(0,-50%,0);
    -o-transform: translate3d(0,-50%,0);
    -ms-transform: translate3d(0,-50%,0);
    transform: translate3d(0,-50%,0);
}

.img-raised {
    box-shadow: 0 5px 15px -8px rgba(0,0,0,.24), 0 8px 10px -5px rgba(0,0,0,.2);
}

.rounded-circle {
    border-radius: 50%!important;
}

.img-fluid, .img-thumbnail {
    max-width: 100%;
    height: auto;
}

.title {
    margin-top: 30px;
    margin-bottom: 25px;
    min-height: 32px;
    color: #3C4858;
    font-weight: 700;
    font-family: "Roboto Slab","Times New Roman",serif;
}

.profile-page .description {
    margin: 1.071rem auto 0;
    max-width: 600px;
    color: #999;
    font-weight: 300;
}

p {
    font-size: 14px;
    margin: 0 0 10px;
}

.profile-page .profile-tabs {
    margin-top: 4.284rem;
}

.nav-pills, .nav-tabs {
    border: 0;
    border-radius: 3px;
    padding: 0 15px;
}

.nav .nav-item {
    position: relative;
    margin: 0 2px;
}

.nav-pills.nav-pills-icons .nav-item .nav-link {
    border-radius: 4px;
}

.nav-pills .nav-item .nav-link.active {
    color: #fff;
    background-color: #209cee;
    box-shadow: 0 5px 20px 0 rgba(0,0,0,.2), 0 13px 24px -11px #209cee
}

.nav-pills .nav-item .nav-link {
    line-height: 24px;
    font-size: 12px;
    font-weight: 500;
    min-width: 100px;
    color: #555;
    transition: all .3s;
    border-radius: 30px;
    padding: 10px 15px;
    text-align: center;
}

.nav-pills .nav-item .nav-link:not(.active):hover {
    background-color: rgba(200,200,200,.2);
}


.nav-pills .nav-item i {
    display: block;
    font-size: 30px;
    padding: 15px 0;
}

.tab-space {
    padding: 20px 0 50px;
}

.profile-page .gallery {
    margin-top: 3.213rem;
    padding-bottom: 50px;
}

.profile-page .gallery img {
    width: 100%;
    margin-bottom: 2.142rem;
}

.profile-page .profile .name{
    margin-top: -80px;
}

img.rounded {
    border-radius: 6px!important;
}

.tab-content>.active {
    display: block;
}

/*buttons*/
.btn {
    position: relative;
    padding: 12px 30px;
    margin: .3125rem 1px;
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.428571;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0;
    border: 0;
    border-radius: .2rem;
    outline: 0;
    transition: box-shadow .2s cubic-bezier(.4,0,1,1),background-color .2s cubic-bezier(.4,0,.2,1);
    will-change: box-shadow,transform;
}

.btn.btn-just-icon {
    font-size: 20px;
    height: 41px;
    min-width: 41px;
    width: 41px;
    padding: 0;
    overflow: hidden;
    position: relative;
    line-height: 41px;
}

.btn.btn-just-icon fa{
    margin-top: 0;
    position: absolute;
    width: 100%;
    transform: none;
    left: 0;
    top: 0;
    height: 100%;
    line-height: 41px;
    font-size: 20px;
}
.btn.btn-link{
    background-color: transparent;
    color: #999;
}

/* dropdown */




.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 11rem !important;
    margin: .125rem 0 0;
    font-size: 1rem;
    color: #212529;
    text-align: left;
    background-color: #fff;
    background-clip: padding-box;
    border-radius: .25rem;
    transition: transform .3s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1);
}

.dropdown-menu.show{
    transition: transform .3s cubic-bezier(.4,0,.2,1),opacity .2s cubic-bezier(.4,0,.2,1);
}


.dropdown-menu .dropdown-item:focus, .dropdown-menu .dropdown-item:hover, .dropdown-menu a:active, .dropdown-menu a:focus, .dropdown-menu a:hover {
    box-shadow: 0 4px 20px 0 rgba(0,0,0,.14), 0 7px 10px -5px #209cee;
    background-color: #209cee;
    color: #FFF;
}
.show .dropdown-toggle:after {
    transform: rotate(180deg);
}

.dropdown-toggle:after {
    will-change: transform;
    transition: transform .15s linear;
}


.dropdown-menu .dropdown-item, .dropdown-menu li>a {
    position: relative;
    width: auto;
    display: flex;
    flex-flow: nowrap;
    align-items: center;
    color: #333;
    font-weight: 400;
    text-decoration: none;
    font-size: .8125rem;
    border-radius: .125rem;
    margin: 0 .3125rem;
    transition: all .15s linear;
    min-width: 7rem;
    padding: 0.625rem 1.25rem;
    min-height: 1rem !important;
    overflow: hidden;
    line-height: 1.428571;
    text-overflow: ellipsis;
    word-wrap: break-word;
}

.dropdown-menu.dropdown-with-icons .dropdown-item {
    padding: .75rem 1.25rem .75rem .75rem;
}

.dropdown-menu.dropdown-with-icons .dropdown-item .material-icons {
    vertical-align: middle;
    font-size: 24px;
    position: relative;
    margin-top: -4px;
    top: 1px;
    margin-right: 12px;
    opacity: .5;
}
</style>