export default function ({ $axios, store }) {
    $axios.onRequest((config) => {

        config.headers.common['Authorization'] = store.$auth.$storage.getUniversal("token")

    })
}