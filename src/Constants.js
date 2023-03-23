export default {
  IMAGE_LIMIT_SIZE: '6291456', // 6MB = 6291456KB
  EDITOR_IMAGE_LIMIT_CNT: 3,
  WORRY_TAG: [
    { code: 'NONE', value: '#해결되지 않은 걱정' },
    { code: 'NOT_OCCURRENCE', value: '#현실로 일어나지 않은 걱정' },
    { code: 'OCCURRENCE', value: '#이미 일어난 일에 대한 걱정' },
    { code: 'TINY', value: '#너무 사소한 걱정' },
    { code: 'CANNOT_RESOLVE', value: '#내 힘으로는 해결할 수 없는 걱정' }
  ]
}
