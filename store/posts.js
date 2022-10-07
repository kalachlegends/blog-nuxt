

export const state = () => ({
    posts: [],
    one: {},
    oneByID: {}
})

export const mutations = {
    updatePost(state, posts) {
        console.log(posts)
        state.one = posts
    },
    updatePosts(state, posts) {
        console.log(posts)
        state.posts = posts
    },
    updateById(state, posts) {

        state.oneByID = posts
    },
    pushInPost(state, post) {
        state.posts.push(post)
    },
    updatePostsDeleteId(state, id) {
        console.log(id)
        state.posts = state.posts.filter(e => e._id != id)
    }
}
export const getters = {

    allPosts(state) {

        return state.posts
    }
}
export const actions = {

    async fetchPosts(ctx) {
        const response = await this.$axios.$get('/posts')
        console.log(response)
        ctx.commit('updatePosts', response)
    },
    async createPost(ctx, post) {


        const response = await this.$axios.post('/posts', post).then(function (response) {
            return response
        }).catch(function (error) {

            throw new error
        });
        console.log(response.data)
        ctx.commit('pushInPost', response.data.post
        )
    },
    async fetchGetOne(ctx, url) {
        console.log(this)
        const response = await this.$axios.$get('/posts/' + url)
        console.log(response)
        ctx.commit('updatePost', response)
    },
    async fetchGetOneById(ctx, id) {

        const response = await this.$axios.$get('/posts/id/' + id)
        console.log(response)
        ctx.commit('updateById', response)
    },
    async deleteOnePost(ctx, id) {
        console.log(this.$axios)
        const response = await this.$axios.$request('/posts/' + id, {
            method: "delete",
        })

        ctx.commit('updatePostsDeleteId', id)
    }
}