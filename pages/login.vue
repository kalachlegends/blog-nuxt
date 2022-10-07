<template lang="">
  <div>
    <a-alert v-if="isError" message="Не удалось авторизоваться" type="error" show-icon />
    <a-form
    :model="formState"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    @submit="onSubmit"
    
  >
    <a-form-item
      label="Username"
      name=""
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.email" />
    </a-form-item>

    <a-form-item
      label="Password"
      name="password"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
 
  </a-form>

      
     </div> 
</template>
<script>
import { mapGetters, mapActions , useStore} from 'vuex'
export default {
  data() {
    return {
      formState: {
        email: '',
        password: '',
      },
      isError: false,
    }
  },
  methods: {
    ...mapActions({
      login: 'user/autnMe',
    }),
    onFinish(values) {
      console.log('Success:', values)
    },

    onFinishFailed(errorInfo) {
      console.log('Failed:', errorInfo)
    },
    onSubmit(event) {
      event.preventDefault()

      this.login(this.formState)
        .then(() => {
          this.isError = false

          this.$router.push({ path: '/posts/admin' })
        })
        .catch((error) => {
          this.isError = true
        })
    },
  },
}
</script>
<style lang="scss" scoped>
</style>
    
