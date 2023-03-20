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
export default {
  name: 'user-add-post',
  data () {
    return {
    }
  },
  methods: {
    _post () {
      this.$router.push({ name: 'user-after-post' })
    }
  }
}
</script>
