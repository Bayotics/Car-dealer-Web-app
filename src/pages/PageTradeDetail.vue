<template>
  <div class="trade-detail-page">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h2 class="subtitle">
          </h2>
          <h1 class="title">
            {{trade.title}}
          </h1>
          <h2>            
            Price: ₦{{trade.priceTag | numberWithSpaces}}
          </h2>
          <article class="media v-center">
            <figure class="media-left">
              <p class="image is-64x64">
                <img class="is-rounded" :src="tradeCreator.avatar">
              </p>
            </figure>
            <div class="media-content">
              <div class="content">
                <p>
                  <!-- <router-link :to ="{name: 'PageUserProfile', params: {id: user._id}}"> -->
                  Posted by <strong>{{tradeCreator.name}} on {{trade.createdAt | formatDate}}</strong>
                   <!-- </router-link>  -->
                </p>
              </div> 
            </div>
          </article>         
           <img src = "https://www.freepnglogos.com/uploads/whatsapp-logo-png-hd-2.png" class = "img-responsive" alt= "image" style = " float: right; height: 60px; width: 60px;" />
            <!-- <img src = "https://platform.cstatic-images.com/large/in/v2/stock_photos/a64c474d-42ef-4998-8f1a-3d5c43722859/396dc83d-d22a-4e07-b6a4-2348b5f826d0.png" class = "img-responsive" alt= "image" style = " float: right; height: 60px; width: 60px;" /> -->
           <h2 style = " float: right; margin-top: 20px;">{{trade.whatsApp}}</h2>
        </div>
        <div class="is-pulled-right">
          <!-- <button v-if="isMember"
                  @click="leavetrade"
                  class="button is-danger">Leave trade</button> -->
        </div>
      </div>
    </section>
     <div id="about" class="section wb">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <div class="message-box">                        
                        <h2 style = "color: black">{{trade.title}}</h2>
                            <p>{{trade.description}}</p>
                        <!-- <a href="#" class="sim-btn hvr-bounce-to-top"><span>Contact Us</span></a> -->
                    </div><!-- end messagebox -->
                </div><!-- end col -->

                <div class="col-md-6">
                    <div class="right-box-pro wow fadeIn">
                        <img :src = "trade.image" alt="" style = "height: 300px; width: 1500px;" class="img-fluid img-rounded">
                    </div><!-- end media -->
                </div><!-- end col -->
            </div><!-- end row -->
        </div><!-- end container -->
    </div><!-- end section -->
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-7 is-offset-1">
            <div class="content is-medium">
              <!-- <button v-if="canJoin"
                      @click="jointrade"
                      class="button is-primary">Join In</button> -->
              <button v-if="!isAuthenticated"
                      :disabled="true"
                      class="button is-warning">You need to login in order to join conversation</button>
              <ThreadCreateModal v-if="isAuthenticated"
                                 @threadSubmitted="createThread"
                                 :btnTitle="`Welcome ${authUser.username}, Post   a comment`"
                                 :title="'Comment'" />
            </div>
            <ThreadList :threads="orderedThreads"
                        :canMakePost="canMakePost" />
            <button v-if="!isAllThreadsLoaded"
                    @click="fetchThreadsHandler"
                    class="button is-primary">Load More Threads</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex'
  import ThreadCreateModal from '@/components/ThreadCreateModal'
  import ThreadList from '@/components/ThreadList'
  export default {
    components: {
      ThreadCreateModal,
      ThreadList
    },
    props:{
      // user: {
      //   required: true,
      //   type: Object
      // }
    },
    data () {
      return {
        threadPageNum: 1,
        threadPageSize: 5
      }
    },
    computed: {
      ...mapState({
        trade: state => state.trades.item,
        threads: state => state.threads.items,
        authUser: state => state.auth.user,
        isAllThreadsLoaded: state => state.threads.isAllThreadsLoaded
      }),
      tradeCreator () {
        return this.trade.tradeCreator || {}
      },
      isAuthenticated () {
        return this.$store.getters['auth/isAuthenticated']
      },
      isTradeOwner () {
        return this.$store.getters['auth/isTradeOwner'](this.tradeCreator._id)
      },
      isMember () {
        return this.$store.getters['auth/isMember'](this.trade._id)
      },
      canJoin () {
        return !this.isTradeOwner &&
                this.isAuthenticated &&
               !this.isMember
      },
      canMakePost () {
        return this.isAuthenticated
      },
      orderedThreads () {
        const copyOfThreads = [...this.threads]
        return copyOfThreads.sort((thread, nextThread) => {
          return new Date(nextThread.createdAt) - new Date(thread.createdAt)
        })
      }
    },
    created () {
      const tradeId = this.$route.params.id
      this.fetchTradeById(tradeId)
      this.fetchThreadsHandler({tradeId, init: true})
      if (this.isAuthenticated) {
        this.$socket.emit('trade/subscribe', tradeId)
        this.$socket.on('trade/postPublished', this.addPostToThreadHandler)
      }
    },
    destroyed () {
      this.$socket.removeListener('trade/postPublished', this.addPostToThreadHandler)
      this.$socket.emit('trade/unsubscribe', this.trade._id)
    },
    methods: {
      ...mapActions('trades', ['fetchTradeById']),
      ...mapActions('threads', ['fetchThreads', 'postThread', 'addPostToThread']),
      fetchThreadsHandler ({tradeId, init}) {
        const filter = {
          pageNum: this.threadPageNum,
          pageSize: this.threadPageSize
        }
        this.fetchThreads({tradeId: tradeId || this.trade._id, filter, init})
          .then(() => {
            this.threadPageNum++
          })
      },
      addPostToThreadHandler (post) {
        this.addPostToThread({post, threadId: post.thread})
      },
      joinTrade () {
        this.$store.dispatch('trades/joinTrade', this.trade._id)
      },
      leaveTrade () {
        this.$store.dispatch('trades/leaveTrade', this.trades._id)
      },
      createThread ({title, done}) {
        this.postThread({title, tradeId: this.trade._id})
          .then(() => {
            this.$toasted.success('Thread Succesfuly Created!', {duration: 3000})
            done()
        })
      }
    }
    
  }
