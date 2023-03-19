import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone')
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Seoul')

const dateUtil = {
  formateDateTime (date) {
    return dayjs(date).format('YYYYMMDDHHmmss')
  },
  getNowDateTime () {
    return this.formateDateTime(dayjs())
  },
  formateDate (date) {
    return dayjs(date).format('YYYY/MM/DD')
  },
  formateRegisterDate (date) {
    return dayjs(date).format('YYMMDD')
  },
  getNowDate () {
    return this.formateDate(dayjs())
  },
  isNowInPeriod (start, end) {
    return dayjs(start) < dayjs() && dayjs() < dayjs(end)
  },
  isOver (date) {
    return dayjs(date) < dayjs()
  },
  timestampToDateTime (timestamp) {
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
  }
}

export default dateUtil
