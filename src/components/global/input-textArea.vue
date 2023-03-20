<template>
  <div>
    <label
    :class="labelClass"
    :for='name'>{{ label }}</label>
    <textarea
        v-bind="textareaAttributes"
        v-model="inputValue"
        >
    </textarea>
  </div>
</template>

<script>
import { useField } from 'vee-validate'
import baseInput from '@/mixins/baseInput.js'
export default {
  name: 'input-textArea',
  props: {
    textCntClass: {
      type: [String, Object],
      default: ''
    },
    modelValue: {}
  },
  mixins: [baseInput],
  computed: {
    textareaAttributes () {
      return {
        ...this.$attrs,
        name: this.name,
        disabled: this.disabled,
        placeholder: this.placeholder,
        readonly: this.readonly,
        class: this.inputClass,
        maxlength: this.maxlength
      }
    }
  },
  setup (props) {
    // we don't provide any rules here because we are using form-level validation
    // https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue
    })

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta
    }
  },
  data () {
    return {
      currentTextCnt: 0
    }
  }
}
</script>

<style  scoped>
</style>
