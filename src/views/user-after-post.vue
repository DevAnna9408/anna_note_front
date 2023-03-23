<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li class="grid-item">

        <div class="grid-title">
          22.03.01
        </div>

        <div
          v-html="content"
          class="grid_content">
        </div>
        <div
          class="button__wrapper"
        >
          <button
            @click="_confirm"
            class="basic__button"
          >
            확인
          </button>
          <button
            @click="_delete"
            class="cancel__button"
          >
            삭제
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import sweetAlert from '@/wrapper/sweet-alert'
import ajax from '@/wrapper/ajax'
import { mapState } from 'pinia'
import { usersStore } from '@/store/users'

export default {
  name: 'user-after-post',
  data () {
    return {
      content: ''
    }
  },
  computed: {
    ...mapState(usersStore, ['userCustomInfo'])
  },
  methods: {
    _confirm () {
      ajax('POST', '/api/worry', {
        content: this.content.replaceAll('\n', '<br />')
      }, null, {
        userOid: this.userCustomInfo.userOid
      }).then(_res => {
        sweetAlert.noIcon('걱정을 메모했습니다 :)', '확인')
        this.$router.push({ name: 'user-worry-board' })
      })
    },
    _delete: function () {
      sweetAlert.question(null, '메모한 걱정을 삭제할까요? 때론 너무 사소한 걱정을 하는 것도 스트레스가 될 수 있어요 :)', '떠나보내기', '머무르기')
        .then(con => {
          if (con.value) {
            this.$router.push({ name: 'user-add-post' })
          }
        })
    }
  },
  mounted () {
    if (this.$route.params.postContent) this.content = JSON.parse(this.$route.params.postContent)
    else this.$router.push({ name: 'user-add-post' })
  }
}
</script>
