import axios from "~/plugins/axios"

export default async function ({ $auth, $axios, redirect }) {
    if ($auth.$storage.getUniversal("token")) {
        const respone = await $axios.get('/auth/me').then().catch(() => {
            $auth.$storage.setUniversal("loggedIn", false)
            redirect('/login')
        })
    } else {
        redirect('/login')
    }
}