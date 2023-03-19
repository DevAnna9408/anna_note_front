## vue-cli4 기반의 Front클린 프로젝트

## 사용 버전

* vue2 -> vue3  함께 변경된부분

| 이름               | 버전          | 사용                     |
| ------------------ | ------------- | ------------------------ |
| vue                | 3.0.0         |                          |
| vue-router         | 4.0.0-0       |                          |
| pinia              | 2.0.4         | vuex대체 상태관리 저장소 |
| vuex               | 4.0.0-0       |                          |
| dayjs              | 1.10.7        | 날짜                     |
| vue-kindergarten   | 0.3.3         | 인증.인가                |
| vue-i18n           | 9.2.0-beta.23 | 다국어 적용              |
| vee-validate       | 4.5.7         | 화면 validation          |
| vee-validate/i18n  | 4.5.7         | 화면 validation  다국어  |
| vue-i18n-loader    | 4.1.0         | <i18n>사용               |
| vue3-cookies       | 1.0.6         |                          |
| click-outside-vue3 | 4.0.1         |                          |
| vue-recaptcha      | 2.0.1         | 구글 캡차 v2             |

* vue3에 영향은 없지만, 버전 올림

| 이름        | 버전     | 사용        |
| ----------- | -------- | ----------- |
| axios       | 0.24.0   | api 통신    |
| aws-sdk     | 2.1048.0 | aws s3 사용 |
| sweet alert | 11.3.1   | alert       |

## 폴더 구조

```bash
├── api
│   ├── *.js				# composion api 사용 
├── assets
│   ├── css
│   ├── img
│   ├── lang
│   │   ├── general			# 라벨 다국어
│   │   ├── veeValidate		# validation 사용 다국어
├── components
│   ├── global
│   │   ├── index.js
│   │   ├── *.vue
│   ├── layout   			# 헤더,사이드바,푸터
│   ├── captcha.veu			# 구글v2 캡차
├── kindergarten			# 인증,인가처리
│   ├── governesses
│   ├── perimeters
│   ├── childs.js
├── mixins
│   ├── global
│   │   ├── index.js
│   │   ├── *.js
│   ├── *.js
├── plugins
│   ├── index.js
│   ├── i18n.js				# 다국어 설정(general 폴더 적용)
│   ├── vue-derective.js
│   ├── vue-validate.js		# validation(언어설정,veeValidate폴더 사용자 정의 적용)
│   ├── vue3-cookies.js		# cookie 설정
├── router
│   ├── index.js			# 라우터 설정(타이틀 적용, 킨더가든적용, 모드설정..)
│   ├── routes.js			# view와 url 연결 (레이아웃연결)
├── store
│   ├── errors.js			# 에러토스트(최상단 토스)
│   ├── i18n.js				# 다국어	
│   ├── loading.js		
│   ├── users.js			# 회원(로그인,로그아웃,회원가입)
├── utils
│   ├── date.js
│   ├── type.js
│   ├── uuid.js
│   ├── browserCheck.js		# 현재 브라우저 체크
├── views
│   ├── *.vue
├── wrapper					# 기존 플러그인에 맞춰서 재정의
│   ├── ajax.js				# axios
│   ├── sweetAlert.js		# sweetAlert 
├── App.vue
├── main.js
```

### lint 규칙

- `standard` 적용됨
- `git add` 에 연결됨

### 다국어 사용 

* `<i18n>` 블럭사용시 

  ```js
  import { useI18n } from 'vue-i18n' 
  setup () {
      const { t } = useI18n({})
      return {
        t
      }
    },
  <i18n>
  {
    "en": {
      "login_label": "login"
    },
    "ko": {
      "login_label": "로그인"
    }
  }
  </i18n>
  ```

* `general` 폴더 글로벌 사용시 

  ```js
     <p>{{ $t("home.test", { msg: "hello" }) }}</p>  #글로벌선언된 $t사용가능  #param가능
     <p>영어모드 {{ $t("home.test", {}, { locale: "en" }) }}</p> #따로 언어 선택가능
     <p>한글모드 {{ $t("home.test", {}, { locale: "ko" }) }}</p>
  ```

  ```json
  {
      "home": {
        "test": "{msg}한글"  #param가능
  
      }
  }
  ```

### pinia 

> vuex를 대체하는 저장소
>
> https://vueschool.io/articles/vuejs-tutorials/pinia-an-alternative-vue-js-store/

* module이 없음 

* `getters`

  ```js
    getters: {
      loggedInAccessToken: (_state) => _state.accessToken, #화살표사용시, this 불가
      loggedInUserRoleType () { return this.user.roles }  
    },
  ```

* `mutaion` 삭제됨 > action에서 사용

  * $patch  >> devTools에서 확인시 하나로 묶여서 확인 가능함 

    * 두개 이상의 mutaion시 

    ```js
      actions: {    
    	logout () {
          this.$patch((state) => {
            state.accessToken = null
            state.user = {}
          })
        }
      }
    ```

  * state 직접 변경  >>  devTools에서 확인시 각각 두번의 mutation처리로 확인됨

    ```js
      actions: {      
    	logout () {
            this.accessToken = null
            this..user = {}   
        }
      }
    ```

    

* vue에서 사용

  * `mapState  ,mapActions` 만 있음 

  ```js
  import { usersStore } from '@/store/users'
  import { mapState, mapActions } from 'pinia'
  export default {
    computed: {
      ...mapState(usersStore, ['isUser'])
    },
    methods: {
      ...mapActions(usersStore, ['logout'])
    }
  }
  ```

* js

  ```js
  import { usersStore } from '@/store/users'
  
    usersStore().logout()
    const accessToken = usersStore().loggedInAccessToken
  ```
