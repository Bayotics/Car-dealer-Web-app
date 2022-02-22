<template>
  <form class="post-create">
    <div class="field">
      <textarea v-auto-expand
                v-model="text"
                class="textarea textarea-post"
                placeholder="Reply"
                rows="1"></textarea>
      <button :disabled="!text"
              style = "background-color:#209cee"
              @click.prevent="sendPost"
              class="button is-primary m-t-sm">Send</button> 
    </div> 
  </form>
</template>

<script>
  import autoExpand from '@/directives/autoExpand'
  export default {
    directives: {autoExpand},
    props: {
      threadId: {
        required: true,
        type: String
      }
    },
    data () {
      return {
        text: null
      }
    },
    computed: {
      trade () {
        return this.$store.state.trades.item
      }
    },
    methods: {
      sendPost () {
        this.$store.dispatch('threads/sendPost', {text: this.text, threadId: this.threadId})
        .then((createdPost) => {
          this.$socket.emit('trade/postSaved',
           {...createdPost, trade: this.trade._id }
          )
          this.text = ''
        })
      }
    }
  }
</script>

<style scoped>
  .textarea-post {
    padding-bottom: 30px;
  }

  .post-create {
    margin-bottom: 15px;
  }
</style>