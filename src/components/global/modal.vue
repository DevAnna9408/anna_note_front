<template>
  <transition name="modal">
    <div>
      <div>
        <div>
          <div style="margin-bottom: 10px;">
            <slot name="header" />
          </div>

          <div>
            <slot name="body" />
          </div>

          <div>
            <slot name="footer" />
          </div>

          <div>
            <div class="submit__btn__wrapper">
              <div class="btn__horizontal__wrapper">
                <button
                  @click.stop="closeModal"
                  class="cancel__button"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  methods: {
    /* [22.10.28]
      * 모달창은 바깥영역을 선택하면 꺼지는 옵션때문에 사용자 편의성을 위해 꺼짐현상 수정
      * 닫기 버튼을 눌러야만 모달창 닫기 가능
      * */
    closeModal (event) {
      this.$emit('close')
    }
  }
}
</script>

<style scoped lang="scss">
.submit__btn__wrapper {
  position: absolute;
  bottom: 10%;
  right: 10%;
}
</style>
