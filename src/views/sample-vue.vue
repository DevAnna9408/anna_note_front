<template>
  <div id="home-main" class="admin-container">
    <div class="container">
      <div class="row">
        <h2>Hello World!</h2>
      </div>
      <div class="row">
        <button class="btn btn-primary no-radius" v-show="$admin.isAllowed('read')">관리자 권한일때만 보임</button>
      </div>
      <div class="row">
        <div class="col col-10">
          <h1>다국어 테스트</h1>
          <p>{{ $t('home.test', { msg: 'hello' }) }}</p>
          <p>영어모드 {{ $t('home.test', {}, { locale: 'en' }) }}</p>
          <p>한글모드 {{ $t('home.test', {}, { locale: 'ko' }) }}</p>
          {{ valueByCurrentLang('한글믹스인', '영문믹스인') }}
        </div>
      </div>
      <div class="row">
        <div class="col col-10">
          <sampleValidation/>
        </div>
      </div>
      <div class="row">
        <div class="col col-10">
          <Form @submit="success">
            <input-textArea
              v-model="inputTextArea"
              maxlength="100"
              placeholder="test"
              name="input-testArea-test"
              label="텍스트 에어리어"
              :rules="{ required: true }"
            ></input-textArea>
            <input-select
              v-model="inputSelect"
              name="input-select-test"
              label="셀렉트"
              :rules="{ required: true }"
            >
            </input-select>
            <input-radio
              v-model="inputRadio"
              name="input-radio-test"
              label="라디오"
              :rules="{ required: true }"
              type="radio"
            >
            </input-radio>
            <input-checkbox
              v-model="inputCheckBox"
              name="input-check"
              label="체크박스"
              type="checkbox"
            >
            </input-checkbox>
             <input-checkbox-multi
               v-model="inputCheckBoxMulti"
               name="input-check-test"
               label="체크박스"
               :rules="{ required: true }"
               type="checkbox"
              >
              </input-checkbox-multi>
            <!-- 에디터 -->
            <quill-editor v-model="editorText"></quill-editor>
            <DatePicker v-model="date" :rules="{ required: true }" name="dateTest"></DatePicker>
          </Form>
        </div>
      </div>
      <div class="row">
        <div class="col col-10">
          <h1>버튼</h1>
          <button class="btn btn-primary" @click="success()">성공</button>
          <button class="btn orange-border" @click="error()">error</button>
          <button class="btn grey-box small" @click="question()">question</button>
        </div>
      </div>
      <div class="row">
        <div class="col col-10">
          <h1>dateUtil</h1>
          <div>
            {{formateDateTimeTest}}
            {{now}}
            {{formateRegisterDateTest}}
            {{timestampToDateTimeTest}}
            {{isOverTest}}
            {{isNowInPeriodTest}}
            {{now2}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sampleValidation from '@/components/sample-validation.vue'
import adminPerimeter from '@/kindergarten/perimeters/admin-perimeter'
import sweetAlert from '@/wrapper/sweet-alert'
import ajax from '@/wrapper/ajax'
import dateUtil from '@/utils/date'
import quillEditor from '@/components/editor/quill-editor.vue'
import DatePicker from '@/components/date-picker.vue'
const ajaxTest = () => {
  const post = () => {
    ajax('POST', '/api/sign-in', {
      userId: 'userId',
      password: 'password'
    }).then(
      (_data) => {
      }
    )
  }
  return { post }
}
const alert = () => {
  const success = () => {
    sweetAlert.success('제목', '내용')
  }
  const error = () => {
    sweetAlert.error('제목', '내용')
  }
  const question = () => {
    sweetAlert.question('제목', '내용')
  }
  return {
    success,
    error,
    question
  }
}

export default {
  name: 'sample-vue',
  perimeters: [adminPerimeter],
  data () {
    return {
      inputTextArea: 'tt',
      inputSelect: '01',
      inputRadio: '',
      inputCheckBox: '',
      inputCheckBoxMulti: '',
      editorText: '',
      color: '#f80b',
      date: new Date()
    }
  },
  setup () {
    return {
      ...alert(),
      login: ajaxTest().post
    }
  },
  components: { sampleValidation, quillEditor, DatePicker },
  computed: {
    formateDateTimeTest () {
      return dateUtil.formateDateTime('2022-01-01')
    },
    now () {
      return dateUtil.getNowDate()
    },
    formateRegisterDateTest () {
      return dateUtil.formateRegisterDate('2022-01-01')
    },
    timestampToDateTimeTest () {
      return dateUtil.timestampToDateTime('1548381600000')
    },
    isOverTest () {
      return dateUtil.isOver('2023-01-01')
    },
    isNowInPeriodTest () {
      return dateUtil.isNowInPeriod('2022-01-01', '2022-03-01')
    },
    now2 () {
      return dateUtil.getNowDateTime()
    }
  }
}
</script>
