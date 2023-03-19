<template>
    <DatePicker
      v-model="inputValue"
      timezone="Asia/Seoul"
      color="orange"
      :mode="mode"
      :is24hr="true"
      :min-date="minDate"
      :max-date="maxDate"
      >
    <template v-slot="{ inputValue, togglePopover, inputEvents  }">
      <div class="flex items-center">
        <button
          class="p-2 bg border  hover:bg rounded-l focus:bg-blue-500 focus:text-white focus:border-blue-500 focus:outline-none"
          @click="togglePopover()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            class="w-4 h-4 fill-current"
          >
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            ></path>
          </svg>
        </button>
        <input
          v-on="inputEvents"
          :value="inputValue"
          :placeholder="placeholder"
          class="bg-white text-gray px-2 border rounded-r py-1 "
          readonly
        />
      </div>
    </template>
    </DatePicker>
    <p :class='errorMsgClass' v-show='errorMessage || meta.valid'>
      {{ errorMessage }}
    </p>
</template>

<script>
// https://vcalendar.io/ 참고
import { DatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import { useField } from 'vee-validate'
import baseInput from '@/mixins/baseInput.js'
import { watch, ref } from 'vue'
export default {
  name: 'date-picker',
  props: {
    modelValue: {},
    mode: {
      type: String,
      default: 'dateTime'
    },
    minDate: {
      type: [String, Date],
      default: ''
    },
    maxDate: {
      type: [String, Date],
      default: ''
    }
  },
  components: { DatePicker },
  mixins: [baseInput],
  setup (props) {
    var refRules = ref(props.rules)
    watch(
      () => props.rules,
      (newValue) => {
        refRules.value = newValue
      }
    )

    const {
      value: inputValue,
      errorMessage,
      meta
    } = useField(props.name, refRules, {
      initialValue: props.modelValue
    })

    return {
      errorMessage,
      inputValue,
      meta
    }
  },
  watch: {
    inputValue (val) {
      this.$emit('update:modelValue', val)
    },
    modelValue (val) {
      this.inputValue = val
    }
  },
  methods: {}
}
</script>
<style scoped>
.w-full {
    width: 100%;
}

.text-gray {
    --text-opacity: 1;
    color: #4a5568;
}
.px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.py-1 {
    padding-top: 0.62rem;
    padding-bottom: 0.62rem;
}
.border {
    border-width: 1px;
}

.rounded-b, .rounded-r {
    border-bottom-right-radius: 0.25rem;
}
.rounded-r, .rounded-t {
    border-top-right-radius: 0.25rem;
}
.bg-white {
    --bg-opacity: 1;
    background-color: #fff;
    background-color: rgba(255,255,255,var(--bg-opacity));
}
.appearance-none {
    -webkit-appearance: none;
    appearance: none;
}
.hover\:bg:hover {
    --bg-opacity: 0.5;
    background-color: #feb664bb;
}
.p-2 {
    padding: 0.5rem;
}
.border {
    border-width: 1px;
}
.rounded-l {
    border-top-left-radius: 0.25rem;
}
.rounded-b, .rounded-l {
    border-bottom-left-radius: 0.25rem;
}
.bg {
    --bg-opacity: 1;
    background-color: #feeedcbb;
}
.items-center {
    align-items: center;
}
.flex {
    display: flex;
}
.w-4 {
    width: 1rem;
}

.fill-current {
    fill: currentColor;
}
.h-4 {
    height: 1rem;
}
</style>
