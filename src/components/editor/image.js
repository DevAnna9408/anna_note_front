
import Constants from '@/Constants'
import { validUtil } from '@/utils/valid'
export class Image {
  constructor (quill = {}) {
    this.quill = quill
  }

  addImage (file) {
    if (this.checkBeforeAdd(file)) {
      this.insertToEditor(file)
    }
  }

  checkBeforeAdd (file) {
    // FIXME: 이미지 업로드 갯수 제한 프로젝트별로 사용 필요하면 주석해제 후 사용
    // const qlEditorContent = document.querySelector('.ql-editor')
    // const imgCnt = qlEditorContent.getElementsByTagName('img').length
    // return validUtil.imageAndSize(file.type, file.size, Constants.IMAGE_LIMIT_SIZE, '6MB 이하의 이미지만 올릴 수 있습니다.') &&
    // validUtil.imgCnt(imgCnt, Constants.EDITOR_IMAGE_LIMIT_CNT, '이미지 업로드는' + Constants.EDITOR_IMAGE_LIMIT_CNT + '개 이하로 제한됩니다.')

    return validUtil.imageAndSize(file.type, file.size, Constants.IMAGE_LIMIT_SIZE, '6MB 이하의 이미지만 올릴 수 있습니다.')
  }

  insertToEditor (file) {
    const index = (this.quill.getSelection() || {}).index || this.quill.getLength()

    // 이미지 base64 형태로 변환
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      // 이미지 업로드
      this.quill.insertEmbed(index, 'image', base64String)
    }
    reader.readAsDataURL(file)
  }
}