</script>

<style scoped >
  .tag.is-warning {
    opacity: 0.5;
  }
  .trade-detail-page {
    background-color: #f5f5f5;
  }
    .trade-detail-page mapouter{
        text-align:right;height:500px;width:600px;}
    .gmap_canvas {overflow:hidden;background:none!important;height:500px;width:600px;}
    
    .hero-body {
      background-color: white;
      border: 1px solid rgba(46,62,72,.12);
      color: white;
      background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1585503418537-88331351ad99?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyJTIwZGVhbGVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80');
      background-size: cover;
      background-repeat: no-repeat;
      background-attachment: fixed;
    }
        .hero-body p,h1,h2, strong {
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
  .textarea-post {
    padding-bottom: 30px;
  }
  .post-create {
    margin-bottom: 15px;
  }
  .content figure{
      margin-bottom: 0;
  }
  .media-content-threads {
    background-color: #f1f1f1;
    padding: 3px 20px;
    border-radius: 10px;
    margin-right: 40px;
    width: 100px;
  }
  .media-left.user-image {
    margin: 0;
    margin-right: 15px;
  }
  .post-item {
  }
  .media + .media {
    border: none;
    margin-top: 0;
  }
  .post-content {
    margin: 0;
  }
    .post-content-message {
      font-size: 16px;
    }
    .author {
      font-size: 18px;
    }
    .post-time {
      font-size: 16px;
    }
    /*------------------------------------------------------------------
    Version: 1.0
-------------------------------------------------------------------*/

/*------------------------------------------------------------------
    IMPORT FONTS
-------------------------------------------------------------------*/

@import url('https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800');

/*------------------------------------------------------------------
    IMPORT FILES
-------------------------------------------------------------------*/



/*------------------------------------------------------------------
    SKELETON
-------------------------------------------------------------------*/

body {
    color: #999999;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    line-height: 1.80857;
}

html, body{
	height: 100%;
}

body.demos .section {
    /* background: url(images/bg.png) repeat top center #f2f3f5; */
}

body.demos .section-title img {
    max-width: 280px;
    display: block;
    margin: 10px auto;
}




a,
.btn {
    text-decoration: none !important;
    outline: none !important;
    -webkit-transition: all .3s ease-in-out;
    -moz-transition: all .3s ease-in-out;
    -ms-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out;
    transition: all .3s ease-in-out;
}

.btn-custom {
    margin-top: 20px;
    background-color: transparent !important;
    border: 2px solid #ddd;
    padding: 12px 40px;
    font-size: 16px;
}

.section {
    display: block;
    position: relative;
    overflow: hidden;
    padding: 70px 0;
}

.section.wb {
    background-color: #ffffff;
}

.section.lb {
    background-color: #f2f3f5;
}

.section.db {
    background-color: #111111;
}

.section.color1 {
    background-color: #448AFF;
}

.first-section {
    display: block;
    position: relative;
    overflow: hidden;
    padding: 16em 0 13em;
}

.first-section h2 {
    color: #ffffff;
    font-size: 68px;
    font-weight: 300;
    text-transform: capitalize;
    display: block;
    margin: 0;
    padding: 0 0 30px;
    position: relative;
}

.first-section .lead {
    font-size: 21px;
    font-weight: 300;
    padding: 0 0 40px;
    margin: 0;
    line-height: inherit;
    color: #ffffff;
}

.macbookright {
    width: 980px;
    position: absolute;
    right: -15%;
    bottom: -6%;
}

.section-title {
    display: block;
    position: relative;
    margin-bottom: 60px;
}

.section-title p {
    color: #999;
    font-weight: 400;
    font-size: 18px;
    line-height: 23px;
    margin: 0;
}

.section-title h3 {
    font-size: 38px;
    font-weight: 500;
    line-height: 62px;
    margin: 0 0 25px;
    padding: 0;
    text-transform: none;
}

.section.colorsection p,
.section.colorsection h3{
    color: #ffffff;
}



.btn-hover-new{
	color: #333333;
	-webkit-transition: all 0.5s;
	-moz-transition: all 0.5s;
	-o-transition: all 0.5s;
	transition: all 0.5s;
	position: relative;
	border: 1px solid #333333;
	overflow: hidden;
	padding: 0px 18px;
	display: inline-block;
}

.sim-btn{	
	text-align: center;
	margin-right: auto;
	margin-left: auto;
	margin-top: 0px;
	cursor: pointer;
}

.btn-hover-new::after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    -webkit-transform: translate(-30%, 0);
    transform: translate(-30%, 0);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}

