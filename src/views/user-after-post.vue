<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li class="grid-item">

        <div class="grid-title">
          22.03.01
        </div>

        <div
          v-html="postWorry.content"
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

export default {
  name: 'user-after-post',
  data () {
    return {
      postWorry: {
        content: '',
        createdDate: '',
        userOid: 0,
        worryOid: 0,
        worryTag: { code: '', value: '' }
      }
    }
  },
  methods: {
    _confirm () {
      this.$router.push({ name: 'user-worry-board' })
    },
    _delete: function () {
      sweetAlert.question(null, '메모한 걱정을 삭제할까요? 때론 너무 사소한 걱정을 하는 것도 스트레스가 될 수 있어요 :)', '떠나보내기', '머무르기')
        .then(con => {
          if (con.value) {
            ajax('DELETE', '/api/worry', null, null, {
              userOid: this.postWorry.userOid,
              worryOid: this.postWorry.worryOid
            }).then(() => {
              sweetAlert.noIcon('걱정을 떠나보냈습니다 :)', '확인')
              this.$router.push({ name: 'user-add-post' })
            })
          }
        })
    }
  },
  mounted () {
    if (this.$route.params.postWorry) this.postWorry = JSON.parse(this.$route.params.postWorry)
    else this.$router.push({ name: 'user-add-post' })
  }
}
</script>
