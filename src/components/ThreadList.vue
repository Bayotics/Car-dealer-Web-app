<template>
  <div class="content is-medium">
    <h3 class="title is-3">Conversations</h3>
    <div v-for="thread in threads" :key="thread._id" class="box">
      <h4 id="const" class="title is-3">{{thread.title}}</h4>
       <article :thread ="thread._id" class="media post-item">
        <figure class="media-left is-rounded user-image"> 
          <p class="image is-32x32">
            <img class="is-rounded" :src="thread.user.avatar">
          </p>
        </figure>
        <div class="media-content">
          <div class="content is-medium">
            <div class="post-content">
              <!-- Post User Name -->
              <strong :thread ="thread._id"   class="author">{{thread.user.name}}</strong>
              {{' '}}
              <!-- Post Updated at -->
              <small style = "float: right" class="post-time">{{thread.updatedAt | fromNow}}</small>
              <br>
              <p class="post-content-message">{{thread.text}}</p>
            </div>
          </div>
        </div>
      </article>
      <PostCreate v-if="canMakePost || isAuthenticated" :threadId="thread._id" /> 
      <!-- Posts START -->
      <article v-for="post in thread.posts" :key="post._id" class="media post-item">
        <figure class="media-left is-rounded user-image"> 
          <p class="image is-32x32">
            <img class="is-rounded" :src="post.user.avatar"> 
          </p>
        </figure>
        <div class="media-content">
          <div class="content is-medium">
            <div class="post-content">
              <!-- Post User Name -->
              <strong class="author">{{post.user.name}}</strong>
              {{' '}}
              <!-- Post Updated at -->
              <small class="post-time">{{post.updatedAt | fromNow}}</small>
              <br>
              <p class="post-content-message">{{post.text}}</p>
            </div>
          </div>
        </div>
      </article>
      <!-- Posts END -->
    </div>
  </div>
</template>

<script>
  import PostCreate from '@/components/PostCreate'
  export default {
    components: {
      PostCreate
    }, 
    props: {
      threads: {
        type: Array,
        required: true
      },
      canMakePost: {
        type: Boolean,
        required: true
      },
      isAuthenticated:{
        type: Boolean,
        required: true
      }
    }
  }
</script>

<style scoped>
  .content {
            margin-bottom: 0;
  }
    figure {
      margin-bottom: 0;
    }
  .media-content {
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
    margin: 0;
    }
    .author {
      font-size: 18px;
    }
    .post-time {
      font-size: 16px;
    }
</style>