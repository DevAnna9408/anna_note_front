import vClickOutside from 'click-outside-vue3'
const directives = {}

var focus = {
  inserted: function (el, binding) {
    if (binding.value) el.focus()
    else el.blur()
  },

  componentUpdated: function (el, binding) {
    if (binding.modifiers.lazy) {
      if (Boolean(binding.value) === Boolean(binding.oldValue)) {
        return
      }
    }

    if (binding.value) el.focus()
    else el.blur()
  }
}

directives.focus = {
  name: 'focus',
  value: focus
}

directives.clickOutside = {
  name: 'click-outside',
  value: vClickOutside.directive
}
export default directives
