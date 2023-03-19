<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li
        v-for="index in 10" :key="index"
        class="grid-item">

        <div class="grid-title">
          제목
        </div>

        <span class="grid-tag">
         #태그
       </span>

        <div class="grid_wrapper">
          <div class="grid-icon-bottom">
            <div class="grid-icon-wrapper">
              <span class="grid-icons">
                ❤
              </span>

              <span class="grid-icons">
                ❤
              </span>

              <span class="grid-icons">
                ❤
              </span>

              <span class="grid-icons">
                ❤
              </span>
            </div>
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

export default {
  name: 'user-worry-board',
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
