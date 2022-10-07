<template lang="">
  <client-only placeholder="Loading...">

    <div>
      <a-table
      :columns="columns"
      :data-source="allPosts"
      :pagination="false"
    >
    <template slot="expandedRowRender"  slot-scope="record">
      <a :href="'/posts/admin/' + record._id">{{ record.title }}</a>
      <a v-on:click="deletePost" :data-id="record._id">Удалить</a>
    </template>
    
    </a-table>
   
    </div>
    
    </client-only>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'authMe',

  data() {
    return {
      posts: [],
      columns: [
        {
          title: 'ID',
          dataIndex: '_id',
          width: '10%',
          rowKey: 'id',
        },
        {
          title: 'Название',
          dataIndex: 'title',
          width: '20%',
          slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'title' },
          rowKey: 'title',
        },
        {
          title: 'Описание',
          dataIndex: 'sub_title',

          width: '20%',
          rowKey: 'sub_title',
        },
        {
          title: 'Ссылка',
          dataIndex: 'url',
          rowKey: 'url',
        },
        {
          title: 'Ссылка на фотографию',
          dataIndex: 'imageUrl',
          rowKey: 'imageUrl',
        },
      ],
    }
  },
  methods: {
    deletePost: function (e) {
      this.$store.dispatch('posts/deleteOnePost', e.path[0].dataset.id)
    },
  },
  computed: {
    ...mapGetters({
      allPosts: 'posts/allPosts',
    }),
  },
  mounted() {
    this.$store.dispatch('posts/fetchPosts')
  },
  name: 'IndexPage',
}
</script>
<style scoped lang="">
</style>