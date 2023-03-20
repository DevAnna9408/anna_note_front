<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li class="grid-item">

        <div class="grid-title">
          22.03.01
        </div>

        <div class="grid_content">
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
          내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다. 내용입니다.
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

export default {
  name: 'user-after-post',
  data () {
    return {}
  },
  methods: {
    _confirm () {
      this.$router.push({ name: 'user-worry-board' })
    },
    _delete () {
      sweetAlert.question(null, '메모한 걱정을 삭제할까요? 때론 너무 사소한 걱정을 하는 것도 스트레스가 될 수 있어요 :)', '떠나보내기', '머무르기')
    }
  }
}
</script>
