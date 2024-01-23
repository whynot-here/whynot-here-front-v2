<template>
  <div id="Rematching">
    <section class="top-wrp">
      <section class="title-wrp">
        <div class="title">
          <div>아쉽지만</div>
          <div><strong>매칭상대를</strong> 찾지 못했어요😢</div>
        </div>
        <div class="desc">
          아래에 있는 필수 요소 제외시 재매칭률이 올라갑니다.<br />
          매칭 포기시, 입력하신 계좌로 환불이 진행됩니다.
        </div>
      </section>
      <section class="notice">
        <div class="purple-box">
          <div class="left">
            <img src="@/assets/img/blind-date/notice-purple.png" alt="" />
          </div>
          <div class="right">
            <div>필수 요소 제외시에도 매칭되지 않을 수 있습니다.</div>
            <div>
              <li>상대방의 매칭 포기</li>
              <li>성비율</li>
            </div>
          </div>
        </div>
      </section>
      <main class="content">
        <section class="form">
          <div class="stage_01_top">
            <div class="content_01">
              <div class="sub-title">
                선호하는 상대방의 나이대를 알려주세요 <strong>*</strong>
                <div class="must-matching-condition">
                  <div class="icon">
                    <img
                      v-if="applyParams.favoriteAgeImportant"
                      src="@/assets/img/common/check-box-purple-selected.png"
                      alt=""
                      @click="applyParams.favoriteAgeImportant = false"
                    />
                    <img
                      v-else
                      src="@/assets/img/common/check-box-purple-unselected.png"
                      alt=""
                      @click="applyParams.favoriteAgeImportant = true"
                    />
                  </div>
                  <div>매칭 필수 요소</div>
                </div>
              </div>
              <div class="btn-select-wrp">
                <div
                  :class="
                    applyParams.favoriteAge === 'NO_MATTER'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteAge = 'NO_MATTER')]"
                >
                  상관없음
                </div>
                <div
                  :class="
                    applyParams.favoriteAge === 'SAME'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteAge = 'SAME')]"
                >
                  동갑
                </div>
              </div>
              <div class="btn-select-wrp">
                <div
                  :class="
                    applyParams.favoriteAge === 'UP'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteAge = 'UP')]"
                >
                  연상
                </div>
                <div
                  :class="
                    applyParams.favoriteAge === 'DOWN'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteAge = 'DOWN')]"
                >
                  연하
                </div>
              </div>
            </div>
          </div>
        </section>
        <section class="form">
          <div class="stage_01_bottom">
            <div class="content_01">
              <div class="sub-title">
                선호하는 상대방의 신장을 알려주세요
                <strong>*</strong>
                <div class="must-matching-condition">
                  <div class="icon">
                    <img
                      v-if="applyParams.favoriteHeightImportant"
                      src="@/assets/img/common/check-box-purple-selected.png"
                      alt=""
                      @click="applyParams.favoriteHeightImportant = false"
                    />
                    <img
                      v-else
                      src="@/assets/img/common/check-box-purple-unselected.png"
                      alt=""
                      @click="applyParams.favoriteHeightImportant = true"
                    />
                  </div>
                  <div>매칭 필수 요소</div>
                </div>
              </div>
              <DropdownBankName
                ref="dropdown"
                :label-first="dropdownLabel"
                :dropdown-type="'신장'"
                @get-label="selectOtherHeight"
              />
            </div>
          </div>
        </section>
        <section class="form">
          <div class="stage_01_bottom">
            <div class="content_01">
              <div class="sub-title">
                흡연 여부 <strong>*</strong>
                <div class="must-matching-condition">
                  <div class="icon">
                    <img
                      v-if="applyParams.favoriteSmokeImportant"
                      src="@/assets/img/common/check-box-purple-selected.png"
                      alt=""
                      @click=";[(applyParams.favoriteSmokeImportant = false)]"
                    />
                    <img
                      v-else
                      src="@/assets/img/common/check-box-purple-unselected.png"
                      alt=""
                      @click=";[(applyParams.favoriteSmokeImportant = true)]"
                    />
                  </div>
                  <div>매칭 필수 요소</div>
                </div>
              </div>
              <div class="btn-select-wrp">
                <div
                  :class="
                    applyParams.favoriteSmoke === 'N'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteSmoke = 'N')]"
                >
                  비흡연
                </div>
                <div
                  :class="
                    applyParams.favoriteSmoke === 'Y'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteSmoke = 'Y')]"
                >
                  흡연
                </div>
              </div>
            </div>
            <div class="content_01">
              <div class="sub-title">
                종교 <strong>*</strong>
                <div class="must-matching-condition">
                  <div class="icon">
                    <img
                      v-if="applyParams.favoriteDrinkImportant"
                      src="@/assets/img/common/check-box-purple-selected.png"
                      alt=""
                      @click="applyParams.favoriteDrinkImportant = false"
                    />
                    <img
                      v-else
                      src="@/assets/img/common/check-box-purple-unselected.png"
                      alt=""
                      @click="applyParams.favoriteDrinkImportant = true"
                    />
                  </div>
                  <div>매칭 필수 요소</div>
                </div>
              </div>
              <div class="btn-select-wrp">
                <div
                  :class="
                    applyParams.favoriteFaith === 'NO_MATTER'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteFaith = 'NO_MATTER')]"
                >
                  상관없음
                </div>
                <div
                  :class="
                    applyParams.favoriteFaith === 'CHRISTIAN'
                      ? 'button-half selected'
                      : 'button-half'
                  "
                  @click=";[(applyParams.favoriteFaith = 'CHRISTIAN')]"
                >
                  기독교
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </section>
    <section class="btn-wrp">
      <div class="prev" @click="openStopMatchingPopup(true)">매칭 포기</div>
      <div class="next active" @click="openRematchingPopup()">재매칭 신청</div>
    </section>
    <div v-if="isOpenStopMatchingPopup" class="popup">
      <div class="content-wrp">
        <div class="top">
          <div>정말 신청 철회를 하시겠어요?</div>
          <div>철회를 진행하시면, 지금까지의 정보가 삭제 됩니다.</div>
        </div>
        <div class="btn">
          <div @click="openStopMatchingPopup(false)">아니요</div>
          <div @click="cancelBlindDate()">네</div>
        </div>
      </div>
    </div>
    <div v-if="isOpenRematchingPopup === true" class="complete-popup">
      <div class="content-wrp">
        <div class="img">
          <img src="@/assets/img/common/matching.png" alt="" />
        </div>
        <div class="top">
          <div>
            24시간 뒤 매칭 재매칭<br />
            결과를 알려드려요!
          </div>
        </div>
        <div class="btn" @click.self="go_home()">그동안 앱 둘러보기</div>
      </div>
    </div>
  </div>