.btn-hover-new span {
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
}

.btn-hover-new:hover{
	color: #ffffff;
	background-color: #333333;
}
.btn-hover-new:hover > span {
    opacity: 0;
    -webkit-transform: translate(0px,40px);
    transform: translate(0px,40px);
}
.btn-hover-new:hover::after {
    opacity: 1;
    -webkit-transform: translate(0, 0);
    transform: translate(0, 0);
}

.btn-ber{
	margin-top: 30px;
}

.get_btn{
	background: #ffffff;
	color: #333333;
	padding: 14px 20px;
	border-radius: 100px;
	overflow: hidden;
}
.get_btn:hover{
	color: #ffffff;
}

.learn_btn{
	background: #333333;
	color: #ffffff;
	padding: 14px 20px;
	border-radius: 100px;
	overflow: hidden;
}
.learn_btn:hover{
	color: #ffffff;
}

.sim-btn{
	background: #333333;
	color: #ffffff;
	padding: 14px 20px;
	border-radius: 100px;
	overflow: hidden;
	border: none;
}

.sim-btn:hover{
	color: #ffffff;
}

.hvr-bounce-to-top{
	display: inline-block;
	vertical-align: middle;
	-webkit-transform: perspective(1px) translateZ(0);
	transform: perspective(1px) translateZ(0);
	box-shadow: 0 0 1px rgba(0, 0, 0, 0);
	position: relative;
	-webkit-transition-property: color;
	transition-property: color;
	-webkit-transition-duration: 0.5s;
	transition-duration: 0.5s;
}
.hvr-bounce-to-top::before {
    content: "";
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #2098D1;
    -webkit-transform: scaleY(0);
    transform: scaleY(0);
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
    -webkit-transition-property: transform;
    transition-property: transform;
    -webkit-transition-duration: 0.5s;
    transition-duration: 0.5s;
    -webkit-transition-timing-function: ease-out;
    transition-timing-function: ease-out;
}
.hvr-bounce-to-top:hover::before, .hvr-bounce-to-top:focus::before, .hvr-bounce-to-top:active::before {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
    -webkit-transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
    transition-timing-function: cubic-bezier(0.52, 1.64, 0.37, 0.66);
}



/*------------------------------------------------------------------
    PORTFOLIO
-------------------------------------------------------------------*/

