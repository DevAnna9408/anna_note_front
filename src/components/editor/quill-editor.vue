<template>
    <QuillEditor
        v-model:content="editorValue"
        :contentType="state.editorOption.contentType"
        :modules="state.editorOption.modules"
        :toolbar="state.editorOption.toolbar">
    </QuillEditor>
    <input type="file" id="image-file-input" />
</template>

<script>
import { reactive } from 'vue'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
// 이미지 동영상 사이즈 조절 모듈
import BlotFormatter from 'quill-blot-formatter'
import { ImageUpload } from '@/components/editor/image-upload'
export default {
  name: 'quill-editor',
  props: {
    modelValue: {
      type: String,
      default: ''
    }
  },
  methods: {
  },
  computed: {
    // 양방향 바인딩용
    // 에디터는 input에 바로 접근 하는게 아니기때문에 vue3의 modelValue이 적용이 되지않아서 아래처럼 적용
    editorValue: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.$emit('update:modelValue', value)
      }
    }
  },
  setup () {
    const state = reactive({
      editorOption: {
        placeholder: 'core',
        modules: [
          {
            name: 'blotFormatter',
            module: BlotFormatter,
            options: {}
          },
          {
            name: 'imageUpload',
            module: ImageUpload,
            options: {}
          }
        ],
        contentType: 'html',
        // FIXME: 프로젝트에 맞게 toolbar는 변경필요
        toolbar: 'full'
      },
      disabled: false
    })
    return { state }
  },

  components: { QuillEditor }
}
</script>
<style scoped>
#image-file-input {
  display: none;
}
</style>
