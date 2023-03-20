<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li
        v-for="index in 10" :key="index"
        class="grid-item">

        <div class="grid-title">
          23.03.01
        </div>

        <div class="grid-tag">
          #내 힘으로는 해결할 수 없는 걱정
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
            @click="_edit"
            class="basic__button"
          >
            수정
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
   <pagination
      v-if="pagedResult.content.length > 0"
      v-model="currentPage"
      with-text
      :page-count="pagedResult.totalPages"
      :per-page="pagedResult.numberOfElements"
      @input="_inputPage"
    />
  </div>
</template>

<script>
import ajax from '@/wrapper/ajax'
import sweetAlert from '@/wrapper/sweet-alert'

export default {
  name: 'user-dream-board',
  data () {
    return {
      currentPage: 0,
      pagedResult: {
        totalPages: 0,
        numberOfElements: 0,
        content: [{}]
      }
    }
  },
  methods: {
    _edit () {
      this.$router.push({ name: 'user-edit-dream' })
    },
    _delete () {
      sweetAlert.question(null, '다짐을 삭제할까요? 이젠 다짐하지 않아도 실천하는 사람이 되었네요 :)', '삭제', '머무르기')
    },
    _inputPage (page) {
      this._getPagedResults(page - 1)
    },
    _getPagedResults (page) {
      ajax('GET', '/api/bookmark/page', null, null, {
        page: page,
        size: 3
      }).then(_res => {
        this.pagedResult = _res
        this.currentPage = _res.number + 1
        if (this.pagedResult.content.length === 0 && this.pagedResult.number !== 0) {
          this._inputPage(this.currentPage - 1)
        }
      })
    }
  }
}
</script>
