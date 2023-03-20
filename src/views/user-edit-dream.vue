<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li class="grid-item">

        <div class="grid-title">
          22.03.01
        </div>

        <div class="grid_content">
          <div class="user__post__content">
            <input-textArea
              :maxlength="'1024'"
              :placeholder="'시도때도 없이 떠오르는 걱정을\n\n여기에 적어주세요 :)'"
            />
          </div>
        </div>
        <div
          class="button__wrapper"
        >
          <button
            @click="_edit"
            class="basic__button"
          >
            수정
          </button>
          <button
            @click="_back"
            class="cancel__button"
          >
            돌아가기
          </button>
        </div>
    </li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'user-edit-dream',
  data () {
    return {
    }
  },
  methods: {
    _edit () {
      this.$router.push({ name: 'user-dream-board' })
    },
    _back () {
      this.$router.push({ name: 'user-dream-board' })
    }
  }
}
</script>
