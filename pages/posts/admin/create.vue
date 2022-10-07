<template lang="">
<client-only>
    <FormCreatePost></FormCreatePost>
</client-only>
</template>
<script>
export default {
  middleware: 'authMe',
}
</script>
<style scoped lang="">
</style>