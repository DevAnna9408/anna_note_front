import sweetAlert from '@/wrapper/sweet-alert'
export const REGEXP = {
  IMAGE: /^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i,
  YOUTUBE: /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/,
  YOUTUBE2: /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/,
  YOUTUBE3: /^(http(s)?:\/\/)?((w){3}|m\.)?youtu(be|.be)?(\.com)?\/.+/

}
// TODO: alert 은 분리 할수 있음 (추후 논의)
export const validUtil = {
  checkAndAlert (regexp, target, message) {
    if (regexp.test(target)) {
      return true
    } else {
      sweetAlert.error('', message)
      return false
    }
  },
  image (target, message) {
    return validUtil.checkAndAlert(REGEXP.IMAGE, target, message)
  },
  imageAndSize (target, TargetSize, size, message) {
    if ((REGEXP.IMAGE.test(target) && TargetSize < size)) {
      return true
    } else {
      sweetAlert.error('', message)
      return false
    }
  },

  imgCnt (target, targetCnt, message) {
    if (target < targetCnt) {
      return true
    } else {
      sweetAlert.error('', message)
      return false
    }
  }
}
