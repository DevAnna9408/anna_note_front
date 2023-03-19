<template>
  <div>
    <label
    :class="labelClass">{{ label }}</label>
    <Field
      v-slot="{ field }"
      v-bind="radioAttributes"
      :rules="rules" >
      <label
      v-for="radio of radioList"
       :key="radio.code">
      <input type="radio" :name="name" v-bind="field" :value="radio.code" />
        {{radio.value}}
      </label>
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
  name: 'input-radio',
  props: {
    radioList: {
      type: Array,
      default: function () {
        return [
          {
            code: '01',
            value: '남자'
          },
          {
            code: '02',
            value: '여자'
          }
        ]
      }
    }
  },
  mixins: [baseInput],
  computed: {
    radioAttributes () {
      return {
        ...this.$attrs,
        name: this.name,
        type: 'radio',
        disabled: this.disabled,
        readonly: this.readonly,
        class: this.inputClass
      }
    }
  }
}
</script>
