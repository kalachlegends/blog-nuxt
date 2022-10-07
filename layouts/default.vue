<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1"><NuxtLink to="/">Главная</NuxtLink></a-menu-item>
        <a-menu-item key="2"
          ><NuxtLink exact to="/posts">Посты</NuxtLink>
        </a-menu-item>
        <a-menu-item key="3" v-if="isLogged">
          <NuxtLink to="/posts/admin">Админ</NuxtLink>
        </a-menu-item>
        <a-menu-item key="4" v-if="isLogged">
          <NuxtLink to="/posts/admin/create">Создать пост</NuxtLink>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <Nuxt />
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>
  
  <script>
export default {
  name: 'default',
  data() {
    return {
      isLogged: this.$auth.$storage.getUniversal('loggedIn'),
    }
  },

  mounted() {},
}
</script>
  <style>
.height-100 {
  height: 100%;
}
</style>