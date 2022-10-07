<template lang="">
    <client-only>
    <div>
       <a-alert v-if="isAlert" :message="messageAlert" type="error" show-icon /> 
        <a-form  @submit.prevent="onSubmit">
            <a-form-item label="Название">
                <a-input  v-model="title"></a-input>
                <div class="error" v-for="messageError of error">
                    {{ messageError.title }}
                </div>
            </a-form-item>
            <a-form-item label="Описание">
                <a-textarea v-model="sub_title" placeholder="Sub-title" :rows="4" />
                <div class="error" v-for="messageError of error">
                    {{ messageError.sub_title }}
                </div>
            </a-form-item>
            <a-form-item label="url">
                <a-input v-model="url" placeholder="url" :rows="4" />
                <div class="error" v-for="messageError of error">
                    {{ messageError.url }}
                </div>
            </a-form-item>
            <a-form-item label="imageUrl">
                <a-input v-model="imageUrl" placeholder="imageUrl" :rows="4" />
                <div class="error" v-for="messageError of error">
                    {{ messageError.imageUrl }}
                </div>
            </a-form-item>
            <client-only>
            <VueEditor v-model="html_text"/>
           </client-only>
            <a-form-item >
              <a-button @click.prevent="onSubmit" type="submit">Create</a-button>
            </a-form-item>
          </a-form>
    </div>
</client-only>
</template>
<script >
import { reactive, ref, computed } from 'vue'
import { defineComponent, useStore } from '@nuxtjs/composition-api'
export default defineComponent({
  setup() {
    const store = useStore()
    const title = ref('')
    const sub_title = ref('')
    const url = ref('')
    const imageUrl = ref('')
    const html_text = ref('')
    const isAlert = ref(false)
    const error = ref([])
    const messageAlert = ref('')

    function validateRequire(array) {
      let messageErrors = []
      array.forEach((element, i) => {
        const objectKey = Object.keys(element),
          currentValue = element[objectKey[0]].value,
          currentKey = objectKey[0],
          obj = {}
        obj[currentKey] = []
        if (currentValue.length == 0) {
          obj[currentKey].push('Значение не должно быть пустом')
          messageErrors.push(obj)
        }
        if (currentValue.length < 5) {
          obj[currentKey].push('Введите больше 5 символов')
          messageErrors.push(obj)
        }
      })
      return messageErrors
    }
    const onSubmit = async () => {
      const messageError = validateRequire([
        { title },
        { sub_title },
        { url },
        { imageUrl },
      ])
      error.value = messageError
      if (error.value.length != 0) {
        messageAlert.value = 'Введите значение'
        isAlert.value = true

        return
      }

      const response = await store
        .dispatch('posts/createPost', {
          title: title.value,
          sub_title: sub_title.value,
          html_text: html_text.value,
          url: url.value,
          imageUrl: imageUrl.value,
        })
        .then(() => {
            isAlert.value = false
        })
        .catch((e) => {
          isAlert.value = true

          console.log(isAlert.value)
          messageAlert.value = 'Ошибка какое то из значений не валидное'
        })

 
    }
    return {
      title,
      sub_title,
      html_text,
      url,
      isAlert,
      error,
      messageAlert,
      imageUrl,
      onSubmit,
    }
  },
})

// import { VueEditor } from 'vue2-editor'
</script>
<style>
.error {
  color: red;
}
</style>