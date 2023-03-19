<template>
  <div>
    <label
    :class="labelClass"
    :for='name'>{{ label }}</label>
    <Field
      as="select"
      v-bind="selectAttributes"
      :rules="rules" >
      <option value="" disabled>Select a drink</option>
      <option
      v-for="option of options"
      :key="option.code"
      :value="option.code">{{option.value}}</option>
    </Field>
    <ErrorMessage
      v-if="errorMsgUsed"
      :class="errorMsgClass"
      :name="name" />
  </div>
</template>

<script>
import baseInput from '@/mixins/baseInput.js'
export default {
  name: 'input-select',
  props: {
    options: {
      type: Array,
      default: function () {
        return [
          {
            code: '01',
            value: '경영학과'
          },
          {
            code: '02',
            value: '정보통신학과'
          }
        ]
      }
    }
  },
  mixins: [baseInput],
  computed: {
    selectAttributes () {
      return {
        ...this.$attrs,
        name: this.name,
        disabled: this.disabled,
        readonly: this.readonly,
        class: this.inputClass
      }
    }
  }
}
</script>
