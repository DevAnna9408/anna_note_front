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
import ajax from '@/wrapper/ajax'
import { mapState } from 'pinia'
import { usersStore } from '@/store/users'

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
      ajax('POST', '/api/worry', {
        content: this.worryIn.content.replaceAll('\n', '<br />')
      }, null, {
        userOid: this.userCustomInfo.userOid
      }).then(_res => {
        this.$router.push({ name: 'user-after-post', params: { postWorry: JSON.stringify(_res) } })
      })
    }
  }
}
</script>
