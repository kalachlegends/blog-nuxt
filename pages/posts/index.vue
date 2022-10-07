<template>
  <a-list item-layout="vertical" size="large"  :data-source="posts">
    <template #footer>
      <div>
        <b>ant design vue</b>
        footer part
      </div>
    </template>
    <template #renderItem="item">
      <a-list-item key="item.title">
        <template #actions>
          <span v-for="{ type, text } in actions" :key="type">
            <component :is="type" style="margin-right: 8px" />
            {{ text }}
          </span>
        </template>
        <template #extra>
          <img
            width="272"
            alt="logo"
            :src="item.imageUrl"
          />
        </template>
        <a-list-item-meta :description="item.sub_title">
          <template #title>
            <NuxtLink :to="'/posts/'+ item.url"> {{item.title}}</NuxtLink>
            
          </template>
          <template #avatar><a-avatar :src="item.imageUrl" /></template>
        </a-list-item-meta>

      </a-list-item>
    </template>
  </a-list>
</template>
  
<script>

import { mapGetters } from 'vuex'
export default {
  
  async asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {

    const {state, dispatch} = store

    await dispatch('posts/fetchPosts')
    return {
      posts: state.posts.posts
    }
  },
data() {
  return {
    posts: []
  }
},

  
  name: 'IndexPage',
}

</script>
  