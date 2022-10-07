<template>
  <div>
    <h1>{{ post.title }}</h1>

    <h2>{{ post.sub_title }}</h2>
    <h3>{{ post.viewsCount }} - просмотров</h3>

    <div v-html="post.html_text"></div>
  </div>
</template>
    
 <script>
export default {
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
  }) {
    const { state, dispatch } = store

    await dispatch('posts/fetchGetOne', params.url)
    return {
      post: state.posts.one,
    }
  },
  data() {
    return {
      post: {},
    }
  },

  name: 'IndexPage',
}
</script>
    