import { Field, ErrorMessage } from 'vee-validate'
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {},
    name: {
      type: String,
      required: true
    },
    label: {
      type: String
    },
    rules: {
      type: [String, Object],
      default: ''
    },
    inputClass: {
      type: [String, Object],
      default: ''
    },
    labelClass: {
      type: [String, Object],
      default: 'input-title'
    },
    errorMsgClass: {
      type: [String, Object],
      default: 'errors-msg'
    },
    errorMsgUsed: {
      type: Boolean,
      default: true
    },
    disabled: Boolean,
    readonly: Boolean,
    placeholder: String,
    maxlength: {
      type: [String, Number],
      default: 50
    }
  },
  components: {
    Field,
    ErrorMessage
  }
}
