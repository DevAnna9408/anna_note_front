import axios from 'axios'
import sweetAlert from '@/wrapper/sweet-alert'
import { i18nStore } from '@/store/i18n'
import { usersStore } from '@/store/users'
import { errorsStore } from '@/store/errors'
import { loadingStore } from '@/store/loading'
import { i18n } from '@/plugins/i18n'
const { t } = i18n.global

const API_DOMAIN = process.env.VUE_APP_API_DOMAIN

const FORBIDDEN = 403
const UNAUTHORIZED = 401
const BAD_REQUEST = 400
const INTERNAL_SERVER_ERROR = 500

const setError = (_data, errTitle) => {
  sweetAlert.warning(errTitle, _data.message || t('error.server'))
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
  sweetAlert.warning('', _err.warningMessage || _err.message)
  usersStore().logout()
  throw _err
}

function exception (result, errTitle, alert) {
  if (result instanceof Error && result.message === 'Network Error') {
    setNetworkError(result, alert)
  } else {
    const err = result.response // api에서 통신이 되었다 전체
    switch (err.status) {
      case UNAUTHORIZED: // 401(인증)경우 로그인 페이지로 이동시킨다
        removeAccessToken(err.data)
        break
      case FORBIDDEN:
      case BAD_REQUEST:
      case INTERNAL_SERVER_ERROR:
        setError(err.data, errTitle) // 사용자 에러 처리
        break
      default:
        setNetworkError(result, alert)
    }
  }
}

export const ajax = (
  method,
  url,
  data,
  header,
  params,
  errTitle,
  alert = true
) => {
  const accessToken = usersStore().loggedInAccessToken
  const locale = i18nStore().currentLocale
  loadingStore().setLoading(true)
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

export const download = (
  method,
  url,
  data,
  header,
  params,
  errTitle,
  alert = true
) => {
  const accessToken = usersStore().loggedInAccessToken
  const locale = i18nStore().currentLocale
  loadingStore().setLoading(true)
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
    params,
    responseType: 'arraybuffer'
  })
    .then((_res) => {
      const file = new Blob([_res.data])
      const a = document.createElement('a')
      const url = window.URL.createObjectURL(file)
      a.href = url
      a.download = decodeURI(
        _res.headers['content-disposition']
          .toString('binary')
          .split('filename=')[1]
      )
      document.body.appendChild(a)
      a.click()
      a.parentNode.removeChild(a)
    })
    .catch((result) => {
      exception(result, errTitle, alert)
    })
    .finally(() => {
      loadingStore().setLoading(false)
    })
}

export const ajaxAll = (requests) => {
  return axios
    .all(requests)
    .then((result) => result)
    .catch((result) => {
      exception(result)
    })
}

export default ajax