.item-h2,
.item-h1 {
    height: 100% !important;
    height: auto !important;
}

.isotope-item {
    z-index: 2;
    padding: 0;
}

.isotope-hidden.isotope-item {
    pointer-events: none;
    z-index: 1;
}

.isotope,
.isotope .isotope-item {
    /* change duration value to whatever you like */
    -webkit-transition-duration: 0.8s;
    -moz-transition-duration: 0.8s;
    transition-duration: 0.8s;
}

.isotope {
    -webkit-transition-property: height, width;
    -moz-transition-property: height, width;
    transition-property: height, width;
}

.isotope .isotope-item {
    -webkit-transition-property: -webkit-transform, opacity;
    -moz-transition-property: -moz-transform, opacity;
    transition-property: transform, opacity;
}

.portfolio-filter ul {
    padding: 0;
    z-index: 2;
    display: block;
    position: relative;
    margin: 0;
}

.portfolio-filter ul li {
    border-radius: 0;
    display: inline-block;
    margin: 0 5px 0 0;
    text-decoration: none;
    text-transform: uppercase;
    vertical-align: middle;
}

.portfolio-filter ul li:last-child:after {
    content: "";
}

.portfolio-filter ul li .btn-dark {
    box-shadow: none;
    background-color: transparent;
    border: 1px solid #e6e7e6 !important;
    color: #1f1f1f;
    font-weight: 400;
    font-size: 13px;
    padding: 10px 30px;
}

.da-thumbs {
    list-style: none;
    position: relative;
    padding: 0;
}

.da-thumbs .pitem {
    margin: 0;
    padding: 15px;
    position: relative;
}

.da-thumbs .pitem a,
.da-thumbs .pitem a img {
    display: block;
    position: relative;
}

.da-thumbs .pitem a {
    overflow: hidden;
}

.da-thumbs .pitem a div {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
}

.da-thumbs .pitem a div h3 {
    display: block;
    color: #ffffff;
    font-size: 20px;
    padding: 30px 15px;
    text-transform: capitalize;
    font-weight: normal;
}

.da-thumbs .pitem a div h3 small {
    display: block;
    color: #ffffff;
    margin-top: 5px;
    font-size: 13px;
    font-weight: 300;
}

.da-thumbs .pitem a div i {
    background-color: #1f1f1f;
    position: absolute;
    color: #ffffff !important;
    bottom: 0;
    font-size: 15px;
    z-index: 12;
    right: 0;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
}


.service-widget h3 a,
.section.wb .service-widget h3,
.section.lb .service-widget h3 {
    color: #1f1f1f;
}

.service-widget p {
    margin-bottom: 0;
    padding-bottom: 0;
}

.message-box h4 {
    text-transform: uppercase;
    padding: 0;
    margin: 0 0 5px;
    font-weight: 600;
    letter-spacing: 0.5px;
    font-size: 15px;
    color: #999;
}

.message-box h2 {
    font-size: 38px;
    font-weight: 600;
    padding: 0 0 10px;
    margin: 0;
    line-height: 62px;
    margin-top: 0;
    text-transform: none;
}

.message-box p {
    margin-bottom: 20px;
}

.message-box .lead {
    padding-top: 10px;
	font-size: 16px;
	font-style: italic;
	color: #999;
	padding-bottom: 10px;
	padding-left: 15px;
}

.post-media {
    position: relative;
}

.post-media img {
    width: 100%;
}

.post-media_pp{
	overflow: hidden;
	position: relative;
}

.service-widget{
	margin-bottom: 30px;
}

.hover-up{
	background: #076799;
}

.service-widget .post-media_pp .hover-up{
	padding: 30px;
	position: absolute;
	left: 110%;
	width: 100%;
	top: 0;
	height: 100%;
	transition: all .35s ease-in-out;
	opacity: 0;
}
.service-widget .post-media_pp:hover .hover-up{
	opacity: 1;
	left: 0;
}

.section.wb .hover-up h3{
	font-size: 32px;
	color: #ffffff;
}

.section.wb .hover-up p{
	color: #cccccc;
}

.playbutton {
    position: absolute;
    color: #ffffff !important;
    top: 40%;
    font-size: 60px;
    z-index: 12;
    left: 0;
    right: 0;
    text-align: center;
    margin: -20px auto;
}




</style>