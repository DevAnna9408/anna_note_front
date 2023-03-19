<template>
  <div>
    <label
    :class="labelClass"
    :for='name'>{{ label }}</label>
    <Field
      v-bind="textAttributes"
      v-focus="inputFocus"
      @focus="focused = true" @blur="focused = false"
      :rules="rules" />
    <ErrorMessage
      v-if="errorMsgUsed"
      :class="errorMsgClass"
      :name="name" />
  </div>
</template>

<script>
import baseInput from '@/mixins/baseInput.js'
export default {
  name: 'input-text',
  props: {
    autoComplete: {
      type: String,
      defaultf: 'on'
    },
    inputFocus: {
      type: Object,
      required: false,
      default: function () {
        return {
          focused: false,
          isUse: false
        }
      }
    }
  },
  mixins: [baseInput],
  computed: {
    textAttributes () {
      return {
        ...this.$attrs,
        type: this.type,
        name: this.name,
        disabled: this.disabled,
        placeholder: this.placeholder,
        readonly: this.readonly,
        class: this.inputClass,
        maxlength: Number(this.maxlength),
        autocomplete: this.autoComplete
      }
    },
    focused: {
      get () {
        return this.inputFocus.focused
      },
      set (value) {
        this.$emit('update:inputFocus', {
          focused: value,
          isUse: true
        })
      }
    }
  },
  methods: {
    focus () {
      this.focused = true
      this.$emit('focus', true)
    },
    blur () {
      this.focused = false
      this.$emit('focus', false)
    }
  }
}
</script>
