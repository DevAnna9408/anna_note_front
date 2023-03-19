<template>
  <div id="user-board">
    <ul class="grids grid">
      <li
        v-for="index in 10" :key="index"
        class="grid-item">

        <div class="grid-title">
          제목
        </div>

        <div class="grid_wrapper">

          <div class="grid-progress">
            <div class="grid-progress-bg">
              <span class="grid-progress-fg" style="width: 88%;" />
            </div>

        <div class="grid-progress-labels">
          <span class="grid-progress-label">
            88%
          </span>

          <span class="grid-completes">
            490 / 500
          </span>
        </div>
      </div>

      <div class="grid_content">
        내용
      </div>
       <span class="grid-tag">
         #태그
       </span>
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
  name: 'user-board',
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
