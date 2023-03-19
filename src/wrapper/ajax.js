import axios from 'axios'
import sweetAlert from '@/wrapper/sweet-alert'
import { i18nStore } from '@/store/i18n'
import { usersStore } from '@/store/users'
import { errorsStore } from '@/store/errors'
import { loadingStore } from '@/store/loading'
import { i18n } from '@/plugins/i18n'

const { t } = i18n.global

const API_DOMAIN = process.env.VUE_APP_API_DOMAIN

const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const NOT_FOUND = 404
const INTERNAL_SERVER_ERROR = 500

const setError = (_data) => {
  sweetAlert.noIcon(_data.message || t('error.server'), '확인')
  throw _data
}

const setGlobalError = (_data) => {
  errorsStore().populateErrors({
    detail: {
      message: t('error.server')
    }
  })
  throw _data
}

const setNetworkError = (result, alert) => {
  if (alert) {
    return setGlobalError(result)
  } else {
    throw result
  }
}

const removeAccessToken = (_err) => {
  usersStore().logout()
  sweetAlert.noIcon(_err.warningMessage || _err.message, '확인')
  throw _err
}

const unAuthorized = () => {
  usersStore().logout()
  sweetAlert.noIcon('자동 로그인 시간이 만료되었습니다. 다시 로그인 해 주세요 :)', '확인')
}

function exception (result, errTitle, alert) {
  if (result instanceof Error && result.message === 'Network Error') {
    setNetworkError(result, alert)
  } else {
    const err = result.response // api에서 통신이 되었다 전체
    switch (err.status) {
      case FORBIDDEN:
        removeAccessToken(err.data)
        break
      case BAD_REQUEST:
        removeAccessToken(err.data)
        break
      case NOT_FOUND: // 404(잘못된 url 혹은 비정상적 접근)경우 로그인 페이지로 이동시킨다
        removeAccessToken(err.data)
        break
      case UNAUTHORIZED: // 401(인증)경우 로그인 페이지로 이동시킨다
        unAuthorized()
        break
      case INTERNAL_SERVER_ERROR:
        setError(err.data, errTitle) // 사용자 에러 처리
        break
      default:
        setNetworkError(result, alert)
    }
  }
}

export const ajaxWithoutLoading = (
  method,
  url,
  data,
  header,
  params,
  errTitle
) => {
  return ajax(method, url, data, header, params, errTitle, true, false)
}

export const ajax = (
  method,
  url,
  data,
  header,
  params,
  errTitle,
  alert = true,
  loading = true
) => {
  const accessToken = usersStore().loggedInAccessToken
  const locale = i18nStore().currentLocale
  loadingStore().setLoading(loading)
  return axios({
    method,
    url: API_DOMAIN + url,
    data,
    headers: {
      ...header,
      'Content-Type': 'application/json; charset=utf-8',
      'Accept-Language': locale,
      Authorization: `Bearer ${accessToken}`
    },
    params
  })
    .then((result) => {
      return result.data
    })
    .catch((result) => {
      exception(result, errTitle, alert)
    })
    .finally(() => {
      loadingStore().setLoading(false)
    })
}
export default ajax
