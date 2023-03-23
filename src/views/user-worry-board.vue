<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li
        v-for="(item, index) in pagedResult.content" :key="index"
        class="grid-item">

        <div class="grid-title">
          {{ item.createdDate.split('T')[0] }}
        </div>

        <div
          @click="_switchWorryTag(item)"
          class="grid-tag">
          {{ item.worryTag.value }}
        </div>

        <div
          v-html="item.content"
          class="grid_content" />

        <div
          class="button__wrapper"
        >
          <button
            @click="_dream(item)"
            class="basic__button"
          >
            다짐하기
          </button>
          <button
            @click="_delete"
            class="cancel__button"
          >
            떠나보내기
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
import { mapState } from 'pinia'
import { usersStore } from '@/store/users'
import Constants from '@/Constants'

export default {
  name: 'user-worry-board',
  data () {
    return {
      worryTag: Constants.WORRY_TAG,
      currentPage: 0,
      pagedResult: {
        totalPages: 0,
        numberOfElements: 0,
        content: [{
          content: '',
          createdDate: '',
          userOid: 0,
          worryOid: 0,
          worryTag: { code: '', value: '' }
        }]
      }
    }
  },
  computed: {
    ...mapState(usersStore, ['userCustomInfo'])
  },
  methods: {
    _dream (data) {
      sweetAlert.input('이 걱정을 보고 생각난 다짐을 간단히 적어주세요 :)', '다짐하기').then(con => {
        if (con.value !== undefined && String(con.value).replace(/^\s+|\s+$/g, '') !== '') {
          ajax('POST', '/api/dream', {
            content: con.value
          }, null, {
            userOid: this.userCustomInfo.userOid,
            worryOid: data.worryOid
          }).then(() => {
            sweetAlert.noIcon('다짐이 작성되었어요 :) 다짐 노트에서 확인 해 주세요', '확인')
          })
        }
      })
    },
    _delete () {
      sweetAlert.question(null, '걱정을 떠나보낼까요? 잘 해결되었길 바래요 :)', '떠나보내기', '머무르기')
    },
    _switchWorryTag (data) {
      const currentTag = this.worryTag.find(it => it.code === data.worryTag.code)
      const currentIndex = this.worryTag.findIndex(it => it === currentTag)
      let newValue = { code: '', value: '' }
      if (currentIndex === 4) {
        newValue = this.worryTag[0]
      } else {
        newValue = this.worryTag[currentIndex + 1]
      }
      ajax('PATCH', '/api/worry/tag', {
        worryOid: data.worryOid,
        worryTag: newValue.code
      }, null, {
        userOid: this.userCustomInfo.userOid
      }).then(_res => {
        this.pagedResult.content.find(it => it.worryOid === data.worryOid).worryTag = _res
      })
    },
    _inputPage (page) {
      this._getPagedResults(page - 1)
    },
    _getPagedResults (page) {
      ajax('GET', '/api/worry/paged', null, null, {
        userOid: this.userCustomInfo.userOid,
        page: page,
        size: 10
      }).then(_res => {
        this.pagedResult = _res
        this.currentPage = _res.number + 1
        if (this.pagedResult.content.length === 0 && this.pagedResult.number !== 0) {
          this._inputPage(this.currentPage - 1)
        }
      })
    }
  },
  mounted () {
    if (this.$route.params.visitedEdit !== undefined) {
      this._inputPage(JSON.parse(this.$route.params.visitedEdit).currentPage)
    } else {
      this._getPagedResults()
    }
  }
}
</script>