</template>

<script>
import DropdownBankName from '@/components/blind-date/dropdownBankName'

export default {
  name: 'RematchingPage',
  components: { DropdownBankName },
  data() {
    return {
      isShow: false,
      dropdownLabel: '신장',
      isOpenStopMatchingPopup: false,
      isOpenRematchingPopup: false
    }
  },
  watch: {},
  async mounted() {
    // await this.getParticipationType().then((res) => {
    //   if (res === 'REMATCH') {
    //     this.isShow = true
    //   } else if (res === 'FAIL') {
    //     this.$router.push('/auth')
    //   } else {
    //     this.$router.push('/')
    //   }
    // })
  },
  methods: {
    go_home() {
      this.$router.push('/')
    },
    openStopMatchingPopup(value) {
      this.isOpenStopMatchingPopup = value
    },
    cancelBlindDate() {
      this.$axios
        .put(
          `${process.env.apiUrl}/v2/blind-date/g-rematch`,
          {
            season: 2,
            isWantToRematch: false,
            favoriteAge: this.applyParams.favoriteAge,
            favoriteAgeImportant: this.applyParams.favoriteAgeImportant,
            favoriteHeight: this.applyParams.favoriteHeight,
            favoriteHeightImportant: this.applyParams.favoriteHeightImportant,
            favoriteSmoke: this.applyParams.favoriteSmoke,
            favoriteSmokeImportant: this.applyParams.favoriteSmokeImportant,
            favoriteDrink: this.applyParams.favoriteDrink,
            favoriteDrinkImportant: this.applyParams.favoriteDrinkImportant,
            favoriteFaith: this.applyParams.favoriteFaith,
            favoriteFaithImportant: this.applyParams.favoriteFaithImportant
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        .then((res) => {
          this.$router.push('/')
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    },
    openRematchingPopup() {
      this.$axios
        .put(
          `${process.env.apiUrl}/v2/blind-date/g-rematch`,
          {
            season: 2,
            isWantToRematch: true,
            favoriteAge: this.applyParams.favoriteAge,
            favoriteAgeImportant: this.applyParams.favoriteAgeImportant,
            favoriteHeight: this.applyParams.favoriteHeight,
            favoriteHeightImportant: this.applyParams.favoriteHeightImportant,
            favoriteSmoke: this.applyParams.favoriteSmoke,
            favoriteSmokeImportant: this.applyParams.favoriteSmokeImportant,
            favoriteDrink: this.applyParams.favoriteDrink,
            favoriteDrinkImportant: this.applyParams.favoriteDrinkImportant,
            favoriteFaith: this.applyParams.favoriteFaith,
            favoriteFaithImportant: this.applyParams.favoriteFaithImportant
          },
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.$store.state.userInfo.token
            }
          }
        )
        .then((res) => {
          this.isOpenRematchingPopup = true
        })
        .catch((error) => {
          window.alert(error.response.data.message)
        })
    },
    selectOtherHeight(item) {
      this.applyParams.favoriteHeight = item.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/g-blind-date/rematching.scss';
</style>
