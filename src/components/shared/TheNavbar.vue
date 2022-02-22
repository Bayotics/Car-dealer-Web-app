<template>
   <div>
    
      <nav class="navbar navbar-expand-lg navbar-light" id = "main-navbar" style = "">
                        <div class="container d-flex justify-content-between align-items-center">
                            <a class="navbar-brand text-success logo h1 align-self-center">
                            <router-link :to = "'/'" style = "text-decoration: none" >
                            <h1 style = "font-size: 20px; color: black; margin-top: 15px;" ><b style = "font-size: 30px;">C|</b>A D I L A R</h1>
                            </router-link>
                            </a>
                            <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class=" align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                                <div class="flex-fill">
                                    <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                                        <li class="nav-item">
                                            <router-link style = "text-decoration: none; color: inherit;" :to="{name: 'PageTradeFind'}">
                                                <a class="nav-link">Shop</a>
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <router-link style = "text-decoration: none; color: inherit;" v-if="user" :to="{name: 'PageTradeCreate'}">
                                                <a class="nav-link">Trade</a>
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <router-link style = "text-decoration: none; color: inherit;" v-if="user" :to="{name: 'PageAbout'}">
                                                <a class="nav-link">About</a>
                                            </router-link>
                                        </li>
                                        <li class="nav-item">
                                            <router-link style = "text-decoration: none; color: inherit;" v-if="user" :to="{name: 'PageContact'}">
                                                <a class="nav-link">Contact</a>
                                            </router-link>                                        
                                        </li>
                                    </ul>
                                </div>
                                <div style="left: 130px; height: 10px; margin-bottom:20px;" class="navbar align-self-center d-flex">
                                    <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                                        <div class="input-group">
                                            <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ...">
                                                <div class="input-group-text">
                                                    <i class="fa fa-fw fa-search"></i>
                                                </div>
                                        </div>
                                    </div>
                                        <a class="nav-icon d-none d-lg-inline">
                                        <router-link :to="{name: 'PageTradeFind'}" >
                                        <i class="fa fa-fw fa-search text-dark mr-2"></i>
                                        </router-link>
                                        </a>
                                    <div v-if="user" class="navbar-item ">
                                        <router-link style = "text-decoration: none; color: inherit;" :to="{name: 'PageProfile'}" class="navbar-item nav-icon position-relative text-decoration-none">
                                            <i class="fa fa-fw fa-user text-dark mr-3"></i>
                                        </router-link>
                                    </div>
                                    <div class="navbar-item">
                    <div v-if="user">
                        Welcome {{user.name}}
                    </div>
                </div>
                <div v-if="user" class="navbar-item ">
                    <div >

                        <a @click.prevent="logout" class="navbar-item">
                        Logout
                        </a>
                    </div>
                </div>
                <div v-else class="navbar-item has-dropdown ">
                    <div class="buttons">
                        <router-link style = "text-decoration: none; background-color: #209cee;" :to="{name: 'PageLogin'}" class="button is-primary">
                        <a class="text-light">Login</a>
                        </router-link>
                        <router-link style = "text-decoration: none; color: #209cee;" :to="{name: 'PageRegister'}" class="button is-light">
                        <a class="text-light">Signup</a>
                        </router-link>
                    </div>
                  </div>
                                </div>
                            </div>
                        </div>
                    </nav>
      <!-- Close Top Nav -->


      <!-- Header -->
      <!-- <nav class="navbar navbar-expand-lg navbar-light shadow">
          <div class="container d-flex justify-content-between align-items-center">

              <a class="navbar-brand text-success logo h1 align-self-center" href="index.html">
                  Zay
              </a>

              <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#templatemo_main_nav" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
              </button>

              <div class="align-self-center collapse navbar-collapse flex-fill  d-lg-flex justify-content-lg-between" id="templatemo_main_nav">
                  <div class="flex-fill">
                      <ul class="nav navbar-nav d-flex justify-content-between mx-lg-auto">
                          <li class="nav-item">
                              <a class="nav-link" href="index.html">Home</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="about.html">About</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="shop.html">Shop</a>
                          </li>
                          <li class="nav-item">
                              <a class="nav-link" href="contact.html">Contact</a>
                          </li>
                      </ul>
                  </div>
                  <div class="navbar align-self-center d-flex">
                      <div class="d-lg-none flex-sm-fill mt-3 mb-4 col-7 col-sm-auto pr-3">
                          <div class="input-group">
                              <input type="text" class="form-control" id="inputMobileSearch" placeholder="Search ...">
                              <div class="input-group-text">
                                  <i class="fa fa-fw fa-search"></i>
                              </div>
                          </div>
                      </div>
                      <a class="nav-icon d-none d-lg-inline" href="#" data-bs-toggle="modal" data-bs-target="#templatemo_search">
                          <i class="fa fa-fw fa-search text-dark mr-2"></i>
                      </a>
                      <a class="nav-icon position-relative text-decoration-none" href="#">
                          <i class="fa fa-fw fa-cart-arrow-down text-dark mr-1"></i>
                          <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">7</span>
                      </a>
                      <a class="nav-icon position-relative text-decoration-none" href="#">
                          <i class="fa fa-fw fa-user text-dark mr-3"></i>
                          <span class="position-absolute top-0 left-100 translate-middle badge rounded-pill bg-light text-dark">+99</span>
                      </a>
                  </div>
              </div>

          </div>
      </nav>
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
      </div> -->
   </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        'user': 'auth/authUser'
      })
    },
     methods: {
      logout () {
        this.$store.dispatch('auth/logout')
         .then(() => {
            this.$router.push('/')
          })
      }
     }
  }
</script>

<style scoped>
#templatemo_nav_top{
    background-color: transparent;
}
#templatemo_nav_top *{
        padding-right: 10px;
}
</style>x