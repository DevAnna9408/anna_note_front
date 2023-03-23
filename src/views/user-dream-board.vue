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
          @click="_openModal(item.worry)"
          class="grid_content">
          {{ item.content }}
        </div>

        <div
          class="button__wrapper"
        >
          <button
            @click="_delete(item)"
            class="cancel__button"
          >
            삭제
          </button>
        </div>
    </li>
   </ul>
    <div v-if="pagedResult.content.length > 0">
      <pagination
        v-model="currentPage"
        with-text
        :page-count="pagedResult.totalPages"
        :per-page="pagedResult.numberOfElements"
        @input="_inputPage"
      />
    </div>
    <div
      v-else
      class="no__paged__result"
    >
      걱정을 다짐으로 바꿔보세요 :)
    </div>
    <modal
      class="basic-modal"
      v-if="showModal"
      @close="_close">
      <template #header>
        <div>{{ modalForm.worryTag.value }}</div>
      </template>
      <template #body>
        <div
          v-html="modalForm.content"
          class="grid_content">
        </div>
    </template>
  </modal>
</div>
</template>

<script>
import ajax from '@/wrapper/ajax'
import sweetAlert from '@/wrapper/sweet-alert'
import { mapState } from 'pinia'
import { usersStore } from '@/store/users'

export default {
  name: 'user-dream-board',
  data () {
    return {
      showModal: false,
      currentPage: 0,
      modalForm: {
        content: '',
        worryTag: { code: '', value: '' }
      },
      pagedResult: {
        totalPages: 0,
        numberOfElements: 0,
        content: [{
          dreamOid: 0,
          createdDate: '',
          content: '',
          postUserOid: 0,
          worry: {
            worryOid: 0,
            content: '',
            worryTag: { code: '', value: '' },
            createdDate: '',
            userOid: 0
          }
        }]
      }
    }
  },
  computed: {
    ...mapState(usersStore, ['userCustomInfo'])
  },
  methods: {
    _delete (data) {
      sweetAlert.question(null, '다짐을 삭제할까요? 이젠 다짐하지 않아도 실천하는 사람이 되었네요 :)', '삭제', '머무르기').then(con => {
        if (con.value) {
          ajax('DELETE', '/api/dream', null, null, {
            userOid: this.userCustomInfo.userOid,
            dreamOid: data.dreamOid
          }).then(() => {
            sweetAlert.noIcon('다짐을 삭제했습니다 :)', '확인')
            this._inputPage(this.currentPage)
          })
        }
      })
    },
    _inputPage (page) {
      this._getPagedResults(page - 1)
    },
    _getPagedResults (page) {
      ajax('GET', '/api/dream/paged', null, null, {
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
    },
    _openModal (data) {
      this.modalForm.content = data.content
      this.modalForm.worryTag = data.worryTag
      this.showModal = true
    },
    _close () {
      this.showModal = false
    }
  },
  mounted () {
    this._getPagedResults()
  }
}
</script>
