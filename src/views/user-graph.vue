<template>
  <div id="user-dream-board">
    <ul class="grids grid">
      <li class="grid-item">

        <div class="survey-progress">
          <div class="survey-name">
            해결되지 않은 걱정
            <div>
            <span class="survey-progress-bg">
              <span class="survey-progress-fg" :style="{ width: totalWorries.noneCount / totalWorries.totalWorry * 100 + '%' }" />
            </span>

              <span class="survey-progress-labels">
              <span
                v-if="isNaN(totalWorries.noneCount / totalWorries.totalWorry * 100)"
                class="survey-progress-label">
                0%
              </span>
              <span v-else class="survey-progress-label">
                {{ totalWorries.noneCount / totalWorries.totalWorry * 100 }}%
              </span>

            <span class="survey-completes">
              {{ totalWorries.noneCount }} / {{ totalWorries.totalWorry }}
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
              <span class="survey-progress-fg" :style="{ width: totalWorries.notOccurrenceCount / totalWorries.totalWorry * 100 + '%' }" />
            </span>

              <span class="survey-progress-labels">
              <span
                v-if="isNaN(totalWorries.notOccurrenceCount / totalWorries.totalWorry * 100)"
                class="survey-progress-label">
                0%
              </span>
              <span v-else class="survey-progress-label">
                {{ totalWorries.notOccurrenceCount / totalWorries.totalWorry * 100 }}%
              </span>

            <span class="survey-completes">
              {{ totalWorries.notOccurrenceCount }} / {{ totalWorries.totalWorry }}
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
              <span class="survey-progress-fg" :style="{ width: totalWorries.occurrenceCount / totalWorries.totalWorry * 100 + '%' }" />
            </span>

              <span class="survey-progress-labels">
              <span
                v-if="isNaN(totalWorries.occurrenceCount / totalWorries.totalWorry * 100)"
                class="survey-progress-label">
                0%
              </span>
              <span v-else class="survey-progress-label">
                {{ totalWorries.occurrenceCount / totalWorries.totalWorry * 100 }}%
              </span>

            <span class="survey-completes">
              {{ totalWorries.occurrenceCount }} / {{ totalWorries.totalWorry }}
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
              <span class="survey-progress-fg" :style="{ width: totalWorries.tinyCount / totalWorries.totalWorry * 100 + '%' }" />
            </span>

              <span class="survey-progress-labels">
              <span
                v-if="isNaN(totalWorries.tinyCount / totalWorries.totalWorry * 100)"
                class="survey-progress-label">
                0%
              </span>
              <span v-else class="survey-progress-label">
                {{ totalWorries.tinyCount / totalWorries.totalWorry * 100 }}%
              </span>

            <span class="survey-completes">
              {{ totalWorries.tinyCount }} / {{ totalWorries.totalWorry }}
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
              <span class="survey-progress-fg" :style="{ width: totalWorries.cannotResolveCount / totalWorries.totalWorry * 100 + '%' }" />
            </span>

              <span class="survey-progress-labels">
              <span
                v-if="isNaN(totalWorries.cannotResolveCount / totalWorries.totalWorry * 100)"
                class="survey-progress-label">
                0%
              </span>
              <span v-else class="survey-progress-label">
                {{ totalWorries.cannotResolveCount / totalWorries.totalWorry * 100 }}%
              </span>

            <span class="survey-completes">
              {{ totalWorries.cannotResolveCount }} / {{ totalWorries.totalWorry }}
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
              <span class="survey-progress-fg" :style="{ width: totalWorries.doneCount / totalWorries.totalWorry * 100 + '%' }" />
            </span>

              <span class="survey-progress-labels">
              <span
                v-if="isNaN(totalWorries.doneCount / totalWorries.totalWorry * 100)"
                class="survey-progress-label">
                0%
              </span>
              <span v-else class="survey-progress-label">
                {{ totalWorries.doneCount / totalWorries.totalWorry * 100 }}%
              </span>

            <span class="survey-completes">
              {{ totalWorries.doneCount }} / {{ totalWorries.totalWorry }}
            </span>
          </span>
            </div>
          </div>
        </div>

        <div
          v-if="totalWorries.totalWorry > 0"
          class="survey-progress">
          <div class="survey-name">
            <span>
              {{ totalWorries.maxWorry.worryTag.value }}을
            </span>
            <br />
            많이 하는 편이네요!
            <br />
            <br />
            모든 일이 잘 해결 될 거에요
            <br />
            너무 걱정하지 말아요 :)
          </div>
        </div>
        <div
          v-else
          class="survey-progress">
          <div class="survey-name">
            걱정이 하나도 없네요!
          </div>
        </div>

      </li>
    </ul>
  </div>
</template>

<script>
import ajax from '@/wrapper/ajax'
import { mapState } from 'pinia'
import { usersStore } from '@/store/users'

export default {
  name: 'user-graph',
  data () {
    return {
      totalWorries: {
        cannotResolveCount: 0,
        doneCount: 0,
        noneCount: 0,
        notOccurrenceCount: 0,
        occurrenceCount: 0,
        tinyCount: 0,
        totalWorry: 0,
        maxWorry: {
          worryTag: { code: '', value: '' },
          totalCount: 0
        }
      }
    }
  },
  computed: {
    ...mapState(usersStore, ['userCustomInfo'])
  },
  mounted () {
    ajax('GET', '/api/worry/total', null, null, {
      userOid: this.userCustomInfo.userOid
    }).then(_res => {
      this.totalWorries = _res
    })
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
