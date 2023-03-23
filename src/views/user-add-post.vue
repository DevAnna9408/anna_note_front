<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li class="grid-item">

        <div class="grid-title">
          {{ todayDate }}
        </div>

        <div class="grid_content">
          <div class="user__post__content">
            <input-textArea
              :maxlength="'200'"
              :placeholder="'시도때도 없이 떠오르는 걱정을\n\n여기에 적어주세요 :)'"
              v-model="worryIn.content"
            />
          </div>
        </div>
        <div
          class="button__wrapper"
        >
          <button
            @click="_post"
            class="basic__button"
          >
            작성
          </button>
        </div>
    </li>
   </ul>
  </div>
</template>

<script>
import { mapState } from 'pinia'
import { usersStore } from '@/store/users'
import sweetAlert from '@/wrapper/sweet-alert'

export default {
  name: 'user-add-post',
  data () {
    return {
      todayDate: new Date().toISOString().substr(0, 10).replace('T', ' '),
      worryIn: {
        content: ''
      }
    }
  },
  computed: {
    ...mapState(usersStore, ['userCustomInfo'])
  },
  methods: {
    _post () {
      if (this.worryIn.content.replace(/^\s+|\s+$/g, '') === '') sweetAlert.noIcon('걱정이 하나도 없네요!', '확인')
      else this.$router.push({ name: 'user-after-post', params: { postContent: JSON.stringify(this.worryIn.content) } })
    }
  }
}
</script>
