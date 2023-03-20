<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li class="grid-item">

        <div class="survey-progress">
          <div class="survey-name">
            해결되지 않은 걱정
            <div>
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 0%;" />
            </span>

              <span class="survey-progress-labels">
              <span class="survey-progress-label">
                0%
              </span>

            <span class="survey-completes">
              0 / 100
            </span>
          </span>
            </div>
          </div>
        </div>

        <div class="survey-progress">
          <div class="survey-name">
            현실로 일어나지 않은 걱정
            <div>
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 20%;" />
            </span>

              <span class="survey-progress-labels">
              <span class="survey-progress-label">
                20%
              </span>

            <span class="survey-completes">
              20 / 100
            </span>
          </span>
            </div>
          </div>
        </div>

        <div class="survey-progress">
          <div class="survey-name">
            이미 일어난 일에 대한 걱정
            <div>
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 50%;" />
            </span>

              <span class="survey-progress-labels">
              <span class="survey-progress-label">
                50%
              </span>

            <span class="survey-completes">
              50 / 100
            </span>
          </span>
            </div>
          </div>
        </div>

        <div class="survey-progress">
          <div class="survey-name">
            너무 사소한 걱정
            <div>
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 10%;" />
            </span>

              <span class="survey-progress-labels">
              <span class="survey-progress-label">
                10%
              </span>

            <span class="survey-completes">
              10 / 100
            </span>
          </span>
            </div>
          </div>
        </div>

        <div class="survey-progress">
          <div class="survey-name">
            내 힘으로는 해결할 수 없는 걱정
            <div>
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 0%;" />
            </span>

              <span class="survey-progress-labels">
              <span class="survey-progress-label">
                0%
              </span>

            <span class="survey-completes">
              0 / 100
            </span>
          </span>
            </div>
          </div>
        </div>

        <div class="survey-progress">
          <div class="survey-name">
            해결된 걱정
            <div>
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" style="width: 20%;" />
            </span>

              <span class="survey-progress-labels">
              <span class="survey-progress-label">
                20%
              </span>

            <span class="survey-completes">
              20 / 100
            </span>
          </span>
            </div>
          </div>
        </div>

        <div class="survey-progress">
          <div class="survey-name">
            이미 일어날 일에 대한
            <br />
            걱정을 많이 하는 편이네요!
            <br />
            <br />
            모든 일이 잘 해결 될 거에요
            <br />
            너무 걱정하지 말아요 :)
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'user-graph',
  data () {
    return {
    }
  }
}
</script>
<style scoped lang="scss">
.grid-item {
  height: 100% !important;
}
.survey-name {
  text-align: center;
}
</style>
