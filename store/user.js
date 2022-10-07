

export const state = () => ({
    token: '',

})

export const mutations = {
    setToken(state, token) {
        state.token = token
    }
}
export const getters = {

}
export const actions = {

    async autnMe(ctx, formState) {
        const { email, password } = formState
        console.log(email, password)

        const response = await this.$axios.post('/auth/login', {
            email,
            password
        }).then(function (response) {
            console.log(response);

            return response
        }).catch(function (error) {
            throw new Error(error)
        });





        this.$auth.$storage.setUniversal("token", response.data.token)

        this.$auth.$storage.setUniversal("loggedIn", true)
        ctx.commit('setToken', response.data.token)

    },

}